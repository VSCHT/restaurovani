import marshmallow as ma
from invenio_records_resources.services.files.schema import (
    FileSchema as InvenioFileSchema,
)
from marshmallow import Schema
from marshmallow import fields as ma_fields
from marshmallow.validate import OneOf
from oarepo_runtime.services.schema.validation import validate_date


class ObjectsFileSchema(InvenioFileSchema):
    class Meta:
        unknown = ma.RAISE

    created = ma_fields.String(dump_only=True, validate=[validate_date("%Y-%m-%d")])

    metadata = ma_fields.Nested(lambda: ObjectsFileMetadataSchema())

    updated = ma_fields.String(dump_only=True, validate=[validate_date("%Y-%m-%d")])


class ObjectsFileMetadataSchema(Schema):
    class Meta:
        unknown = ma.RAISE

    caption = ma_fields.String()

    featured = ma_fields.Boolean()

    fileType = ma_fields.String(validate=[OneOf(["photo", "document"])])
