from invenio_drafts_resources.services import (
    RecordServiceConfig as InvenioRecordDraftsServiceConfig,
)
from invenio_drafts_resources.services.records.components import DraftFilesComponent
from invenio_drafts_resources.services.records.config import is_record
from invenio_records_resources.services import ConditionalLink, RecordLink
from invenio_records_resources.services.records.components import DataComponent
from oarepo_runtime.services.config.service import PermissionsPresetsConfigMixin
from oarepo_runtime.services.files import FilesComponent
from oarepo_runtime.services.results import RecordList

from restoration.records.api import RestorationDraft, RestorationRecord
from restoration.services.records.permissions import RestorationPermissionPolicy
from restoration.services.records.schema import RestorationSchema
from restoration.services.records.search import RestorationSearchOptions


class RestorationServiceConfig(
    PermissionsPresetsConfigMixin, InvenioRecordDraftsServiceConfig
):
    """RestorationRecord service config."""

    result_list_cls = RecordList

    PERMISSIONS_PRESETS = ["authenticated"]

    url_prefix = "/restoration/"

    base_permission_policy_cls = RestorationPermissionPolicy

    schema = RestorationSchema

    search = RestorationSearchOptions

    record_cls = RestorationRecord

    service_id = "restoration"

    components = [
        *PermissionsPresetsConfigMixin.components,
        *InvenioRecordDraftsServiceConfig.components,
        FilesComponent,
        DataComponent,
        DraftFilesComponent,
    ]

    model = "restoration"
    draft_cls = RestorationDraft
    search_drafts = RestorationSearchOptions

    @property
    def links_item(self):
        return {
            "draft": RecordLink("{+api}/restoration/{id}/draft"),
            "files": ConditionalLink(
                cond=is_record,
                if_=RecordLink("{+api}/restoration/{id}/files"),
                else_=RecordLink("{+api}/restoration/{id}/draft/files"),
            ),
            "latest": RecordLink("{+api}/restoration/{id}/versions/latest"),
            "latest_html": RecordLink("{+ui}/restoration/{id}/latest"),
            "publish": RecordLink("{+api}/restoration/{id}/draft/actions/publish"),
            "record": RecordLink("{+api}/restoration/{id}"),
            "self": ConditionalLink(
                cond=is_record,
                if_=RecordLink("{+api}/restoration/{id}"),
                else_=RecordLink("{+api}/restoration/{id}/draft"),
            ),
            "self_html": ConditionalLink(
                cond=is_record,
                if_=RecordLink("{+ui}/restoration/{id}"),
                else_=RecordLink("{+ui}/restoration/{id}/edit"),
            ),
            "versions": RecordLink("{+api}/restoration/{id}/versions"),
        }
