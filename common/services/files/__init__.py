from invenio_records_resources.services import FileServiceConfig
from oarepo_runtime.services.config.service import PermissionsPresetsConfigMixin

from common.services.files.components import ExtractPDFTextProcessor


class RestorationFileServiceConfig(PermissionsPresetsConfigMixin, FileServiceConfig):
    file_processors = [
        ExtractPDFTextProcessor
    ]
