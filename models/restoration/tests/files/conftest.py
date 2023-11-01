
import pytest
from invenio_records_resources.resources import FileResource

from restoration.resources.files.config import RestorationFileResourceConfig
from restoration.services.files.config import RestorationFileServiceConfig
from restoration.services.files.service import RestorationFileService


@pytest.fixture()
def input_data(input_data):
    input_data["files"] = {"enabled": True}
    return input_data


@pytest.fixture(scope="module")
def file_service():
    """File service shared fixture."""
    service = RestorationFileService(RestorationFileServiceConfig())
    return service


@pytest.fixture(scope="module")
def file_resource(file_service):
    """File Resources."""
    return FileResource(RestorationFileResourceConfig(), file_service)
