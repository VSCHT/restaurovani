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

    creationPeriod = ma.fields.Nested(lambda: CreationPeriodSchema())

    description = ma.fields.String()

    dimensions = ma.fields.Nested(lambda: DimensionsSchema())

    itemType = ma.fields.Nested(lambda: DimensionSchema())

    keywords = ma.fields.String()

    parts = ma.fields.Nested(lambda: PartsSchema())

    restorationRequestor = ma.fields.Nested(lambda: DimensionSchema())

    stylePeriod = ma.fields.Nested(lambda: StylePeriodSchema())


class RestorationWorkSchema(ma.Schema):
    class Meta:
        unknown = ma.RAISE

    abstract = MultilingualField(I18nStrField())

    examinationMethods = ma.fields.List(ma.fields.Nested(lambda: DimensionSchema()))

    literature = ma.fields.String()

    restorationMethods = ma.fields.List(ma.fields.Nested(lambda: DimensionSchema()))

    restorationPeriod = ma.fields.Nested(lambda: RestorationPeriodSchema())

    sisId = ma.fields.String()

    supervisor = ma.fields.Nested(lambda: SupervisorSchema())

    workType = ma.fields.Nested(lambda: DimensionSchema())


class DimensionsSchema(ma.Schema):
    class Meta:
        unknown = ma.RAISE

    dimension = ma.fields.Nested(lambda: DimensionSchema())

    unit = ma.fields.String()

    value = ma.fields.Float()


class PartsSchema(ma.Schema):
    class Meta:
        unknown = ma.RAISE

    color = ma.fields.Nested(lambda: DimensionSchema())

    fabricationTechnology = ma.fields.Nested(lambda: DimensionSchema())

    main = ma.fields.Boolean()

    materialType = ma.fields.Nested(lambda: DimensionSchema())

    name = MultilingualField(I18nStrField())

    restorationMethods = ma.fields.List(ma.fields.Nested(lambda: DimensionSchema()))

    secondaryMaterialTypes = ma.fields.List(ma.fields.Nested(lambda: DimensionSchema()))


class StylePeriodSchema(ma.Schema):
    class Meta:
        unknown = ma.RAISE

    endYear = ma.fields.Integer()

    period = ma.fields.Nested(lambda: DimensionSchema())

    startYear = ma.fields.Integer()


class SupervisorSchema(ma.Schema):
    class Meta:
        unknown = ma.RAISE

    comment = ma.fields.String()

    fullName = ma.fields.String()

    institution = ma.fields.Nested(lambda: DimensionSchema())

    sisCode = ma.fields.String()


class CreationPeriodSchema(ma.Schema):
    class Meta:
        unknown = ma.RAISE

    since = ma.fields.Integer()

    until = ma.fields.Integer()


class DimensionSchema(ma.Schema):
    class Meta:
        unknown = ma.RAISE

    _id = ma.fields.String(data_key="id", attribute="id")

    _version = ma.fields.String(data_key="@v", attribute="@v")

    title = i18n_strings


class RestorationPeriodSchema(ma.Schema):
    class Meta:
        unknown = ma.RAISE

    since = ma.fields.String(validate=[validate_date("%Y-%m-%d")])

    until = ma.fields.String(validate=[validate_date("%Y-%m-%d")])


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
