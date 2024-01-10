from invenio_records_resources.services import FileLink, FileServiceConfig, RecordLink
from invenio_records_resources.services.records.components import DataComponent
from oarepo_runtime.services.config.service import PermissionsPresetsConfigMixin
from oarepo_runtime.services.results import RecordList

from objects.records.api import ObjectsDraft, ObjectsRecord
from objects.services.files.permissions import ObjectsFileDraftPermissionPolicy
from objects.services.files.schema import ObjectsFileSchema
from objects.services.records.permissions import ObjectsPermissionPolicy


class ObjectsFileServiceConfig(PermissionsPresetsConfigMixin, FileServiceConfig):
    """ObjectsRecord service config."""

    result_list_cls = RecordList

    PERMISSIONS_PRESETS = ["everyone"]

    url_prefix = "/objects/<pid_value>"

    base_permission_policy_cls = ObjectsPermissionPolicy

    schema = ObjectsFileSchema

    record_cls = ObjectsRecord

    service_id = "objects_file"

    components = [
        *PermissionsPresetsConfigMixin.components,
        *FileServiceConfig.components,
        DataComponent,
    ]

    model = "objects"
    allow_upload = False

    @property
    def file_links_list(self):
        return {
            "self": RecordLink("{+api}/objects/{id}/files"),
        }

    @property
    def file_links_item(self):
        return {
            "commit": FileLink("{+api}/objects/{id}/files/{key}/commit"),
            "content": FileLink("{+api}/objects/{id}/files/{key}/content"),
            "self": FileLink("{+api}/objects/{id}/files/{key}"),
        }


class ObjectsFileDraftServiceConfig(PermissionsPresetsConfigMixin, FileServiceConfig):
    """ObjectsDraft service config."""

    result_list_cls = RecordList

    PERMISSIONS_PRESETS = ["everyone"]

    url_prefix = "/objects/<pid_value>/draft"

    base_permission_policy_cls = ObjectsFileDraftPermissionPolicy

    schema = ObjectsFileSchema

    record_cls = ObjectsDraft

    service_id = "objects_file_draft"

    components = [
        *PermissionsPresetsConfigMixin.components,
        *FileServiceConfig.components,
        DataComponent,
    ]

    model = "objects"

    @property
    def file_links_list(self):
        return {
            "self": RecordLink("{+api}/objects/{id}/draft/files"),
        }

    @property
    def file_links_item(self):
        return {
            "commit": FileLink("{+api}/objects/{id}/draft/files/{key}/commit"),
            "content": FileLink("{+api}/objects/{id}/draft/files/{key}/content"),
            "self": FileLink("{+api}/objects/{id}/draft/files/{key}"),
        }
