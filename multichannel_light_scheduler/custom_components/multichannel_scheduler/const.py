"""Constants for the Multichannel Light Scheduler integration."""

DOMAIN = "multichannel_scheduler"

MIN_CHANNELS = 1
MAX_CHANNELS = 10

STORAGE_VERSION = 1
STORAGE_KEY = "multichannel_scheduler_data.json"

WS_GET_CONFIG = f"{DOMAIN}/get_config"
WS_SAVE_SCHEDULE = f"{DOMAIN}/save_schedule"

ENGINE_STEP_SECONDS = 30
ENGINE_DEFAULT_TRANSITION_SECONDS = 30

FRONTEND_CARD_FILENAME = "multichannel-scheduler-card.js"
FRONTEND_URL_BASE = "/multichannel_scheduler_static"

CONF_CHANNELS = "channels"
CONF_CONFIG = "config"
CONF_NODES = "nodes"
CONF_VERSION = "version"

ATTR_CHANNEL_ID = "id"
ATTR_ENTITY_ID = "entity_id"
ATTR_NAME = "name"
ATTR_COLOR = "color"
ATTR_TIME = "time"
ATTR_VALUES = "values"

UNAVAILABLE_STATES = {"unavailable", "unknown"}
