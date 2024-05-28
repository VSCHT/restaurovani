import marshmallow as ma
from marshmallow import Schema
from marshmallow import fields as ma_fields
from marshmallow.fields import String
from oarepo_requests.services.ui_schema import UIRequestsSerializationMixin
from oarepo_runtime.services.schema.marshmallow import DictOnlySchema
from oarepo_runtime.services.schema.ui import (
    InvenioUISchema,
    LocalizedDate,
    LocalizedDateTime,
)
from oarepo_vocabularies.services.ui_schema import VocabularyI18nStrUIField


class ObjectsUISchema(UIRequestsSerializationMixin, InvenioUISchema):
    class Meta:
        unknown = ma.RAISE

    metadata = ma_fields.Nested(lambda: ObjectsMetadataUISchema())


class ObjectsMetadataUISchema(Schema):
    class Meta:
        unknown = ma.RAISE

    category = ma_fields.String()

    restorationData = ma_fields.List(
        ma_fields.Nested(lambda: RestorationDataItemUISchema())
    )

    restorationObject = ma_fields.Nested(lambda: RestorationObjectUISchema())

    restorationWork = ma_fields.Nested(lambda: RestorationWorkUISchema())

    submissionStatus = ma_fields.String()


class RestorationObjectUISchema(DictOnlySchema):
    class Meta:
        unknown = ma.RAISE

    archeologic = ma_fields.Boolean()

    category = ma_fields.String()

    colors = ma_fields.List(ma_fields.Nested(lambda: ColorsItemUISchema()))

    creationPeriod = ma_fields.Nested(lambda: CreationPeriodUISchema())

    description = ma_fields.String()

    dimensions = ma_fields.List(ma_fields.Nested(lambda: DimensionsItemUISchema()))

    fabricationTechnologies = ma_fields.List(
        ma_fields.Nested(lambda: ColorsItemUISchema())
    )

    itemTypes = ma_fields.List(ma_fields.Nested(lambda: ColorsItemUISchema()))

    keywords = ma_fields.List(ma_fields.String())

    materialType = ma_fields.Nested(lambda: ColorsItemUISchema())

    restorationRequestor = ma_fields.Nested(lambda: ColorsItemUISchema())

    secondaryMaterialTypes = ma_fields.List(
        ma_fields.Nested(lambda: ColorsItemUISchema())
    )

    title = ma_fields.String()


class DimensionsItemUISchema(DictOnlySchema):
    class Meta:
        unknown = ma.RAISE

    dimension = ma_fields.Nested(lambda: ColorsItemUISchema())

    unit = ma_fields.String()

    value = ma_fields.Float()


class RestorationWorkUISchema(DictOnlySchema):
    class Meta:
        unknown = ma.RAISE

    abstract = ma_fields.String()

    examinationMethods = ma_fields.List(ma_fields.Nested(lambda: ColorsItemUISchema()))

    restorationMethods = ma_fields.List(ma_fields.Nested(lambda: ColorsItemUISchema()))

    restorationPeriod = ma_fields.Nested(lambda: RestorationPeriodUISchema())

    restorer = ma_fields.String()

    supervisors = ma_fields.List(ma_fields.Nested(lambda: SupervisorsItemUISchema()))

    workType = ma_fields.Nested(lambda: ColorsItemUISchema())


class ColorsItemUISchema(DictOnlySchema):
    class Meta:
        unknown = ma.INCLUDE

    _id = String(data_key="id", attribute="id")

    _version = String(data_key="@v", attribute="@v")

    title = VocabularyI18nStrUIField()


class CreationPeriodUISchema(DictOnlySchema):
    class Meta:
        unknown = ma.RAISE

    since = ma_fields.Integer()

    until = ma_fields.Integer()


class RestorationDataItemUISchema(DictOnlySchema):
    class Meta:
        unknown = ma.RAISE

    key = ma_fields.String()

    text = ma_fields.String()

    timestamp = LocalizedDateTime()


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
