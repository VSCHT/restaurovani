from invenio_db import db
from invenio_records.models import RecordMetadataBase
from invenio_records_resources.records import FileRecordModelMixin

from objects.records.models import ObjectsDraftMetadata, ObjectsMetadata


class ObjectsFileMetadata(db.Model, RecordMetadataBase, FileRecordModelMixin):
    """Model for ObjectsFile metadata."""

    __tablename__ = "objects_file_metadata"
    __record_model_cls__ = ObjectsMetadata


class ObjectsFileDraftMetadata(db.Model, RecordMetadataBase, FileRecordModelMixin):
    """Model for ObjectsFileDraft metadata."""

    __tablename__ = "objects_file_draft_metadata"
    __record_model_cls__ = ObjectsDraftMetadata
