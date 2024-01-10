"""Facet definitions."""

from invenio_records_resources.services.records.facets import TermsFacet
from oarepo_runtime.i18n import lazy_gettext as _
from oarepo_runtime.services.facets.date import DateTimeFacet
from oarepo_runtime.services.facets.nested_facet import NestedLabeledFacet
from oarepo_vocabularies.services.facets import VocabularyFacet

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

metadata_restorationWork_examinationMethods = VocabularyFacet(
    field="metadata.restorationWork.examinationMethods",
    label=_("metadata/restorationWork/examinationMethods.label"),
    vocabulary="ExaminationMethods",
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

metadata_restorationWork_workType = VocabularyFacet(
    field="metadata.restorationWork.workType",
    label=_("metadata/restorationWork/workType.label"),
    vocabulary="WorkTypes",
)

metadata_submissionStatus = TermsFacet(
    field="metadata.submissionStatus", label=_("metadata/submissionStatus.label")
)
