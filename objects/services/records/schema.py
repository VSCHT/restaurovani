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
from oarepo_runtime.services.schema.marshmallow import BaseRecordSchema, DictOnlySchema
from oarepo_runtime.services.schema.validation import validate_date, validate_datetime


class GeneratedParentSchema(InvenioParentSchema):
    """"""

    owners = ma.fields.List(ma.fields.Dict(), load_only=True)


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

    restorationData = ma_fields.List(
        ma_fields.Nested(lambda: RestorationDataItemSchema())
    )

    restorationObject = ma_fields.Nested(lambda: RestorationObjectSchema())

    restorationWork = ma_fields.Nested(lambda: RestorationWorkSchema())

    submissionStatus = ma_fields.String()

    version = ma_fields.String()


class RestorationWorkSchema(DictOnlySchema):
    class Meta:
        unknown = ma.RAISE

    abstract = ma_fields.String()

    examinationMethods = ma_fields.List(ma_fields.Nested(lambda: ColorsItemSchema()))

    restorationMethods = ma_fields.List(ma_fields.Nested(lambda: ColorsItemSchema()))

    restorationPeriod = ma_fields.Nested(lambda: RestorationPeriodSchema())

    restorer = ma_fields.String()

    supervisors = ma_fields.List(ma_fields.Nested(lambda: SupervisorsItemSchema()))

    workType = ma_fields.Nested(lambda: ColorsItemSchema())


class RestorationObjectSchema(DictOnlySchema):
    class Meta:
        unknown = ma.RAISE

    archeologic = ma_fields.Boolean()

    category = ma_fields.String()

    colors = ma_fields.List(ma_fields.Nested(lambda: ColorsItemSchema()))

    creationPeriod = ma_fields.Nested(lambda: CreationPeriodSchema())

    description = ma_fields.String()

    dimensions = ma_fields.List(ma_fields.Nested(lambda: DimensionsItemSchema()))

    fabricationTechnologies = ma_fields.List(
        ma_fields.Nested(lambda: ColorsItemSchema())
    )

    itemTypes = ma_fields.List(ma_fields.Nested(lambda: ColorsItemSchema()))

    keywords = ma_fields.List(ma_fields.String())

    materialType = ma_fields.Nested(lambda: ColorsItemSchema())

    restorationRequestor = ma_fields.Nested(lambda: ColorsItemSchema())

    secondaryMaterialTypes = ma_fields.List(
        ma_fields.Nested(lambda: ColorsItemSchema())
    )

    title = ma_fields.String()


class SupervisorsItemSchema(DictOnlySchema):
    class Meta:
        unknown = ma.INCLUDE

    _id = ma_fields.String(data_key="id", attribute="id")

    _version = String(data_key="@v", attribute="@v")

    affiliations = ma_fields.List(ma_fields.Nested(lambda: AffiliationsItemSchema()))

    name = ma_fields.String()


class AffiliationsItemSchema(DictOnlySchema):
    class Meta:
        unknown = ma.RAISE

    _id = ma_fields.String(data_key="id", attribute="id")

    identifiers = ma_fields.List(ma_fields.Nested(lambda: IdentifiersItemSchema()))

    name = ma_fields.String()


class DimensionsItemSchema(DictOnlySchema):
    class Meta:
        unknown = ma.RAISE

    dimension = ma_fields.Nested(lambda: ColorsItemSchema())

    unit = ma_fields.String()

    value = ma_fields.Float()


class ColorsItemSchema(DictOnlySchema):
    class Meta:
        unknown = ma.INCLUDE

    _id = String(data_key="id", attribute="id")

    _version = String(data_key="@v", attribute="@v")

    title = i18n_strings


class CreationPeriodSchema(DictOnlySchema):
    class Meta:
        unknown = ma.RAISE

    since = ma_fields.Integer()

    until = ma_fields.Integer()


class IdentifiersItemSchema(DictOnlySchema):
    class Meta:
        unknown = ma.RAISE

    identifier = ma_fields.String()

    scheme = ma_fields.String()


class RestorationDataItemSchema(DictOnlySchema):
    class Meta:
        unknown = ma.RAISE

    key = ma_fields.String()

    text = ma_fields.String()

    timestamp = ma_fields.String(validate=[validate_datetime])


class RestorationPeriodSchema(DictOnlySchema):
    class Meta:
        unknown = ma.RAISE

    since = ma_fields.String(validate=[validate_date("%Y-%m-%d")])

    until = ma_fields.String(validate=[validate_date("%Y-%m-%d")])


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
