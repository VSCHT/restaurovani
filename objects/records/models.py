from invenio_db import db
from invenio_drafts_resources.records import (
    DraftMetadataBase,
    ParentRecordMixin,
    ParentRecordStateMixin,
)
from invenio_files_rest.models import Bucket
from invenio_records.models import RecordMetadataBase
from sqlalchemy_utils import UUIDType


class ObjectsParentMetadata(db.Model, RecordMetadataBase):

    __tablename__ = "objects_parent_record_metadata"


class ObjectsMetadata(db.Model, RecordMetadataBase, ParentRecordMixin):
    """Model for ObjectsRecord metadata."""

    __tablename__ = "objects_metadata"

    # Enables SQLAlchemy-Continuum versioning
    __versioned__ = {}

    __parent_record_model__ = ObjectsParentMetadata
    bucket_id = db.Column(UUIDType, db.ForeignKey(Bucket.id))
    bucket = db.relationship(Bucket)


class ObjectsDraftMetadata(db.Model, DraftMetadataBase, ParentRecordMixin):
    """Model for ObjectsDraft metadata."""

    __tablename__ = "objects_draft_metadata"

    __parent_record_model__ = ObjectsParentMetadata
    bucket_id = db.Column(UUIDType, db.ForeignKey(Bucket.id))
    bucket = db.relationship(Bucket)


class ObjectsParentState(db.Model, ParentRecordStateMixin):
    table_name = "objects_parent_state_metadata"

    __parent_record_model__ = ObjectsParentMetadata
    __record_model__ = ObjectsMetadata
    __draft_model__ = ObjectsDraftMetadata
