from invenio_drafts_resources.services import (
    RecordServiceConfig as InvenioRecordDraftsServiceConfig,
)
from invenio_drafts_resources.services.records.components import DraftFilesComponent
from invenio_drafts_resources.services.records.config import is_record
from invenio_records_resources.services import ConditionalLink, RecordLink
from invenio_records_resources.services.records.components import (
    DataComponent,
    FilesOptionsComponent,
)
from oarepo_runtime.config.service import PermissionsPresetsConfigMixin

from restoration.records.api import RestorationDraft, RestorationRecord
from restoration.services.records.permissions import RestorationPermissionPolicy
from restoration.services.records.schema import RestorationSchema
from restoration.services.records.search import RestorationSearchOptions


class RestorationServiceConfig(
    PermissionsPresetsConfigMixin, InvenioRecordDraftsServiceConfig
):
    """RestorationRecord service config."""

    PERMISSIONS_PRESETS = ["everyone"]

    url_prefix = "/restoration/"

    base_permission_policy_cls = RestorationPermissionPolicy

    schema = RestorationSchema

    search = RestorationSearchOptions
    search_drafts = RestorationSearchOptions

    record_cls = RestorationRecord

    service_id = "restoration"

    components = [
        *PermissionsPresetsConfigMixin.components,
        *InvenioRecordDraftsServiceConfig.components,
        DraftFilesComponent,
        FilesOptionsComponent,
        DataComponent,
    ]

    model = "restoration"
    draft_cls = RestorationDraft

    @property
    def links_item(self):
        return {
            "draft": RecordLink("{+api}/{self.url_prefix}{id}/draft"),
            "files": ConditionalLink(
                cond=is_record,
                if_=RecordLink("{+api}/records/{id}/files"),
                else_=RecordLink("{+api}/records/{id}/draft/files"),
            ),
            "latest": RecordLink("{+api}/{self.url_prefix}{id}/versions/latest"),
            "latest_html": RecordLink("{+ui}/{self.url_prefix}{id}/latest"),
            "publish": RecordLink("{+api}/{self.url_prefix}{id}/draft/actions/publish"),
            "record": RecordLink("{+api}/{self.url_prefix}{id}"),
            "self": ConditionalLink(
                cond=is_record,
                if_=RecordLink("{+api}{self.url_prefix}{id}"),
                else_=RecordLink("{+api}{self.url_prefix}{id}/draft"),
            ),
            "self_html": ConditionalLink(
                cond=is_record,
                if_=RecordLink("{+ui}/restoration/{id}"),
                else_=RecordLink("{+ui}/uploads/{id}"),
            ),
            "versions": RecordLink("{+api}/{self.url_prefix}{id}/versions"),
            
        }
