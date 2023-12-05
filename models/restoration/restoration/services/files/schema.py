import marshmallow as ma
from invenio_drafts_resources.services.records.schema import (
    ParentSchema as InvenioParentSchema,
)
from invenio_records_resources.services.files.schema import (
    FileSchema as InvenioFileSchema,
)
from marshmallow import fields as ma_fields
from marshmallow.validate import OneOf
from oarepo_runtime.services.schema.validation import validate_date


class GeneratedParentSchema(InvenioParentSchema):
    """"""


class RestorationFileSchema(InvenioFileSchema):
    class Meta:
        unknown = ma.RAISE

    caption = ma_fields.String()

    created = ma_fields.String(dump_only=True, validate=[validate_date("%Y-%m-%d")])

    featured = ma_fields.Boolean()

    fileType = ma_fields.String(validate=[OneOf(["photo", "document"])])

    updated = ma_fields.String(dump_only=True, validate=[validate_date("%Y-%m-%d")])
    parent = ma.fields.Nested(GeneratedParentSchema)
