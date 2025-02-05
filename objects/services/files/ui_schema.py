import marshmallow as ma
from marshmallow import Schema
from marshmallow import fields as ma_fields
from marshmallow.validate import OneOf
from oarepo_runtime.services.schema.ui import InvenioUISchema


class ObjectsFileUISchema(InvenioUISchema):
    class Meta:
        unknown = ma.RAISE

    metadata = ma_fields.Nested(lambda: ObjectsFileMetadataUISchema())


class ObjectsFileMetadataUISchema(Schema):
    class Meta:
        unknown = ma.RAISE

    caption = ma_fields.String()

    featured = ma_fields.Boolean()

    fileType = ma_fields.String(validate=[OneOf(["photo", "document"])])


class ObjectsFileDraftUISchema(InvenioUISchema):
    class Meta:
        unknown = ma.RAISE
