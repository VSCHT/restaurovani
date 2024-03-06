from invenio_records_resources.records.api import FileRecord
from invenio_records_resources.records.systemfields import IndexField

from objects.files.models import ObjectsFileDraftMetadata, ObjectsFileMetadata


class ObjectsFile(FileRecord):

    model_cls = ObjectsFileMetadata

    index = IndexField("objects_file-objects_file-1.0.0")
    record_cls = None  # is defined inside the parent record


class ObjectsFileDraft(FileRecord):

    model_cls = ObjectsFileDraftMetadata

    index = IndexField("objects_file_draft-objects_file_draft-1.0.0")
    record_cls = None  # is defined inside the parent record
