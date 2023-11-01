from invenio_pidstore.providers.recordid_v2 import RecordIdProviderV2
from invenio_records_resources.records.api import FileRecord
from invenio_records_resources.records.systemfields import IndexField
from invenio_records_resources.records.systemfields.pid import PIDField, PIDFieldContext

from restoration.files.models import (
    RestorationFileDraftMetadata,
    RestorationFileMetadata,
)


class RestorationFileIdProvider(RecordIdProviderV2):
    pid_type = "rstrfl"


class RestorationFile(FileRecord):
    model_cls = RestorationFileMetadata

    index = IndexField("restoration_file-restoration_file-1.0.0")

    pid = PIDField(
        provider=RestorationFileIdProvider, context_cls=PIDFieldContext, create=True
    )
    record_cls = None  # is defined inside the parent record


class RestorationFileDraft(FileRecord):
    model_cls = RestorationFileDraftMetadata

    index = IndexField("restoration_file_draft-restoration_file_draft-1.0.0")

    pid = PIDField(
        provider=RestorationFileIdProvider, context_cls=PIDFieldContext, create=True
    )
    record_cls = None  # is defined inside the parent record
