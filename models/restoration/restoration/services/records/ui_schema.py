import marshmallow as ma
from oarepo_runtime.i18n.ui_schema import I18nStrUIField, MultilingualUIField
from oarepo_runtime.ui import marshmallow as l10n
from oarepo_runtime.ui.marshmallow import InvenioUISchema
from oarepo_vocabularies.services.ui_schema import VocabularyI18nStrUIField


class RestorationUISchema(InvenioUISchema):
    class Meta:
        unknown = ma.RAISE

    metadata = ma.fields.Nested(lambda: RestorationMetadataUISchema())


class RestorationMetadataUISchema(ma.Schema):
    class Meta:
        unknown = ma.RAISE

    category = ma.fields.String()

    restorationObject = ma.fields.Nested(lambda: RestorationObjectUISchema())

    restorationWork = ma.fields.Nested(lambda: RestorationWorkUISchema())

    submissionStatus = ma.fields.String()


class RestorationObjectUISchema(ma.Schema):
    class Meta:
        unknown = ma.RAISE

    archeologic = ma.fields.Boolean()

    creationPeriod = ma.fields.Nested(lambda: CreationPeriodUISchema())

    description = ma.fields.String()

    dimensions = ma.fields.List(ma.fields.Nested(lambda: DimensionsItemUISchema()))

    itemType = ma.fields.List(ma.fields.Nested(lambda: DimensionUISchema()))

    keywords = ma.fields.List(ma.fields.String())

    parts = ma.fields.List(ma.fields.Nested(lambda: PartsItemUISchema()))

    restorationRequestor = ma.fields.Nested(lambda: DimensionUISchema())

    stylePeriod = ma.fields.Nested(lambda: StylePeriodUISchema())

    title = ma.fields.String()


class RestorationWorkUISchema(ma.Schema):
    class Meta:
        unknown = ma.RAISE

    abstract = MultilingualUIField(I18nStrUIField())

    examinationMethods = ma.fields.List(ma.fields.Nested(lambda: DimensionUISchema()))

    literature = ma.fields.List(ma.fields.String())

    parts = ma.fields.List(ma.fields.Nested(lambda: RestorationWorkPartsItemUISchema()))

    restorationMethods = ma.fields.List(ma.fields.Nested(lambda: DimensionUISchema()))

    restorationPeriod = ma.fields.Nested(lambda: RestorationPeriodUISchema())

    sisId = ma.fields.String()

    supervisors = ma.fields.List(ma.fields.Nested(lambda: SupervisorsItemUISchema()))

    workType = ma.fields.Nested(lambda: DimensionUISchema())


class DimensionsItemUISchema(ma.Schema):
    class Meta:
        unknown = ma.RAISE

    dimension = ma.fields.Nested(lambda: DimensionUISchema())

    unit = ma.fields.String()

    value = ma.fields.Float()


class PartsItemUISchema(ma.Schema):
    class Meta:
        unknown = ma.RAISE

    _id = ma.fields.String(data_key="id", attribute="id")

    colors = ma.fields.List(ma.fields.Nested(lambda: DimensionUISchema()))

    fabricationTechnologies = ma.fields.List(
        ma.fields.Nested(lambda: DimensionUISchema())
    )

    main = ma.fields.Boolean()

    materialType = ma.fields.Nested(lambda: DimensionUISchema())

    name = MultilingualUIField(I18nStrUIField())

    secondaryMaterialTypes = ma.fields.List(
        ma.fields.Nested(lambda: DimensionUISchema())
    )


class RestorationWorkPartsItemUISchema(ma.Schema):
    class Meta:
        unknown = ma.RAISE

    part = ma.fields.Nested(lambda: PartUISchema())

    restorationMethods = ma.fields.List(ma.fields.Nested(lambda: DimensionUISchema()))


class StylePeriodUISchema(ma.Schema):
    class Meta:
        unknown = ma.RAISE

    endYear = ma.fields.Integer()

    period = ma.fields.Nested(lambda: DimensionUISchema())

    startYear = ma.fields.Integer()


class SupervisorsItemUISchema(ma.Schema):
    class Meta:
        unknown = ma.RAISE

    comment = ma.fields.String()

    fullName = ma.fields.String()

    institution = ma.fields.Nested(lambda: DimensionUISchema())

    sisCode = ma.fields.String()


class CreationPeriodUISchema(ma.Schema):
    class Meta:
        unknown = ma.RAISE

    since = ma.fields.Integer()

    until = ma.fields.Integer()


class DimensionUISchema(ma.Schema):
    class Meta:
        unknown = ma.RAISE

    _id = ma.fields.String(data_key="id", attribute="id")

    _version = ma.fields.String(data_key="@v", attribute="@v")

    title = VocabularyI18nStrUIField()


class PartUISchema(ma.Schema):
    class Meta:
        unknown = ma.RAISE

    _id = ma.fields.String(data_key="id", attribute="id")

    _version = ma.fields.String(data_key="@v", attribute="@v")


class RestorationPeriodUISchema(ma.Schema):
    class Meta:
        unknown = ma.RAISE

    since = l10n.LocalizedDate()

    until = l10n.LocalizedDate()
