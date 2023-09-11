import marshmallow as ma
from invenio_records_resources.services.files.schema import (
    FileSchema as InvenioFileSchema,
)
from marshmallow import validate as ma_validate
from oarepo_runtime.validation import validate_date


class RestorationFileSchema(InvenioFileSchema):
    class Meta:
        unknown = ma.RAISE

    created = ma.fields.String(dump_only=True, validate=[validate_date("%Y-%m-%d")])

    featured = ma.fields.Boolean()

    fileType = ma.fields.String(validate=[ma_validate.OneOf(["photo", "document"])])

    updated = ma.fields.String(dump_only=True, validate=[validate_date("%Y-%m-%d")])
