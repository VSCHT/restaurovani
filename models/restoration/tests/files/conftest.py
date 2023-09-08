
import pytest
from invenio_records_resources.resources import FileResource

from restoration.resources.files.config import RestorationFileResourceConfig
from restoration.services.files.config import RestorationFileServiceConfig
from restoration.services.files.service import RestorationFileService


@pytest.fixture(scope="module")
def file_service():
    """File service shared fixture."""
    service = RestorationFileService(RestorationFileServiceConfig())
    return service


@pytest.fixture(scope="module")
def file_resource(file_service):
    """File Resources."""
    return FileResource(RestorationFileResourceConfig(), file_service)


@pytest.fixture(scope="module")
def headers():
    """Default headers for making requests."""
    return {
        "content-type": "application/json",
        "accept": "application/json",
    }


@pytest.fixture(scope="module")
def app_config(app_config):
    app_config["FILES_REST_STORAGE_CLASS_LIST"] = {
        "L": "Local",
        "F": "Fetch",
        "R": "Remote",
    }
    app_config["FILES_REST_DEFAULT_STORAGE_CLASS"] = "L"

    return app_config
