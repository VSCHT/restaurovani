"""Facet definitions."""

from flask_babelex import lazy_gettext as _
from invenio_records_resources.services.records.facets import TermsFacet
from oarepo_runtime.facets.date import DateTimeFacet
from oarepo_runtime.facets.nested_facet import NestedLabeledFacet
from oarepo_vocabularies.services.facets import VocabularyFacet

_schema = TermsFacet(field="$schema", label=_("$schema.label"))

created = DateTimeFacet(field="created", label=_("created.label"))

_id = TermsFacet(field="id", label=_("id.label"))

metadata_category = TermsFacet(
    field="metadata.category", label=_("metadata/category.label")
)

metadata_restorationObject_archeologic = TermsFacet(
    field="metadata.restorationObject.archeologic",
    label=_("metadata/restorationObject/archeologic.label"),
)

metadata_restorationObject_category = TermsFacet(
    field="metadata.restorationObject.category",
    label=_("metadata/restorationObject/category.label"),
)

metadata_restorationObject_creationPeriod_since = TermsFacet(
    field="metadata.restorationObject.creationPeriod.since",
    label=_("metadata/restorationObject/creationPeriod/since.label"),
)

metadata_restorationObject_creationPeriod_until = TermsFacet(
    field="metadata.restorationObject.creationPeriod.until",
    label=_("metadata/restorationObject/creationPeriod/until.label"),
)

metadata_restorationObject_description_cs = TermsFacet(
    field="metadata.restorationObject.description.cs.keyword",
    label=_("metadata/restorationObject/description.label"),
)

metadata_restorationObject_description_en = TermsFacet(
    field="metadata.restorationObject.description.en.keyword",
    label=_("metadata/restorationObject/description.label"),
)

metadata_restorationObject_description_lang = NestedLabeledFacet(
    path="metadata.restorationObject.description",
    nested_facet=TermsFacet(
        field="metadata.restorationObject.description.lang",
        label=_("metadata/restorationObject/description/lang.label"),
    ),
)

metadata_restorationObject_description_value = NestedLabeledFacet(
    path="metadata.restorationObject.description",
    nested_facet=TermsFacet(
        field="metadata.restorationObject.description.value.keyword",
        label=_("metadata/restorationObject/description/value.label"),
    ),
)

metadata_restorationObject_dimensions_dimension = VocabularyFacet(
    field="metadata.restorationObject.dimensions.dimension",
    label=_("metadata/restorationObject/dimensions/dimension.label"),
    vocabulary="Dimensions",
)

metadata_restorationObject_dimensions_unit = TermsFacet(
    field="metadata.restorationObject.dimensions.unit",
    label=_("metadata/restorationObject/dimensions/unit.label"),
)

metadata_restorationObject_dimensions_value = TermsFacet(
    field="metadata.restorationObject.dimensions.value",
    label=_("metadata/restorationObject/dimensions/value.label"),
)

metadata_restorationObject_itemTypes = VocabularyFacet(
    field="metadata.restorationObject.itemTypes",
    label=_("metadata/restorationObject/itemTypes.label"),
    vocabulary="ItemTypes",
)

metadata_restorationObject_keywords = TermsFacet(
    field="metadata.restorationObject.keywords",
    label=_("metadata/restorationObject/keywords.label"),
)

metadata_restorationObject_parts_colors = NestedLabeledFacet(
    path="metadata.restorationObject.parts",
    nested_facet=VocabularyFacet(
        field="metadata.restorationObject.parts.colors",
        label=_("metadata/restorationObject/parts/colors.label"),
        vocabulary="Colors",
    ),
)

metadata_restorationObject_parts_fabricationTechnologies = NestedLabeledFacet(
    path="metadata.restorationObject.parts",
    nested_facet=VocabularyFacet(
        field="metadata.restorationObject.parts.fabricationTechnologies",
        label=_("metadata/restorationObject/parts/fabricationTechnologies.label"),
        vocabulary="FabricationTechnologies",
    ),
)

metadata_restorationObject_parts_id = NestedLabeledFacet(
    path="metadata.restorationObject.parts",
    nested_facet=TermsFacet(
        field="metadata.restorationObject.parts.id",
        label=_("metadata/restorationObject/parts/id.label"),
    ),
)

metadata_restorationObject_parts_main = NestedLabeledFacet(
    path="metadata.restorationObject.parts",
    nested_facet=TermsFacet(
        field="metadata.restorationObject.parts.main",
        label=_("metadata/restorationObject/parts/main.label"),
    ),
)

metadata_restorationObject_parts_materialType = NestedLabeledFacet(
    path="metadata.restorationObject.parts",
    nested_facet=VocabularyFacet(
        field="metadata.restorationObject.parts.materialType",
        label=_("metadata/restorationObject/parts/materialType.label"),
        vocabulary="MaterialTypes",
    ),
)

metadata_restorationObject_parts_name_cs = NestedLabeledFacet(
    path="metadata.restorationObject.parts",
    nested_facet=TermsFacet(
        field="metadata.restorationObject.parts.name.cs.keyword",
        label=_("metadata/restorationObject/parts/name.label"),
    ),
)

metadata_restorationObject_parts_name_en = NestedLabeledFacet(
    path="metadata.restorationObject.parts",
    nested_facet=TermsFacet(
        field="metadata.restorationObject.parts.name.en.keyword",
        label=_("metadata/restorationObject/parts/name.label"),
    ),
)

metadata_restorationObject_parts_name_lang = NestedLabeledFacet(
    path="metadata.restorationObject.parts",
    nested_facet=NestedLabeledFacet(
        path="metadata.restorationObject.parts.name",
        nested_facet=TermsFacet(
            field="metadata.restorationObject.parts.name.lang",
            label=_("metadata/restorationObject/parts/name/lang.label"),
        ),
    ),
)

metadata_restorationObject_parts_name_value = NestedLabeledFacet(
    path="metadata.restorationObject.parts",
    nested_facet=NestedLabeledFacet(
        path="metadata.restorationObject.parts.name",
        nested_facet=TermsFacet(
            field="metadata.restorationObject.parts.name.value.keyword",
            label=_("metadata/restorationObject/parts/name/value.label"),
        ),
    ),
)

metadata_restorationObject_parts_secondaryMaterialTypes = NestedLabeledFacet(
    path="metadata.restorationObject.parts",
    nested_facet=VocabularyFacet(
        field="metadata.restorationObject.parts.secondaryMaterialTypes",
        label=_("metadata/restorationObject/parts/secondaryMaterialTypes.label"),
        vocabulary="MaterialTypes",
    ),
)

metadata_restorationObject_restorationRequestor = VocabularyFacet(
    field="metadata.restorationObject.restorationRequestor",
    label=_("metadata/restorationObject/restorationRequestor.label"),
    vocabulary="Requestors",
)

metadata_restorationObject_stylePeriod_endYear = TermsFacet(
    field="metadata.restorationObject.stylePeriod.endYear",
    label=_("metadata/restorationObject/stylePeriod/endYear.label"),
)

metadata_restorationObject_stylePeriod_period = VocabularyFacet(
    field="metadata.restorationObject.stylePeriod.period",
    label=_("metadata/restorationObject/stylePeriod/period.label"),
    vocabulary="StylePeriods",
)

metadata_restorationObject_stylePeriod_startYear = TermsFacet(
    field="metadata.restorationObject.stylePeriod.startYear",
    label=_("metadata/restorationObject/stylePeriod/startYear.label"),
)

metadata_restorationObject_title_cs = TermsFacet(
    field="metadata.restorationObject.title.cs.keyword",
    label=_("metadata/restorationObject/title.label"),
)

metadata_restorationObject_title_en = TermsFacet(
    field="metadata.restorationObject.title.en.keyword",
    label=_("metadata/restorationObject/title.label"),
)

metadata_restorationObject_title_lang = NestedLabeledFacet(
    path="metadata.restorationObject.title",
    nested_facet=TermsFacet(
        field="metadata.restorationObject.title.lang",
        label=_("metadata/restorationObject/title/lang.label"),
    ),
)

metadata_restorationObject_title_value = NestedLabeledFacet(
    path="metadata.restorationObject.title",
    nested_facet=TermsFacet(
        field="metadata.restorationObject.title.value.keyword",
        label=_("metadata/restorationObject/title/value.label"),
    ),
)

metadata_restorationWork_abstract_cs = TermsFacet(
    field="metadata.restorationWork.abstract.cs.keyword",
    label=_("metadata/restorationWork/abstract.label"),
)

metadata_restorationWork_abstract_en = TermsFacet(
    field="metadata.restorationWork.abstract.en.keyword",
    label=_("metadata/restorationWork/abstract.label"),
)

metadata_restorationWork_abstract_lang = NestedLabeledFacet(
    path="metadata.restorationWork.abstract",
    nested_facet=TermsFacet(
        field="metadata.restorationWork.abstract.lang",
        label=_("metadata/restorationWork/abstract/lang.label"),
    ),
)

metadata_restorationWork_abstract_value = NestedLabeledFacet(
    path="metadata.restorationWork.abstract",
    nested_facet=TermsFacet(
        field="metadata.restorationWork.abstract.value.keyword",
        label=_("metadata/restorationWork/abstract/value.label"),
    ),
)

metadata_restorationWork_examinationMethods = VocabularyFacet(
    field="metadata.restorationWork.examinationMethods",
    label=_("metadata/restorationWork/examinationMethods.label"),
    vocabulary="ExaminationMethods",
)

metadata_restorationWork_parts_part__version = NestedLabeledFacet(
    path="metadata.restorationWork.parts",
    nested_facet=TermsFacet(
        field="metadata.restorationWork.parts.part.@v",
        label=_("metadata/restorationWork/parts/part/@v.label"),
    ),
)

metadata_restorationWork_parts_restorationMethods = NestedLabeledFacet(
    path="metadata.restorationWork.parts",
    nested_facet=VocabularyFacet(
        field="metadata.restorationWork.parts.restorationMethods",
        label=_("metadata/restorationWork/parts/restorationMethods.label"),
        vocabulary="RestorationMethods",
    ),
)

metadata_restorationWork_restorationMethods = VocabularyFacet(
    field="metadata.restorationWork.restorationMethods",
    label=_("metadata/restorationWork/restorationMethods.label"),
    vocabulary="RestorationMethods",
)

metadata_restorationWork_restorationPeriod_since = DateTimeFacet(
    field="metadata.restorationWork.restorationPeriod.since",
    label=_("metadata/restorationWork/restorationPeriod/since.label"),
)

metadata_restorationWork_restorationPeriod_until = DateTimeFacet(
    field="metadata.restorationWork.restorationPeriod.until",
    label=_("metadata/restorationWork/restorationPeriod/until.label"),
)

metadata_restorationWork_restorer = TermsFacet(
    field="metadata.restorationWork.restorer",
    label=_("metadata/restorationWork/restorer.label"),
)

metadata_restorationWork_sisId = TermsFacet(
    field="metadata.restorationWork.sisId",
    label=_("metadata/restorationWork/sisId.label"),
)

metadata_restorationWork_supervisors_comment = TermsFacet(
    field="metadata.restorationWork.supervisors.comment",
    label=_("metadata/restorationWork/supervisors/comment.label"),
)

metadata_restorationWork_supervisors_fullName = TermsFacet(
    field="metadata.restorationWork.supervisors.fullName",
    label=_("metadata/restorationWork/supervisors/fullName.label"),
)

metadata_restorationWork_supervisors_institution = TermsFacet(
    field="metadata.restorationWork.supervisors.institution",
    label=_("metadata/restorationWork/supervisors/institution.label"),
)

metadata_restorationWork_supervisors_sisCode = TermsFacet(
    field="metadata.restorationWork.supervisors.sisCode",
    label=_("metadata/restorationWork/supervisors/sisCode.label"),
)

metadata_restorationWork_workType = VocabularyFacet(
    field="metadata.restorationWork.workType",
    label=_("metadata/restorationWork/workType.label"),
    vocabulary="WorkTypes",
)

metadata_submissionStatus = TermsFacet(
    field="metadata.submissionStatus", label=_("metadata/submissionStatus.label")
)

updated = DateTimeFacet(field="updated", label=_("updated.label"))