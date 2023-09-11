from invenio_db import db
from invenio_records.models import RecordMetadataBase
from invenio_records_resources.records import FileRecordModelMixin

from restoration.records.models import RestorationDraftMetadata, RestorationMetadata


class RestorationFileMetadata(db.Model, RecordMetadataBase, FileRecordModelMixin):
    """Model for RestorationFile metadata."""

    __tablename__ = "restoration_file_metadata"
    __record_model_cls__ = RestorationMetadata


class RestorationFileDraftMetadata(db.Model, RecordMetadataBase, FileRecordModelMixin):
    """Model for RestorationFileDraft metadata."""

    __tablename__ = "restoration_file_draft_metadata"
    __record_model_cls__ = RestorationDraftMetadata
