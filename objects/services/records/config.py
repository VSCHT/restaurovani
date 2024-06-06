from invenio_drafts_resources.services import (
    RecordServiceConfig as InvenioRecordDraftsServiceConfig,
)
from invenio_drafts_resources.services.records.components import DraftFilesComponent
from invenio_drafts_resources.services.records.config import is_record
from invenio_records_resources.services import (
    ConditionalLink,
    RecordLink,
    pagination_links,
)
from invenio_records_resources.services.records.components import DataComponent
from oarepo_runtime.records import has_draft, is_published_record
from oarepo_runtime.services.components import OwnersComponent
from oarepo_runtime.services.config.service import PermissionsPresetsConfigMixin
from oarepo_runtime.services.files import FilesComponent

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

    components = [
        *PermissionsPresetsConfigMixin.components,
        *InvenioRecordDraftsServiceConfig.components,
        OwnersComponent,
        DataComponent,
        FilesComponent,
        DraftFilesComponent,
    ]

    model = "objects"
    draft_cls = ObjectsDraft
    search_drafts = ObjectsSearchOptions

    @property
    def links_item(self):
        return {
            "draft": RecordLink("{+api}/objects/{id}/draft"),
            "edit_html": RecordLink("{+ui}/objects/{id}/edit", when=has_draft),
            "files": ConditionalLink(
                cond=is_record,
                if_=RecordLink("{+api}/objects/{id}/files"),
                else_=RecordLink("{+api}/objects/{id}/draft/files"),
            ),
            "latest": RecordLink("{+api}/objects/{id}/versions/latest"),
            "latest_html": RecordLink("{+ui}/objects/{id}/latest"),
            "publish": RecordLink("{+api}/objects/{id}/draft/actions/publish"),
            "record": RecordLink("{+api}/objects/{id}"),
            "requests": ConditionalLink(
                cond=is_published_record,
                if_=RecordLink("{+api}/objects/{id}/requests"),
                else_=RecordLink("{+api}/objects/{id}/draft/requests"),
            ),
            "self": ConditionalLink(
                cond=is_published_record,
                if_=RecordLink("{+api}/objects/{id}"),
                else_=RecordLink("{+api}/objects/{id}/draft"),
            ),
            "self_html": ConditionalLink(
                cond=is_published_record,
                if_=RecordLink("{+ui}/objects/{id}"),
                else_=RecordLink("{+ui}/objects/{id}/preview"),
            ),
            "versions": RecordLink("{+api}/objects/{id}/versions"),
        }

    @property
    def links_search(self):
        return {
            **pagination_links("{+api}/objects/{?args*}"),
        }

    @property
    def links_search_drafts(self):
        return {
            **pagination_links("{+api}/user/objects/{?args*}"),
        }

    @property
    def links_search_versions(self):
        return {
            **pagination_links("{+api}/objects/{id}/versions{?args*}"),
        }
