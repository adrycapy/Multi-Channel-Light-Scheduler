"""Persistent storage for Multichannel Light Scheduler."""

from __future__ import annotations

from copy import deepcopy
import re
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store

from .const import (
    ATTR_CHANNEL_ID,
    ATTR_COLOR,
    ATTR_ENTITY_ID,
    ATTR_NAME,
    ATTR_TIME,
    ATTR_VALUES,
    CONF_CHANNELS,
    CONF_CONFIG,
    CONF_NODES,
    CONF_VERSION,
    MAX_CHANNELS,
    MIN_CHANNELS,
    STORAGE_KEY,
    STORAGE_VERSION,
)

TIME_PATTERN = re.compile(r"^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$")
HEX_COLOR_PATTERN = re.compile(r"^#[0-9A-Fa-f]{6}$")

DEFAULT_DATA: dict[str, Any] = {
    CONF_VERSION: STORAGE_VERSION,
    "config": {CONF_CHANNELS: []},
    CONF_NODES: [],
}


class StorageValidationError(ValueError):
    """Raised when schedule payload is invalid."""


class SchedulerStorage:
    """Small wrapper around Home Assistant Store."""

    def __init__(self, hass: HomeAssistant) -> None:
        self._store: Store[dict[str, Any]] = Store(hass, STORAGE_VERSION, STORAGE_KEY)

    async def async_initialize(self) -> None:
        """Ensure storage is initialized with valid default payload."""
        data = await self._store.async_load()
        if data is None:
            await self._store.async_save(deepcopy(DEFAULT_DATA))
            return

        try:
            self.validate_payload(data)
        except StorageValidationError:
            await self._store.async_save(deepcopy(DEFAULT_DATA))

    async def async_get_data(self) -> dict[str, Any]:
        """Load and validate schedule payload from disk."""
        data = await self._store.async_load()
        if data is None:
            return deepcopy(DEFAULT_DATA)

        return self.validate_payload(data)

    async def async_save_data(self, payload: dict[str, Any]) -> dict[str, Any]:
        """Validate and persist schedule payload."""
        normalized = self.validate_payload(payload)
        await self._store.async_save(normalized)
        return normalized

    @staticmethod
    def validate_payload(payload: dict[str, Any]) -> dict[str, Any]:
        """Validate full persisted payload and return a normalized copy."""
        if not isinstance(payload, dict):
            raise StorageValidationError("Payload must be an object")

        channels = payload.get("config", {}).get(CONF_CHANNELS, [])
        nodes = payload.get(CONF_NODES, [])

        normalized_channels = _validate_channels(channels)
        normalized_nodes = _validate_nodes(nodes, normalized_channels)

        return {
            CONF_VERSION: STORAGE_VERSION,
            "config": {CONF_CHANNELS: normalized_channels},
            CONF_NODES: normalized_nodes,
        }


def _validate_channels(channels: Any) -> list[dict[str, Any]]:
    if not isinstance(channels, list):
        raise StorageValidationError("config.channels must be a list")

    if len(channels) == 0:
        return []

    if not (MIN_CHANNELS <= len(channels) <= MAX_CHANNELS):
        raise StorageValidationError(
            f"channels must contain between {MIN_CHANNELS} and {MAX_CHANNELS} items"
        )

    normalized: list[dict[str, Any]] = []
    seen_ids: set[int] = set()

    for channel in channels:
        if not isinstance(channel, dict):
            raise StorageValidationError("channel must be an object")

        channel_id = channel.get(ATTR_CHANNEL_ID)
        if not isinstance(channel_id, int) or not (1 <= channel_id <= MAX_CHANNELS):
            raise StorageValidationError("channel.id must be an integer between 1 and 10")
        if channel_id in seen_ids:
            raise StorageValidationError("channel ids must be unique")

        entity_id = channel.get(ATTR_ENTITY_ID)
        if not isinstance(entity_id, str) or not entity_id.startswith("light."):
            raise StorageValidationError("channel.entity_id must be a light.* entity")

        name = channel.get(ATTR_NAME)
        if not isinstance(name, str) or not name.strip():
            raise StorageValidationError("channel.name must be a non-empty string")

        color = channel.get(ATTR_COLOR)
        if not isinstance(color, str) or not HEX_COLOR_PATTERN.match(color):
            raise StorageValidationError("channel.color must be a 6-digit HEX color")

        normalized.append(
            {
                ATTR_CHANNEL_ID: channel_id,
                ATTR_ENTITY_ID: entity_id,
                ATTR_NAME: name.strip(),
                ATTR_COLOR: color.upper(),
            }
        )
        seen_ids.add(channel_id)

    normalized.sort(key=lambda channel: channel[ATTR_CHANNEL_ID])
    return normalized


def _validate_nodes(nodes: Any, channels: list[dict[str, Any]]) -> list[dict[str, Any]]:
    if not isinstance(nodes, list):
        raise StorageValidationError("nodes must be a list")

    channel_ids = [channel[ATTR_CHANNEL_ID] for channel in channels]
    channel_key_set = {str(channel_id) for channel_id in channel_ids}

    normalized: list[dict[str, Any]] = []
    seen_times: set[str] = set()

    for node in nodes:
        if not isinstance(node, dict):
            raise StorageValidationError("node must be an object")

        time_str = node.get(ATTR_TIME)
        if not isinstance(time_str, str) or not TIME_PATTERN.match(time_str):
            raise StorageValidationError("node.time must have HH:MM:SS format")
        if time_str in seen_times:
            raise StorageValidationError("node.time values must be unique")

        values = node.get(ATTR_VALUES)
        if not isinstance(values, dict):
            raise StorageValidationError("node.values must be an object")

        node_values: dict[str, int] = {}
        for channel_key in channel_key_set:
            raw_value = values.get(channel_key, 0)
            if not isinstance(raw_value, (int, float)):
                raise StorageValidationError("node value must be numeric")

            pct = int(round(float(raw_value)))
            if not (0 <= pct <= 100):
                raise StorageValidationError("node value must be in range 0..100")

            node_values[channel_key] = pct

        extra_keys = {key for key in values.keys() if str(key) not in channel_key_set}
        if extra_keys:
            raise StorageValidationError("node.values contains unknown channel id")

        normalized.append({ATTR_TIME: time_str, ATTR_VALUES: node_values})
        seen_times.add(time_str)

    normalized.sort(key=lambda item: item[ATTR_TIME])
    return normalized
