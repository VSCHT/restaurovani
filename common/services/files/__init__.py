from invenio_records_resources.services import FileServiceConfig
from oarepo_runtime.services.config.service import PermissionsPresetsConfigMixin

from .processors import ExtractPDFTextProcessor, NoErrorImageProcessor


class RestorationFileServiceConfig(PermissionsPresetsConfigMixin, FileServiceConfig):
    file_processors = [
        ExtractPDFTextProcessor(),
        NoErrorImageProcessor()
    ]
