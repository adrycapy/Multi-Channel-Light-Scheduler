"""The Multichannel Light Scheduler integration."""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
import logging

from homeassistant.components.frontend import add_extra_js_url
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import DOMAIN, FRONTEND_CARD_FILENAME, FRONTEND_URL_BASE
from .engine import SchedulerEngine
from .storage import SchedulerStorage
from .websocket import async_register_websocket_api

_LOGGER = logging.getLogger(__name__)


@dataclass(slots=True)
class IntegrationRuntime:
    """Runtime data for a loaded config entry."""

    storage: SchedulerStorage
    engine: SchedulerEngine


async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    """Set up the integration from yaml (unused)."""
    hass.data.setdefault(DOMAIN, {})
    await _async_register_frontend_resource(hass)
    return True


async def _async_register_frontend_resource(hass: HomeAssistant) -> None:
    """Register static resources for the Lovelace card."""
    domain_data = hass.data.setdefault(DOMAIN, {})
    if domain_data.get("frontend_registered"):
        return

    static_dir = Path(__file__).resolve().parent / "www"
    if not static_dir.exists():
        _LOGGER.warning("Frontend static folder not found: %s", static_dir)
        return

    await hass.http.async_register_static_paths(
        [
            StaticPathConfig(
                FRONTEND_URL_BASE,
                str(static_dir),
                False,
            )
        ]
    )
    add_extra_js_url(hass, f"{FRONTEND_URL_BASE}/{FRONTEND_CARD_FILENAME}")
    domain_data["frontend_registered"] = True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up Multichannel Light Scheduler from a config entry."""
    domain_data = hass.data.setdefault(DOMAIN, {})

    storage = SchedulerStorage(hass)
    await storage.async_initialize()

    engine = SchedulerEngine(hass, storage)
    await engine.async_start()

    runtime = IntegrationRuntime(storage=storage, engine=engine)
    domain_data[entry.entry_id] = runtime
    domain_data["active_runtime"] = runtime

    if not domain_data.get("ws_registered"):
        async_register_websocket_api(hass)
        domain_data["ws_registered"] = True

    await _async_register_frontend_resource(hass)

    _LOGGER.info("Multichannel Scheduler setup complete for entry %s", entry.entry_id)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    domain_data = hass.data.get(DOMAIN, {})
    runtime: IntegrationRuntime | None = domain_data.pop(entry.entry_id, None)

    if runtime is not None:
        await runtime.engine.async_stop()

    if domain_data.get("active_runtime") is runtime:
        domain_data["active_runtime"] = None

    return True
