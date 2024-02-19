import marshmallow as ma
from invenio_drafts_resources.services.records.schema import (
    ParentSchema as InvenioParentSchema,
)
from invenio_vocabularies.services.schema import i18n_strings
from marshmallow import Schema
from marshmallow import fields as ma_fields
from marshmallow.fields import String
from marshmallow.utils import get_value
from marshmallow_utils.fields import SanitizedUnicode
from oarepo_requests.services.schema import NoneReceiverGenericRequestSchema
from oarepo_runtime.services.schema.marshmallow import BaseRecordSchema, DictOnlySchema
from oarepo_runtime.services.schema.validation import validate_date


class GeneratedParentSchema(InvenioParentSchema):
    """"""

    delete_record = ma.fields.Nested(NoneReceiverGenericRequestSchema)
    publish_draft = ma.fields.Nested(NoneReceiverGenericRequestSchema)

    @ma.pre_load
    def clean(self, data, **kwargs):
        """Removes dump_only fields.

        Why: We want to allow the output of a Schema dump, to be a valid input
             to a Schema load without causing strange issues.
        """
        for name, field in self.fields.items():
            if field.dump_only:
                data.pop(name, None)
        return data

    @ma.pre_load
    def clean_delete_record(self, data, **kwargs):
        """Clear review if None."""
        # draft.parent.review returns None when not set, causing the serializer
        # to dump {'review': None}. As a workaround we pop it if it's none
        # here.
        if data.get("delete_record", None) is None:
            data.pop("delete_record", None)
        return data

    @ma.post_dump()
    def pop_delete_record_if_none(self, data, many, **kwargs):
        """Clear review if None."""
        if data.get("delete_record", None) is None:
            data.pop("delete_record", None)
        return data

    @ma.pre_load
    def clean_publish_draft(self, data, **kwargs):
        """Clear review if None."""
        # draft.parent.review returns None when not set, causing the serializer
        # to dump {'review': None}. As a workaround we pop it if it's none
        # here.
        if data.get("publish_draft", None) is None:
            data.pop("publish_draft", None)
        return data

    @ma.post_dump()
    def pop_publish_draft_if_none(self, data, many, **kwargs):
        """Clear review if None."""
        if data.get("publish_draft", None) is None:
            data.pop("publish_draft", None)
        return data


class ObjectsSchema(BaseRecordSchema):
    class Meta:
        unknown = ma.RAISE

    metadata = ma_fields.Nested(lambda: ObjectsMetadataSchema())
    parent = ma.fields.Nested(GeneratedParentSchema)
    files = ma.fields.Nested(
        lambda: FilesOptionsSchema(), load_default={"enabled": True}
    )

    # todo this needs to be generated for [default preview] to work
    def get_attribute(self, obj, attr, default):
        """Override how attributes are retrieved when dumping.

        NOTE: We have to access by attribute because although we are loading
              from an external pure dict, but we are dumping from a data-layer
              object whose fields should be accessed by attributes and not
              keys. Access by key runs into FilesManager key access protection
              and raises.
        """
        if attr == "files":
            return getattr(obj, attr, default)
        else:
            return get_value(obj, attr, default)


class ObjectsMetadataSchema(Schema):
    class Meta:
        unknown = ma.RAISE

    category = ma_fields.String()

    restorationObject = ma_fields.Nested(lambda: RestorationObjectSchema())

    restorationWork = ma_fields.Nested(lambda: RestorationWorkSchema())

    submissionStatus = ma_fields.String()


class RestorationObjectSchema(DictOnlySchema):
    class Meta:
        unknown = ma.RAISE

    archeologic = ma_fields.Boolean()

    category = ma_fields.String()

    creationPeriod = ma_fields.Nested(lambda: CreationPeriodSchema())

    description = ma_fields.String()

    dimensions = ma_fields.List(ma_fields.Nested(lambda: DimensionsItemSchema()))

    itemTypes = ma_fields.List(ma_fields.Nested(lambda: DimensionSchema()))

    keywords = ma_fields.List(ma_fields.String())

    parts = ma_fields.List(ma_fields.Nested(lambda: PartsItemSchema()))

    restorationRequestor = ma_fields.Nested(lambda: DimensionSchema())

    title = ma_fields.String()


class RestorationWorkSchema(DictOnlySchema):
    class Meta:
        unknown = ma.RAISE

    abstract = ma_fields.String()

    examinationMethods = ma_fields.List(ma_fields.Nested(lambda: DimensionSchema()))

    parts = ma_fields.List(ma_fields.Nested(lambda: RestorationWorkPartsItemSchema()))

    restorationMethods = ma_fields.List(ma_fields.Nested(lambda: DimensionSchema()))

    restorationPeriod = ma_fields.Nested(lambda: RestorationPeriodSchema())

    restorer = ma_fields.String()

    supervisors = ma_fields.List(ma_fields.Nested(lambda: SupervisorsItemSchema()))

    workType = ma_fields.Nested(lambda: DimensionSchema())


class DimensionsItemSchema(DictOnlySchema):
    class Meta:
        unknown = ma.RAISE

    dimension = ma_fields.Nested(lambda: DimensionSchema())

    unit = ma_fields.String()

    value = ma_fields.Float()


class PartsItemSchema(DictOnlySchema):
    class Meta:
        unknown = ma.RAISE

    _id = ma_fields.String(data_key="id", attribute="id")

    colors = ma_fields.List(ma_fields.Nested(lambda: DimensionSchema()))

    fabricationTechnologies = ma_fields.List(
        ma_fields.Nested(lambda: DimensionSchema())
    )

    main = ma_fields.Boolean()

    materialType = ma_fields.Nested(lambda: DimensionSchema())

    name = ma_fields.String()

    secondaryMaterialTypes = ma_fields.List(ma_fields.Nested(lambda: DimensionSchema()))


class RestorationWorkPartsItemSchema(DictOnlySchema):
    class Meta:
        unknown = ma.RAISE

    part = ma_fields.Nested(lambda: PartSchema())

    restorationMethods = ma_fields.List(ma_fields.Nested(lambda: DimensionSchema()))


class CreationPeriodSchema(DictOnlySchema):
    class Meta:
        unknown = ma.RAISE

    since = ma_fields.Integer()

    until = ma_fields.Integer()


class DimensionSchema(DictOnlySchema):
    class Meta:
        unknown = ma.INCLUDE

    _id = String(data_key="id", attribute="id")

    _version = String(data_key="@v", attribute="@v")

    title = i18n_strings


class PartSchema(DictOnlySchema):
    class Meta:
        unknown = ma.INCLUDE

    _id = ma_fields.String(data_key="id", attribute="id")

    _version = String(data_key="@v", attribute="@v")


class RestorationPeriodSchema(DictOnlySchema):
    class Meta:
        unknown = ma.RAISE

    since = ma_fields.String(validate=[validate_date("%Y-%m-%d")])

    until = ma_fields.String(validate=[validate_date("%Y-%m-%d")])


class SupervisorsItemSchema(DictOnlySchema):
    class Meta:
        unknown = ma.RAISE

    comment = ma_fields.String()

    fullName = ma_fields.String()

    institution = ma_fields.String()


class FilesOptionsSchema(ma.Schema):
    """Basic files options schema class."""

    enabled = ma.fields.Bool(missing=True)
    # allow unsetting
    default_preview = SanitizedUnicode(allow_none=True)

    def get_attribute(self, obj, attr, default):
        """Override how attributes are retrieved when dumping.

        NOTE: We have to access by attribute because although we are loading
              from an external pure dict, but we are dumping from a data-layer
              object whose fields should be accessed by attributes and not
              keys. Access by key runs into FilesManager key access protection
              and raises.
        """
        value = getattr(obj, attr, default)

        if attr == "default_preview" and not value:
            return default

        return value
