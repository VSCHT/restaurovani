from invenio_records_resources.services import FileLink, FileServiceConfig, RecordLink
from invenio_records_resources.services.records.components import DataComponent
from oarepo_runtime.config.service import PermissionsPresetsConfigMixin

from restoration.records.api import RestorationDraft, RestorationRecord
from restoration.services.files.permissions import RestorationFileDraftPermissionPolicy
from restoration.services.files.schema import RestorationFileSchema
from restoration.services.records.permissions import RestorationPermissionPolicy


class RestorationFileServiceConfig(PermissionsPresetsConfigMixin, FileServiceConfig):
    """RestorationRecord service config."""

    PERMISSIONS_PRESETS = ["everyone"]

    url_prefix = "/restoration/<pid_value>"

    base_permission_policy_cls = RestorationPermissionPolicy

    schema = RestorationFileSchema

    record_cls = RestorationRecord

    service_id = "restoration_file"

    components = [
        *PermissionsPresetsConfigMixin.components,
        *FileServiceConfig.components,
        DataComponent,
    ]

    model = "restoration"
    allow_upload = False

    @property
    def file_links_list(self):
        return {
            "self": RecordLink("{+api}/restoration/{id}/files"),
        }

    @property
    def file_links_item(self):
        return {
            "commit": FileLink("{+api}/restoration/{id}/files/{key}/commit"),
            "content": FileLink("{+api}/restoration/{id}/files/{key}/content"),
            "self": FileLink("{+api}/restoration/{id}/files/{key}"),
        }


class RestorationFileDraftServiceConfig(
    PermissionsPresetsConfigMixin, FileServiceConfig
):
    """RestorationDraft service config."""

    PERMISSIONS_PRESETS = ["everyone"]

    url_prefix = "/restoration/<pid_value>/draft"

    base_permission_policy_cls = RestorationFileDraftPermissionPolicy

    schema = RestorationFileSchema

    record_cls = RestorationDraft

    service_id = "restoration_file_draft"

    components = [
        *PermissionsPresetsConfigMixin.components,
        *FileServiceConfig.components,
        DataComponent,
    ]

    model = "restoration"

    @property
    def file_links_list(self):
        return {
            "self": RecordLink("{+api}/restoration/{id}/draft/files"),
        }

    @property
    def file_links_item(self):
        return {
            "commit": FileLink("{+api}/restoration/{id}/draft/files/{key}/commit"),
            "content": FileLink("{+api}/restoration/{id}/draft/files/{key}/content"),
            "self": FileLink("{+api}/restoration/{id}/draft/files/{key}"),
        }
