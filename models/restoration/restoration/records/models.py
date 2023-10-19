from invenio_db import db
from invenio_drafts_resources.records import (
    DraftMetadataBase,
    ParentRecordMixin,
    ParentRecordStateMixin,
)
from invenio_files_rest.models import Bucket
from invenio_records.models import RecordMetadataBase
from sqlalchemy_utils import UUIDType


class RestorationParentMetadata(db.Model, RecordMetadataBase):
    __tablename__ = "restoration_parent_record_metadata"


class RestorationMetadata(db.Model, RecordMetadataBase, ParentRecordMixin):
    """Model for RestorationRecord metadata."""

    __tablename__ = "restoration_metadata"

    # Enables SQLAlchemy-Continuum versioning
    __versioned__ = {}

    __parent_record_model__ = RestorationParentMetadata
    bucket_id = db.Column(UUIDType, db.ForeignKey(Bucket.id))
    bucket = db.relationship(Bucket)


class RestorationDraftMetadata(db.Model, DraftMetadataBase, ParentRecordMixin):
    """Model for RestorationDraft metadata."""

    __tablename__ = "restoration_draft_metadata"

    __parent_record_model__ = RestorationParentMetadata
    bucket_id = db.Column(UUIDType, db.ForeignKey(Bucket.id))
    bucket = db.relationship(Bucket)


class RestorationParentState(db.Model, ParentRecordStateMixin):
    table_name = "restoration_parent_state_metadata"

    __parent_record_model__ = RestorationParentMetadata
    __record_model__ = RestorationMetadata
    __draft_model__ = RestorationDraftMetadata
