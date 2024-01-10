from invenio_pidstore.providers.recordid_v2 import RecordIdProviderV2
from invenio_records_resources.records.api import FileRecord
from invenio_records_resources.records.systemfields import IndexField
from invenio_records_resources.records.systemfields.pid import PIDField, PIDFieldContext

from objects.files.models import ObjectsFileDraftMetadata, ObjectsFileMetadata


class ObjectsFileIdProvider(RecordIdProviderV2):
    pid_type = "rstrfl"


class ObjectsFile(FileRecord):

    model_cls = ObjectsFileMetadata

    index = IndexField("objects_file-objects_file-1.0.0")

    pid = PIDField(
        provider=ObjectsFileIdProvider, context_cls=PIDFieldContext, create=True
    )
    record_cls = None  # is defined inside the parent record


class ObjectsFileDraft(FileRecord):

    model_cls = ObjectsFileDraftMetadata

    index = IndexField("objects_file_draft-objects_file_draft-1.0.0")

    pid = PIDField(
        provider=ObjectsFileIdProvider, context_cls=PIDFieldContext, create=True
    )
    record_cls = None  # is defined inside the parent record
