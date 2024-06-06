from oarepo_published_service.services.config import PublishedServiceConfig
from oarepo_published_service.services.records.components.bucket import (
    CreatePublishedBucketComponent,
)
from oarepo_runtime.services.config.service import PermissionsPresetsConfigMixin
from oarepo_runtime.services.files import FilesComponent


class ObjectsPublishedServiceConfig(
    PublishedServiceConfig, PermissionsPresetsConfigMixin
):
    service_id = "published_objects"

    @property
    def components(self):
        return [*super().components, FilesComponent, CreatePublishedBucketComponent]
