from oarepo_runtime.services.search import SearchOptions
from invenio_records_resources.services import SearchOptions as InvenioSearchOptions

from . import facets


class ObjectsSearchOptions(SearchOptions):
    """ObjectsRecord search options."""

    facet_groups = {
        "default": {
            "metadata_restorationObject_archeologic": facets.metadata_restorationObject_archeologic,
            "metadata_restorationObject_category": facets.metadata_restorationObject_category,
            "metadata_restorationObject_colors": facets.metadata_restorationObject_colors,
            "metadata_restorationObject_creationPeriod_since": facets.metadata_restorationObject_creationPeriod_since,
            "metadata_restorationObject_creationPeriod_until": facets.metadata_restorationObject_creationPeriod_until,
            "metadata_restorationObject_fabricationTechnologies": facets.metadata_restorationObject_fabricationTechnologies,
            "metadata_restorationObject_itemTypes": facets.metadata_restorationObject_itemTypes,
            "metadata_restorationObject_keywords": facets.metadata_restorationObject_keywords,
            "metadata_restorationObject_materialType": facets.metadata_restorationObject_materialType,
            "metadata_restorationObject_restorationRequestor": facets.metadata_restorationObject_restorationRequestor,
            "metadata_restorationObject_secondaryMaterialTypes": facets.metadata_restorationObject_secondaryMaterialTypes,
            "metadata_restorationWork_examinationMethods": facets.metadata_restorationWork_examinationMethods,
            "metadata_restorationWork_restorationMethods": facets.metadata_restorationWork_restorationMethods,
            "metadata_restorationWork_restorer": facets.metadata_restorationWork_restorer,
            "metadata_restorationWork_supervisors_fullName": facets.metadata_restorationWork_supervisors_fullName,
            "metadata_restorationWork_supervisors_institution": facets.metadata_restorationWork_supervisors_institution,
            "metadata_restorationWork_workType": facets.metadata_restorationWork_workType,
            **getattr(SearchOptions, "facet_groups", {}).get("default", {}),
        },
    }

    facets = {
        "metadata_category": facets.metadata_category,
        "metadata_restorationData_key": facets.metadata_restorationData_key,
        "metadata_restorationData_timestamp": facets.metadata_restorationData_timestamp,
        "metadata_restorationObject_archeologic": facets.metadata_restorationObject_archeologic,
        "metadata_restorationObject_category": facets.metadata_restorationObject_category,
        "metadata_restorationObject_colors": facets.metadata_restorationObject_colors,
        "metadata_restorationObject_creationPeriod_since": facets.metadata_restorationObject_creationPeriod_since,
        "metadata_restorationObject_creationPeriod_until": facets.metadata_restorationObject_creationPeriod_until,
        "metadata_restorationObject_dimensions_dimension": facets.metadata_restorationObject_dimensions_dimension,
        "metadata_restorationObject_dimensions_unit": facets.metadata_restorationObject_dimensions_unit,
        "metadata_restorationObject_dimensions_value": facets.metadata_restorationObject_dimensions_value,
        "metadata_restorationObject_fabricationTechnologies": facets.metadata_restorationObject_fabricationTechnologies,
        "metadata_restorationObject_itemTypes": facets.metadata_restorationObject_itemTypes,
        "metadata_restorationObject_keywords": facets.metadata_restorationObject_keywords,
        "metadata_restorationObject_materialType": facets.metadata_restorationObject_materialType,
        "metadata_restorationObject_restorationRequestor": facets.metadata_restorationObject_restorationRequestor,
        "metadata_restorationObject_secondaryMaterialTypes": facets.metadata_restorationObject_secondaryMaterialTypes,
        "metadata_restorationWork_examinationMethods": facets.metadata_restorationWork_examinationMethods,
        "metadata_restorationWork_restorationMethods": facets.metadata_restorationWork_restorationMethods,
        "metadata_restorationWork_restorationPeriod_since": facets.metadata_restorationWork_restorationPeriod_since,
        "metadata_restorationWork_restorationPeriod_until": facets.metadata_restorationWork_restorationPeriod_until,
        "metadata_restorationWork_restorer": facets.metadata_restorationWork_restorer,
        "metadata_restorationWork_supervisors_comment": facets.metadata_restorationWork_supervisors_comment,
        "metadata_restorationWork_supervisors_fullName": facets.metadata_restorationWork_supervisors_fullName,
        "metadata_restorationWork_supervisors_institution": facets.metadata_restorationWork_supervisors_institution,
        "metadata_restorationWork_workType": facets.metadata_restorationWork_workType,
        "metadata_submissionStatus": facets.metadata_submissionStatus,
        **getattr(SearchOptions, "facets", {}),
    }


class ObjectsDraftSearchOptions(InvenioSearchOptions):

    facet_groups = {}

    facets = {
        "record_status": facets.record_status,
        "has_draft": facets.has_draft,
    }
