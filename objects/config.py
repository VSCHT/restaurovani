from oarepo_requests.resolvers.ui import (
    RecordEntityDraftReferenceUIResolver,
    RecordEntityReferenceUIResolver,
)
from oarepo_requests.resources.draft.resource import DraftRecordRequestsResource
from oarepo_requests.resources.draft.types.resource import DraftRequestTypesResource
from oarepo_requests.services.draft.service import DraftRecordRequestsService
from oarepo_requests.services.draft.types.service import DraftRecordRequestTypesService

from objects.files.api import ObjectsFile, ObjectsFileDraft
from objects.files.requests.resolvers import ObjectsFileDraftResolver
from objects.records.api import ObjectsDraft, ObjectsRecord
from objects.records.requests.resolvers import ObjectsDraftResolver, ObjectsResolver
from objects.resources.files.config import (
    ObjectsFileDraftResourceConfig,
    ObjectsFileResourceConfig,
)
from objects.resources.files.resource import (
    ObjectsFileDraftResource,
    ObjectsFileResource,
)
from objects.resources.records.config import ObjectsResourceConfig
from objects.resources.records.resource import ObjectsResource
from objects.services.files.config import (
    ObjectsFileDraftServiceConfig,
    ObjectsFileServiceConfig,
)
from objects.services.files.service import ObjectsFileDraftService, ObjectsFileService
from objects.services.records.config import ObjectsServiceConfig
from objects.services.records.service import ObjectsService

OBJECTS_RECORD_RESOURCE_CONFIG = ObjectsResourceConfig


OBJECTS_RECORD_RESOURCE_CLASS = ObjectsResource


OBJECTS_RECORD_SERVICE_CONFIG = ObjectsServiceConfig


OBJECTS_RECORD_SERVICE_CLASS = ObjectsService


OAREPO_PRIMARY_RECORD_SERVICE = {
    ObjectsRecord: "objects",
    ObjectsDraft: "objects",
    ObjectsFile: "objects_file",
    ObjectsFileDraft: "objects_file_draft",
}


OBJECTS_REQUESTS_RESOURCE_CLASS = DraftRecordRequestsResource


OBJECTS_REQUESTS_SERVICE_CLASS = DraftRecordRequestsService


OBJECTS_ENTITY_RESOLVERS = [
    ObjectsResolver(record_cls=ObjectsRecord, service_id="objects", type_key="objects"),
    ObjectsDraftResolver(
        record_cls=ObjectsDraft, service_id="objects", type_key="objects_draft"
    ),
    ObjectsFileDraftResolver(
        record_cls=ObjectsFileDraft,
        service_id="objects_file_draft",
        type_key="objects_file_draft",
    ),
]


ENTITY_REFERENCE_UI_RESOLVERS = {
    "objects": RecordEntityReferenceUIResolver("objects"),
    "objects_draft": RecordEntityDraftReferenceUIResolver("objects_draft"),
}
REQUESTS_UI_SERIALIZATION_REFERENCED_FIELDS = []


OBJECTS_REQUEST_TYPES_RESOURCE_CLASS = DraftRequestTypesResource


OBJECTS_REQUEST_TYPES_SERVICE_CLASS = DraftRecordRequestTypesService


OBJECTS_FILES_RESOURCE_CONFIG = ObjectsFileResourceConfig


OBJECTS_FILES_RESOURCE_CLASS = ObjectsFileResource


OBJECTS_FILES_SERVICE_CONFIG = ObjectsFileServiceConfig


OBJECTS_FILES_SERVICE_CLASS = ObjectsFileService


OBJECTS_DRAFT_FILES_RESOURCE_CONFIG = ObjectsFileDraftResourceConfig


OBJECTS_DRAFT_FILES_RESOURCE_CLASS = ObjectsFileDraftResource


OBJECTS_DRAFT_FILES_SERVICE_CONFIG = ObjectsFileDraftServiceConfig


OBJECTS_DRAFT_FILES_SERVICE_CLASS = ObjectsFileDraftService
