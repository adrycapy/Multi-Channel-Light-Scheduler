"""Config flow for Multichannel Light Scheduler."""

from __future__ import annotations

import voluptuous as vol

from homeassistant import config_entries
from homeassistant.data_entry_flow import FlowResult

from .const import DOMAIN


class MultichannelSchedulerConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle a config flow for Multichannel Light Scheduler."""

    VERSION = 1

    async def async_step_user(self, user_input: dict | None = None) -> FlowResult:
        """Handle first step of setup."""
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")

        if user_input is not None:
            title = user_input["name"].strip()
            return self.async_create_entry(title=title, data={})

        schema = vol.Schema({vol.Required("name", default="Reef Light Scheduler"): str})
        return self.async_show_form(step_id="user", data_schema=schema)
