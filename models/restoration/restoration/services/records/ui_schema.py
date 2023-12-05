import marshmallow as ma
from marshmallow import Schema
from marshmallow import fields as ma_fields
from marshmallow.fields import String
from oarepo_runtime.services.schema.marshmallow import DictOnlySchema
from oarepo_runtime.services.schema.ui import InvenioUISchema, LocalizedDate
from oarepo_vocabularies.services.ui_schema import VocabularyI18nStrUIField


class RestorationUISchema(InvenioUISchema):
    class Meta:
        unknown = ma.RAISE

    metadata = ma_fields.Nested(lambda: RestorationMetadataUISchema())


class RestorationMetadataUISchema(Schema):
    class Meta:
        unknown = ma.RAISE

    category = ma_fields.String()

    restorationObject = ma_fields.Nested(lambda: RestorationObjectUISchema())

    restorationWork = ma_fields.Nested(lambda: RestorationWorkUISchema())

    submissionStatus = ma_fields.String()


class RestorationObjectUISchema(DictOnlySchema):
    class Meta:
        unknown = ma.RAISE

    archeologic = ma_fields.Boolean()

    category = ma_fields.String()

    creationPeriod = ma_fields.Nested(lambda: CreationPeriodUISchema())

    description = ma_fields.String()

    dimensions = ma_fields.List(ma_fields.Nested(lambda: DimensionsItemUISchema()))

    itemTypes = ma_fields.List(ma_fields.Nested(lambda: DimensionUISchema()))

    keywords = ma_fields.List(ma_fields.String())

    parts = ma_fields.List(ma_fields.Nested(lambda: PartsItemUISchema()))

    restorationRequestor = ma_fields.Nested(lambda: DimensionUISchema())

    title = ma_fields.String()


class RestorationWorkUISchema(DictOnlySchema):
    class Meta:
        unknown = ma.RAISE

    abstract = ma_fields.String()

    examinationMethods = ma_fields.List(ma_fields.Nested(lambda: DimensionUISchema()))

    parts = ma_fields.List(ma_fields.Nested(lambda: RestorationWorkPartsItemUISchema()))

    restorationMethods = ma_fields.List(ma_fields.Nested(lambda: DimensionUISchema()))

    restorationPeriod = ma_fields.Nested(lambda: RestorationPeriodUISchema())

    restorer = ma_fields.String()

    supervisors = ma_fields.List(ma_fields.Nested(lambda: SupervisorsItemUISchema()))

    workType = ma_fields.Nested(lambda: DimensionUISchema())


class DimensionsItemUISchema(DictOnlySchema):
    class Meta:
        unknown = ma.RAISE

    dimension = ma_fields.Nested(lambda: DimensionUISchema())

    unit = ma_fields.String()

    value = ma_fields.Float()


class PartsItemUISchema(DictOnlySchema):
    class Meta:
        unknown = ma.RAISE

    _id = ma_fields.String(data_key="id", attribute="id")

    colors = ma_fields.List(ma_fields.Nested(lambda: DimensionUISchema()))

    fabricationTechnologies = ma_fields.List(
        ma_fields.Nested(lambda: DimensionUISchema())
    )

    main = ma_fields.Boolean()

    materialType = ma_fields.Nested(lambda: DimensionUISchema())

    name = ma_fields.String()

    secondaryMaterialTypes = ma_fields.List(
        ma_fields.Nested(lambda: DimensionUISchema())
    )


class RestorationWorkPartsItemUISchema(DictOnlySchema):
    class Meta:
        unknown = ma.RAISE

    part = ma_fields.Nested(lambda: PartUISchema())

    restorationMethods = ma_fields.List(ma_fields.Nested(lambda: DimensionUISchema()))


class CreationPeriodUISchema(DictOnlySchema):
    class Meta:
        unknown = ma.RAISE

    since = ma_fields.Integer()

    until = ma_fields.Integer()


class DimensionUISchema(DictOnlySchema):
    class Meta:
        unknown = ma.INCLUDE

    _id = String(data_key="id", attribute="id")

    _version = String(data_key="@v", attribute="@v")

    title = VocabularyI18nStrUIField()


class PartUISchema(DictOnlySchema):
    class Meta:
        unknown = ma.INCLUDE

    _id = ma_fields.String(data_key="id", attribute="id")

    _version = String(data_key="@v", attribute="@v")


class RestorationPeriodUISchema(DictOnlySchema):
    class Meta:
        unknown = ma.RAISE

    since = LocalizedDate()

    until = LocalizedDate()


class SupervisorsItemUISchema(DictOnlySchema):
    class Meta:
        unknown = ma.RAISE

    comment = ma_fields.String()

    fullName = ma_fields.String()

    institution = ma_fields.String()
