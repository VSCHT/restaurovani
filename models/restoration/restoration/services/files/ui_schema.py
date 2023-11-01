import marshmallow as ma
from marshmallow import fields as ma_fields
from marshmallow.validate import OneOf
from oarepo_runtime.services.schema.ui import InvenioUISchema


class RestorationFileUISchema(InvenioUISchema):
    class Meta:
        unknown = ma.RAISE

    featured = ma_fields.Boolean()

    fileType = ma_fields.String(validate=[OneOf(["photo", "document"])])


class RestorationFileDraftUISchema(InvenioUISchema):
    class Meta:
        unknown = ma.RAISE
