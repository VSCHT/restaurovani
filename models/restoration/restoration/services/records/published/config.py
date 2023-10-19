from oarepo_published_service.services.config import (
    PublishedServiceConfig as PublishedServiceConfig,
)
from oarepo_runtime.config.service import PermissionsPresetsConfigMixin


class RestorationPublishedServiceConfig(
    PublishedServiceConfig, PermissionsPresetsConfigMixin
):
    service_id = "published_restoration"
