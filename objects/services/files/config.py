from invenio_records_resources.services import FileLink, RecordLink
from oarepo_runtime.services.components import CustomFieldsComponent

from common.services.files import RestorationFileServiceConfig
from objects.records.api import ObjectsDraft, ObjectsRecord
from objects.services.files.schema import ObjectsFileSchema
from objects.services.records.permissions import ObjectsPermissionPolicy


class ObjectsFileServiceConfig(RestorationFileServiceConfig):
    """ObjectsRecord service config."""

    PERMISSIONS_PRESETS = ["everyone"]

    url_prefix = "/objects/<pid_value>"

    base_permission_policy_cls = ObjectsPermissionPolicy

    schema = ObjectsFileSchema

    record_cls = ObjectsRecord

    service_id = "objects_file"

    components = [*RestorationFileServiceConfig.components, CustomFieldsComponent]

    model = "objects"
    allowed_mimetypes = []
    allowed_extensions = []
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
            "preview": FileLink("{+ui}/objects/{id}/files/{key}/preview"),
            "self": FileLink("{+api}/objects/{id}/files/{key}"),
        }


class ObjectsFileDraftServiceConfig(RestorationFileServiceConfig):
    """ObjectsDraft service config."""

    PERMISSIONS_PRESETS = ["everyone"]

    url_prefix = "/objects/<pid_value>/draft"

    schema = ObjectsFileSchema

    record_cls = ObjectsDraft

    service_id = "objects_file_draft"

    components = [*RestorationFileServiceConfig.components, CustomFieldsComponent]

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
            "preview": FileLink("{+ui}/objects/{id}/files/{key}/preview"),
            "self": FileLink("{+api}/objects/{id}/draft/files/{key}"),
        }
