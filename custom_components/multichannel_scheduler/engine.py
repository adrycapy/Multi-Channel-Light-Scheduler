"""Scheduling engine for multichannel light interpolation."""

from __future__ import annotations

import asyncio
from datetime import datetime
import logging
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.util import dt as dt_util

from .const import (
    ATTR_CHANNEL_ID,
    ATTR_ENTITY_ID,
    ATTR_TIME,
    ATTR_VALUES,
    CONF_CHANNELS,
    CONF_NODES,
    ENGINE_DEFAULT_TRANSITION_SECONDS,
    ENGINE_STEP_SECONDS,
    UNAVAILABLE_STATES,
)
from .storage import SchedulerStorage

_LOGGER = logging.getLogger(__name__)
SECONDS_PER_DAY = 24 * 60 * 60


class SchedulerEngine:
    """Periodic scheduler that computes and applies interpolated brightness."""

    def __init__(self, hass: HomeAssistant, storage: SchedulerStorage) -> None:
        self._hass = hass
        self._storage = storage
        self._task: asyncio.Task | None = None
        self._stop_event = asyncio.Event()
        self._last_sent: dict[str, int] = {}

    async def async_start(self) -> None:
        """Start periodic processing loop."""
        await self.async_stop()
        self._stop_event = asyncio.Event()
        self._task = self._hass.async_create_task(self._run_loop())

    async def async_stop(self) -> None:
        """Stop periodic processing loop."""
        if self._task is None:
            return

        self._stop_event.set()
        self._task.cancel()
        try:
            await self._task
        except asyncio.CancelledError:
            pass
        finally:
            self._task = None

    async def async_reload(self) -> None:
        """Reload schedule and apply immediately after updates/restarts."""
        await self._apply_now()

    async def _run_loop(self) -> None:
        """Main loop that refreshes lights every ENGINE_STEP_SECONDS."""
        while not self._stop_event.is_set():
            try:
                await self._apply_now()
            except Exception:
                _LOGGER.exception("Unexpected error while applying schedule")

            try:
                await asyncio.wait_for(self._stop_event.wait(), timeout=ENGINE_STEP_SECONDS)
            except asyncio.TimeoutError:
                continue

    async def _apply_now(self) -> None:
        data = await self._storage.async_get_data()
        channels = data.get("config", {}).get(CONF_CHANNELS, [])
        nodes = data.get(CONF_NODES, [])

        if not channels or not nodes:
            return

        now = dt_util.now()
        now_seconds = _time_to_seconds(now.time().strftime("%H:%M:%S"))

        for channel in channels:
            channel_id = channel[ATTR_CHANNEL_ID]
            entity_id = channel[ATTR_ENTITY_ID]
            brightness_pct = _interpolated_value_for_channel(nodes, channel_id, now_seconds)

            state = self._hass.states.get(entity_id)
            if state is None or state.state in UNAVAILABLE_STATES:
                _LOGGER.warning(
                    "Skipping %s because it is unavailable (%s)",
                    entity_id,
                    state.state if state else "missing",
                )
                self._last_sent.pop(entity_id, None)
                continue

            previous = self._last_sent.get(entity_id)
            if previous is not None and previous == brightness_pct:
                continue

            service_data = {
                "entity_id": entity_id,
                "brightness_pct": brightness_pct,
                "transition": ENGINE_DEFAULT_TRANSITION_SECONDS,
            }
            await self._hass.services.async_call(
                "light",
                "turn_on",
                service_data,
                blocking=False,
            )
            self._last_sent[entity_id] = brightness_pct


def _interpolated_value_for_channel(
    nodes: list[dict[str, Any]], channel_id: int, now_seconds: int
) -> int:
    if not nodes:
        return 0

    channel_key = str(channel_id)
    sorted_nodes = sorted(nodes, key=lambda node: node[ATTR_TIME])
    times = [_time_to_seconds(node[ATTR_TIME]) for node in sorted_nodes]
    values = [int(node[ATTR_VALUES].get(channel_key, 0)) for node in sorted_nodes]

    if len(sorted_nodes) == 1:
        return _clamp(values[0])

    expanded_times = times + [times[0] + SECONDS_PER_DAY]
    expanded_values = values + [values[0]]

    normalized_now = now_seconds
    if normalized_now < expanded_times[0]:
        normalized_now += SECONDS_PER_DAY

    for idx in range(len(expanded_times) - 1):
        t0 = expanded_times[idx]
        t1 = expanded_times[idx + 1]
        if t0 <= normalized_now <= t1:
            v0 = expanded_values[idx]
            v1 = expanded_values[idx + 1]
            if t1 == t0:
                return _clamp(v0)

            interpolated = v0 + ((normalized_now - t0) / (t1 - t0)) * (v1 - v0)
            return _clamp(round(interpolated))

    return _clamp(expanded_values[-1])


def _time_to_seconds(value: str) -> int:
    dt = datetime.strptime(value, "%H:%M:%S")
    return dt.hour * 3600 + dt.minute * 60 + dt.second


def _clamp(value: int) -> int:
    return max(0, min(100, int(value)))
