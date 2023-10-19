import marshmallow as ma
from invenio_vocabularies.services.schema import i18n_strings
from marshmallow.utils import get_value
from marshmallow_utils.fields import SanitizedUnicode
from oarepo_runtime.i18n.schema import I18nStrField, MultilingualField
from oarepo_runtime.marshmallow import BaseRecordSchema
from oarepo_runtime.validation import validate_date


class RestorationSchema(BaseRecordSchema):
    class Meta:
        unknown = ma.RAISE

    metadata = ma.fields.Nested(lambda: RestorationMetadataSchema())
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


class RestorationMetadataSchema(ma.Schema):
    class Meta:
        unknown = ma.RAISE

    category = ma.fields.String()

    restorationObject = ma.fields.Nested(lambda: RestorationObjectSchema())

    restorationWork = ma.fields.Nested(lambda: RestorationWorkSchema())

    submissionStatus = ma.fields.String()


class RestorationObjectSchema(ma.Schema):
    class Meta:
        unknown = ma.RAISE

    archeologic = ma.fields.Boolean()

    category = ma.fields.String()

    creationPeriod = ma.fields.Nested(lambda: CreationPeriodSchema())

    description = MultilingualField(I18nStrField())

    dimensions = ma.fields.List(ma.fields.Nested(lambda: DimensionsItemSchema()))

    itemTypes = ma.fields.List(ma.fields.Nested(lambda: DimensionSchema()))

    keywords = ma.fields.List(ma.fields.String())

    parts = ma.fields.List(ma.fields.Nested(lambda: PartsItemSchema()))

    restorationRequestor = ma.fields.Nested(lambda: DimensionSchema())

    stylePeriod = ma.fields.Nested(lambda: StylePeriodSchema())

    title = MultilingualField(I18nStrField())


class RestorationWorkSchema(ma.Schema):
    class Meta:
        unknown = ma.RAISE

    abstract = MultilingualField(I18nStrField())

    examinationMethods = ma.fields.List(ma.fields.Nested(lambda: DimensionSchema()))

    literature = ma.fields.List(ma.fields.String())

    parts = ma.fields.List(ma.fields.Nested(lambda: RestorationWorkPartsItemSchema()))

    restorationMethods = ma.fields.List(ma.fields.Nested(lambda: DimensionSchema()))

    restorationPeriod = ma.fields.Nested(lambda: RestorationPeriodSchema())

    restorer = ma.fields.String()

    sisId = ma.fields.String()

    supervisors = ma.fields.List(ma.fields.Nested(lambda: SupervisorsItemSchema()))

    workType = ma.fields.Nested(lambda: DimensionSchema())


class DimensionsItemSchema(ma.Schema):
    class Meta:
        unknown = ma.RAISE

    dimension = ma.fields.Nested(lambda: DimensionSchema())

    unit = ma.fields.String()

    value = ma.fields.Float()


class PartsItemSchema(ma.Schema):
    class Meta:
        unknown = ma.RAISE

    _id = ma.fields.String(data_key="id", attribute="id")

    colors = ma.fields.List(ma.fields.Nested(lambda: DimensionSchema()))

    fabricationTechnologies = ma.fields.List(
        ma.fields.Nested(lambda: DimensionSchema())
    )

    main = ma.fields.Boolean()

    materialType = ma.fields.Nested(lambda: DimensionSchema())

    name = MultilingualField(I18nStrField())

    secondaryMaterialTypes = ma.fields.List(ma.fields.Nested(lambda: DimensionSchema()))


class RestorationWorkPartsItemSchema(ma.Schema):
    class Meta:
        unknown = ma.RAISE

    part = ma.fields.Nested(lambda: PartSchema())

    restorationMethods = ma.fields.List(ma.fields.Nested(lambda: DimensionSchema()))


class StylePeriodSchema(ma.Schema):
    class Meta:
        unknown = ma.RAISE

    endYear = ma.fields.Integer()

    period = ma.fields.Nested(lambda: DimensionSchema())

    startYear = ma.fields.Integer()


class CreationPeriodSchema(ma.Schema):
    class Meta:
        unknown = ma.RAISE

    since = ma.fields.Integer()

    until = ma.fields.Integer()


class DimensionSchema(ma.Schema):
    class Meta:
        unknown = ma.INCLUDE

    _id = ma.fields.String(data_key="id", attribute="id")

    _version = ma.fields.String(data_key="@v", attribute="@v")

    title = i18n_strings


class PartSchema(ma.Schema):
    class Meta:
        unknown = ma.INCLUDE

    _id = ma.fields.String(data_key="id", attribute="id")

    _version = ma.fields.String(data_key="@v", attribute="@v")


class RestorationPeriodSchema(ma.Schema):
    class Meta:
        unknown = ma.RAISE

    since = ma.fields.String(validate=[validate_date("%Y-%m-%d")])

    until = ma.fields.String(validate=[validate_date("%Y-%m-%d")])


class SupervisorsItemSchema(ma.Schema):
    class Meta:
        unknown = ma.RAISE

    comment = ma.fields.String()

    fullName = ma.fields.String()

    institution = ma.fields.String()

    sisCode = ma.fields.String()


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
