from oarepo_requests.resolvers.ui import (
    draft_record_entity_reference_ui_resolver,
    record_entity_reference_ui_resolver,
    user_entity_reference_ui_resolver,
)
from oarepo_requests.resources.draft.resource import DraftRecordRequestsResource
from oarepo_requests.services.draft.service import DraftRecordRequestsService
from oarepo_runtime.records.entity_resolvers import UserResolver

from objects.files.api import ObjectsFileDraft
from objects.files.requests.resolvers import ObjectsFileDraftResolver
from objects.records.api import ObjectsDraft, ObjectsRecord
from objects.records.requests.delete_record.types import DeleteRecordRequestType
from objects.records.requests.publish_draft.types import PublishDraftRequestType
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


OBJECTS_REQUESTS_RESOURCE_CLASS = DraftRecordRequestsResource


OBJECTS_REQUESTS_SERVICE_CLASS = DraftRecordRequestsService


REQUESTS_REGISTERED_TYPES = [
    DeleteRecordRequestType(),
    PublishDraftRequestType(),
]


REQUESTS_ENTITY_RESOLVERS = [
    UserResolver(),
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
    "user": user_entity_reference_ui_resolver,
    "objects": record_entity_reference_ui_resolver,
    "objects_draft": draft_record_entity_reference_ui_resolver,
}


OBJECTS_FILES_RESOURCE_CONFIG = ObjectsFileResourceConfig


OBJECTS_FILES_RESOURCE_CLASS = ObjectsFileResource


OBJECTS_FILES_SERVICE_CONFIG = ObjectsFileServiceConfig


OBJECTS_FILES_SERVICE_CLASS = ObjectsFileService


OBJECTS_DRAFT_FILES_RESOURCE_CONFIG = ObjectsFileDraftResourceConfig


OBJECTS_DRAFT_FILES_RESOURCE_CLASS = ObjectsFileDraftResource


OBJECTS_DRAFT_FILES_SERVICE_CONFIG = ObjectsFileDraftServiceConfig


OBJECTS_DRAFT_FILES_SERVICE_CLASS = ObjectsFileDraftService
