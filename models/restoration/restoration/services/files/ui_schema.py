import marshmallow as ma
from marshmallow import validate as ma_validate
from oarepo_runtime.ui.marshmallow import InvenioUISchema


class RestorationFileUISchema(InvenioUISchema):
    class Meta:
        unknown = ma.RAISE

    featured = ma.fields.Boolean()

    fileType = ma.fields.String(validate=[ma_validate.OneOf(["photo", "document"])])


class RestorationFileDraftUISchema(InvenioUISchema):
    class Meta:
        unknown = ma.RAISE
