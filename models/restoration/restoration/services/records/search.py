from invenio_records_resources.services import SearchOptions as InvenioSearchOptions

from . import facets


class RestorationSearchOptions(InvenioSearchOptions):
    """RestorationRecord search options."""

    facets = {
        "_schema": facets._schema,
        "created": facets.created,
        "_id": facets._id,
        "metadata_category": facets.metadata_category,
        "metadata_restorationObject_archeologic": (
            facets.metadata_restorationObject_archeologic
        ),
        "metadata_restorationObject_creationPeriod_since": (
            facets.metadata_restorationObject_creationPeriod_since
        ),
        "metadata_restorationObject_creationPeriod_until": (
            facets.metadata_restorationObject_creationPeriod_until
        ),
        "metadata_restorationObject_dimensions_dimension": (
            facets.metadata_restorationObject_dimensions_dimension
        ),
        "metadata_restorationObject_dimensions_unit": (
            facets.metadata_restorationObject_dimensions_unit
        ),
        "metadata_restorationObject_dimensions_value": (
            facets.metadata_restorationObject_dimensions_value
        ),
        "metadata_restorationObject_itemType": (
            facets.metadata_restorationObject_itemType
        ),
        "metadata_restorationObject_keywords": (
            facets.metadata_restorationObject_keywords
        ),
        "metadata_restorationObject_parts_color": (
            facets.metadata_restorationObject_parts_color
        ),
        "metadata_restorationObject_parts_fabricationTechnology": (
            facets.metadata_restorationObject_parts_fabricationTechnology
        ),
        "metadata_restorationObject_parts_main": (
            facets.metadata_restorationObject_parts_main
        ),
        "metadata_restorationObject_parts_materialType": (
            facets.metadata_restorationObject_parts_materialType
        ),
        "metadata_restorationObject_parts_name_cs": (
            facets.metadata_restorationObject_parts_name_cs
        ),
        "metadata_restorationObject_parts_name_en": (
            facets.metadata_restorationObject_parts_name_en
        ),
        "metadata_restorationObject_parts_name_lang": (
            facets.metadata_restorationObject_parts_name_lang
        ),
        "metadata_restorationObject_parts_name_value": (
            facets.metadata_restorationObject_parts_name_value
        ),
        "metadata_restorationObject_parts_restorationMethods": (
            facets.metadata_restorationObject_parts_restorationMethods
        ),
        "metadata_restorationObject_parts_secondaryMaterialTypes": (
            facets.metadata_restorationObject_parts_secondaryMaterialTypes
        ),
        "metadata_restorationObject_restorationRequestor": (
            facets.metadata_restorationObject_restorationRequestor
        ),
        "metadata_restorationObject_stylePeriod_endYear": (
            facets.metadata_restorationObject_stylePeriod_endYear
        ),
        "metadata_restorationObject_stylePeriod_period": (
            facets.metadata_restorationObject_stylePeriod_period
        ),
        "metadata_restorationObject_stylePeriod_startYear": (
            facets.metadata_restorationObject_stylePeriod_startYear
        ),
        "metadata_restorationWork_abstract_cs": (
            facets.metadata_restorationWork_abstract_cs
        ),
        "metadata_restorationWork_abstract_en": (
            facets.metadata_restorationWork_abstract_en
        ),
        "metadata_restorationWork_abstract_lang": (
            facets.metadata_restorationWork_abstract_lang
        ),
        "metadata_restorationWork_abstract_value": (
            facets.metadata_restorationWork_abstract_value
        ),
        "metadata_restorationWork_examinationMethods": (
            facets.metadata_restorationWork_examinationMethods
        ),
        "metadata_restorationWork_restorationMethods": (
            facets.metadata_restorationWork_restorationMethods
        ),
        "metadata_restorationWork_restorationPeriod_since": (
            facets.metadata_restorationWork_restorationPeriod_since
        ),
        "metadata_restorationWork_restorationPeriod_until": (
            facets.metadata_restorationWork_restorationPeriod_until
        ),
        "metadata_restorationWork_sisId": facets.metadata_restorationWork_sisId,
        "metadata_restorationWork_supervisor_comment": (
            facets.metadata_restorationWork_supervisor_comment
        ),
        "metadata_restorationWork_supervisor_fullName": (
            facets.metadata_restorationWork_supervisor_fullName
        ),
        "metadata_restorationWork_supervisor_institution": (
            facets.metadata_restorationWork_supervisor_institution
        ),
        "metadata_restorationWork_supervisor_sisCode": (
            facets.metadata_restorationWork_supervisor_sisCode
        ),
        "metadata_restorationWork_workType": facets.metadata_restorationWork_workType,
        "metadata_submissionStatus": facets.metadata_submissionStatus,
        "updated": facets.updated,
        **getattr(InvenioSearchOptions, "facets", {}),
    }
    sort_options = {
        **InvenioSearchOptions.sort_options,
    }
