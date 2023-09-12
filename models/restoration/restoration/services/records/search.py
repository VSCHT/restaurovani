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
        "metadata_restorationObject_category": (
            facets.metadata_restorationObject_category
        ),
        "metadata_restorationObject_creationPeriod_since": (
            facets.metadata_restorationObject_creationPeriod_since
        ),
        "metadata_restorationObject_creationPeriod_until": (
            facets.metadata_restorationObject_creationPeriod_until
        ),
        "metadata_restorationObject_description_cs": (
            facets.metadata_restorationObject_description_cs
        ),
        "metadata_restorationObject_description_en": (
            facets.metadata_restorationObject_description_en
        ),
        "metadata_restorationObject_description_lang": (
            facets.metadata_restorationObject_description_lang
        ),
        "metadata_restorationObject_description_value": (
            facets.metadata_restorationObject_description_value
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
        "metadata_restorationObject_itemTypes": (
            facets.metadata_restorationObject_itemTypes
        ),
        "metadata_restorationObject_keywords": (
            facets.metadata_restorationObject_keywords
        ),
        "metadata_restorationObject_parts_colors": (
            facets.metadata_restorationObject_parts_colors
        ),
        "metadata_restorationObject_parts_fabricationTechnologies": (
            facets.metadata_restorationObject_parts_fabricationTechnologies
        ),
        "metadata_restorationObject_parts_id": (
            facets.metadata_restorationObject_parts_id
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
        "metadata_restorationObject_title_cs": (
            facets.metadata_restorationObject_title_cs
        ),
        "metadata_restorationObject_title_en": (
            facets.metadata_restorationObject_title_en
        ),
        "metadata_restorationObject_title_lang": (
            facets.metadata_restorationObject_title_lang
        ),
        "metadata_restorationObject_title_value": (
            facets.metadata_restorationObject_title_value
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
        "metadata_restorationWork_parts_part__version": (
            facets.metadata_restorationWork_parts_part__version
        ),
        "metadata_restorationWork_parts_restorationMethods": (
            facets.metadata_restorationWork_parts_restorationMethods
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
        "metadata_restorationWork_restorer": facets.metadata_restorationWork_restorer,
        "metadata_restorationWork_sisId": facets.metadata_restorationWork_sisId,
        "metadata_restorationWork_supervisors_comment": (
            facets.metadata_restorationWork_supervisors_comment
        ),
        "metadata_restorationWork_supervisors_fullName": (
            facets.metadata_restorationWork_supervisors_fullName
        ),
        "metadata_restorationWork_supervisors_institution": (
            facets.metadata_restorationWork_supervisors_institution
        ),
        "metadata_restorationWork_supervisors_sisCode": (
            facets.metadata_restorationWork_supervisors_sisCode
        ),
        "metadata_restorationWork_workType": facets.metadata_restorationWork_workType,
        "metadata_submissionStatus": facets.metadata_submissionStatus,
        "updated": facets.updated,
        **getattr(InvenioSearchOptions, "facets", {}),
    }
    sort_options = {
        **InvenioSearchOptions.sort_options,
    }
