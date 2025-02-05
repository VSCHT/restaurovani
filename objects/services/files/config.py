from invenio_records_resources.services import FileLink, LinksTemplate, RecordLink
from oarepo_runtime.services.components import (
    CustomFieldsComponent,
    process_service_configs,
)
from oarepo_runtime.services.config import (
    has_file_permission,
    has_permission_file_service,
)

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

    search_item_links_template = LinksTemplate
    allowed_mimetypes = []
    allowed_extensions = []
    allow_upload = False

    @property
    def components(self):

        return process_service_configs(self) + [CustomFieldsComponent]

    model = "objects"

    @property
    def file_links_list(self):
        return {
            "self": RecordLink(
                "{+api}/objects/{id}/files",
                when=has_permission_file_service("list_files"),
            ),
        }

    @property
    def file_links_item(self):
        return {
            "commit": FileLink(
                "{+api}/objects/{id}/files/{key}/commit",
                when=has_permission_file_service("commit_files"),
            ),
            "content": FileLink(
                "{+api}/objects/{id}/files/{key}/content",
                when=has_permission_file_service("get_content_files"),
            ),
            "preview": FileLink("{+ui}/objects/{id}/files/{key}/preview"),
            "self": FileLink(
                "{+api}/objects/{id}/files/{key}",
                when=has_permission_file_service("read_files"),
            ),
        }


class ObjectsFileDraftServiceConfig(RestorationFileServiceConfig):
    """ObjectsDraft service config."""

    PERMISSIONS_PRESETS = ["everyone"]

    url_prefix = "/objects/<pid_value>/draft"

    schema = ObjectsFileSchema

    record_cls = ObjectsDraft

    service_id = "objects_file_draft"

    search_item_links_template = LinksTemplate

    @property
    def components(self):

        return process_service_configs(self) + [CustomFieldsComponent]

    model = "objects"

    @property
    def file_links_list(self):
        return {
            "self": RecordLink(
                "{+api}/objects/{id}/draft/files",
                when=has_file_permission("list_files"),
            ),
        }

    @property
    def file_links_item(self):
        return {
            "commit": FileLink(
                "{+api}/objects/{id}/draft/files/{key}/commit",
                when=has_file_permission("commit_files"),
            ),
            "content": FileLink(
                "{+api}/objects/{id}/draft/files/{key}/content",
                when=has_file_permission("get_content_files"),
            ),
            "preview": FileLink("{+ui}/objects/{id}/preview/files/{key}/preview"),
            "self": FileLink(
                "{+api}/objects/{id}/draft/files/{key}",
                when=has_file_permission("read_files"),
            ),
        }
