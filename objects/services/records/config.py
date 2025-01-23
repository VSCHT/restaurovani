from invenio_drafts_resources.services import (
    RecordServiceConfig as InvenioRecordDraftsServiceConfig,
)
from invenio_drafts_resources.services.records.components import DraftFilesComponent
from invenio_records_resources.services import (
    ConditionalLink,
    LinksTemplate,
    RecordLink,
    pagination_links,
)
from oarepo_runtime.services.components import (
    CustomFieldsComponent,
    OwnersComponent,
    process_service_configs,
)
from oarepo_runtime.services.config import (
    has_draft,
    has_file_permission,
    has_permission,
    has_published_record,
    is_published_record,
)
from oarepo_runtime.services.config.service import PermissionsPresetsConfigMixin
from oarepo_runtime.services.files import FilesComponent
from oarepo_runtime.services.records import pagination_links_html

from objects.records.api import ObjectsDraft, ObjectsRecord
from objects.services.records.permissions import ObjectsPermissionPolicy
from objects.services.records.results import ObjectsRecordItem, ObjectsRecordList
from objects.services.records.schema import ObjectsSchema
from objects.services.records.search import ObjectsSearchOptions


class ObjectsServiceConfig(
    PermissionsPresetsConfigMixin, InvenioRecordDraftsServiceConfig
):
    """ObjectsRecord service config."""

    result_item_cls = ObjectsRecordItem

    result_list_cls = ObjectsRecordList

    PERMISSIONS_PRESETS = ["authenticated"]

    url_prefix = "/objects/"

    base_permission_policy_cls = ObjectsPermissionPolicy

    schema = ObjectsSchema

    search = ObjectsSearchOptions

    record_cls = ObjectsRecord

    service_id = "objects"

    search_item_links_template = LinksTemplate
    draft_cls = ObjectsDraft
    search_drafts = ObjectsSearchOptions

    @property
    def components(self):

        return process_service_configs(self) + [
            OwnersComponent,
            FilesComponent,
            DraftFilesComponent,
            CustomFieldsComponent,
        ]

    model = "objects"

    @property
    def links_item(self):
        return {
            "applicable-requests": ConditionalLink(
                cond=is_published_record(),
                if_=RecordLink("{+api}/objects/{id}/requests/applicable"),
                else_=RecordLink("{+api}/objects/{id}/draft/requests/applicable"),
            ),
            "draft": RecordLink(
                "{+api}/objects/{id}/draft",
                when=has_draft() & has_permission("read_draft"),
            ),
            "edit_html": RecordLink(
                "{+ui}/objects/{id}/edit", when=has_draft() & has_permission("update")
            ),
            "files": ConditionalLink(
                cond=is_published_record(),
                if_=RecordLink(
                    "{+api}/objects/{id}/files", when=has_file_permission("list_files")
                ),
                else_=RecordLink(
                    "{+api}/objects/{id}/draft/files",
                    when=has_file_permission("list_files"),
                ),
            ),
            "latest": RecordLink(
                "{+api}/objects/{id}/versions/latest", when=has_permission("read")
            ),
            "latest_html": RecordLink(
                "{+ui}/objects/{id}/latest", when=has_permission("read")
            ),
            "publish": RecordLink(
                "{+api}/objects/{id}/draft/actions/publish",
                when=has_permission("publish"),
            ),
            "record": RecordLink(
                "{+api}/objects/{id}",
                when=has_published_record() & has_permission("read"),
            ),
            "requests": ConditionalLink(
                cond=is_published_record(),
                if_=RecordLink("{+api}/objects/{id}/requests"),
                else_=RecordLink("{+api}/objects/{id}/draft/requests"),
            ),
            "self": ConditionalLink(
                cond=is_published_record(),
                if_=RecordLink("{+api}/objects/{id}", when=has_permission("read")),
                else_=RecordLink(
                    "{+api}/objects/{id}/draft", when=has_permission("read_draft")
                ),
            ),
            "self_html": ConditionalLink(
                cond=is_published_record(),
                if_=RecordLink("{+ui}/objects/{id}", when=has_permission("read")),
                else_=RecordLink(
                    "{+ui}/objects/{id}/preview", when=has_permission("read_draft")
                ),
            ),
            "versions": RecordLink(
                "{+api}/objects/{id}/versions", when=has_permission("search_versions")
            ),
        }

    @property
    def links_search_item(self):
        return {
            "self": ConditionalLink(
                cond=is_published_record(),
                if_=RecordLink("{+api}/objects/{id}", when=has_permission("read")),
                else_=RecordLink(
                    "{+api}/objects/{id}/draft", when=has_permission("read_draft")
                ),
            ),
            "self_html": ConditionalLink(
                cond=is_published_record(),
                if_=RecordLink("{+ui}/objects/{id}", when=has_permission("read")),
                else_=RecordLink(
                    "{+ui}/objects/{id}/preview", when=has_permission("read_draft")
                ),
            ),
        }

    @property
    def links_search(self):
        return {
            **pagination_links("{+api}/objects/{?args*}"),
            **pagination_links_html("{+ui}/objects/{?args*}"),
        }

    @property
    def links_search_drafts(self):
        return {
            **pagination_links("{+api}/user/objects/{?args*}"),
            **pagination_links_html("{+ui}/user/objects/{?args*}"),
        }

    @property
    def links_search_versions(self):
        return {
            **pagination_links("{+api}/objects/{id}/versions{?args*}"),
        }
