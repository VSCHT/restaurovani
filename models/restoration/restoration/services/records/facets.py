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

metadata_restorationObject_creationPeriod_since = TermsFacet(
    field="metadata.restorationObject.creationPeriod.since",
    label=_("metadata/restorationObject/creationPeriod/since.label"),
)

metadata_restorationObject_creationPeriod_until = TermsFacet(
    field="metadata.restorationObject.creationPeriod.until",
    label=_("metadata/restorationObject/creationPeriod/until.label"),
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

metadata_restorationObject_itemType = VocabularyFacet(
    field="metadata.restorationObject.itemType",
    label=_("metadata/restorationObject/itemType.label"),
    vocabulary="ItemTypes",
)

metadata_restorationObject_keywords = TermsFacet(
    field="metadata.restorationObject.keywords",
    label=_("metadata/restorationObject/keywords.label"),
)

metadata_restorationObject_parts_color = NestedLabeledFacet(
    path="metadata.restorationObject.parts",
    nested_facet=VocabularyFacet(
        field="metadata.restorationObject.parts.color",
        label=_("metadata/restorationObject/parts/color.label"),
        vocabulary="Colors",
    ),
)

metadata_restorationObject_parts_fabricationTechnology = NestedLabeledFacet(
    path="metadata.restorationObject.parts",
    nested_facet=VocabularyFacet(
        field="metadata.restorationObject.parts.fabricationTechnology",
        label=_("metadata/restorationObject/parts/fabricationTechnology.label"),
        vocabulary="FabricationTechnologies",
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

metadata_restorationObject_parts_restorationMethods = NestedLabeledFacet(
    path="metadata.restorationObject.parts",
    nested_facet=VocabularyFacet(
        field="metadata.restorationObject.parts.restorationMethods",
        label=_("metadata/restorationObject/parts/restorationMethods.label"),
        vocabulary="RestorationMethods",
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
    vocabulary="RestorationRequestors",
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

metadata_restorationWork_sisId = TermsFacet(
    field="metadata.restorationWork.sisId",
    label=_("metadata/restorationWork/sisId.label"),
)

metadata_restorationWork_supervisor_comment = TermsFacet(
    field="metadata.restorationWork.supervisor.comment",
    label=_("metadata/restorationWork/supervisor/comment.label"),
)

metadata_restorationWork_supervisor_fullName = TermsFacet(
    field="metadata.restorationWork.supervisor.fullName",
    label=_("metadata/restorationWork/supervisor/fullName.label"),
)

metadata_restorationWork_supervisor_institution = VocabularyFacet(
    field="metadata.restorationWork.supervisor.institution",
    label=_("metadata/restorationWork/supervisor/institution.label"),
    vocabulary="Institutions",
)

metadata_restorationWork_supervisor_sisCode = TermsFacet(
    field="metadata.restorationWork.supervisor.sisCode",
    label=_("metadata/restorationWork/supervisor/sisCode.label"),
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
