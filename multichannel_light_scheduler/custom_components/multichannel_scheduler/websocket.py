"""WebSocket API for multichannel scheduler."""

from __future__ import annotations

import logging

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant

from .const import DOMAIN, WS_GET_CONFIG, WS_SAVE_SCHEDULE
from .storage import SchedulerStorage, StorageValidationError

_LOGGER = logging.getLogger(__name__)


def _get_runtime(hass: HomeAssistant):
    domain_data = hass.data.get(DOMAIN, {})
    runtime = domain_data.get("active_runtime")
    if runtime is None:
        raise RuntimeError("No active runtime")
    return runtime


@websocket_api.websocket_command({"type": WS_GET_CONFIG})
@websocket_api.async_response
async def websocket_get_config(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict,
) -> None:
    """Return current channels and nodes configuration."""
    try:
        runtime = _get_runtime(hass)
        payload = await runtime.storage.async_get_data()
        connection.send_result(msg["id"], payload)
    except Exception as err:  # pragma: no cover - HA runtime safeguard
        _LOGGER.exception("Failed to read scheduler config")
        connection.send_error(msg["id"], "read_failed", str(err))


@websocket_api.websocket_command(
    {
        "type": WS_SAVE_SCHEDULE,
        "payload": dict,
    }
)
@websocket_api.async_response
async def websocket_save_schedule(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict,
) -> None:
    """Validate and persist full schedule payload."""
    try:
        runtime = _get_runtime(hass)
        payload = msg["payload"]
        saved = await runtime.storage.async_save_data(payload)
        await runtime.engine.async_reload()
        connection.send_result(msg["id"], saved)
    except StorageValidationError as err:
        connection.send_error(msg["id"], "validation_error", str(err))
    except Exception as err:  # pragma: no cover - HA runtime safeguard
        _LOGGER.exception("Failed to save scheduler payload")
        connection.send_error(msg["id"], "save_failed", str(err))


def async_register_websocket_api(hass: HomeAssistant) -> None:
    """Register websocket commands."""
    websocket_api.async_register_command(hass, websocket_get_config)
    websocket_api.async_register_command(hass, websocket_save_schedule)
