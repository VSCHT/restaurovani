from oarepo_runtime.records.entity_resolvers import UserResolver

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
]


OBJECTS_FILES_RESOURCE_CONFIG = ObjectsFileResourceConfig


OBJECTS_FILES_RESOURCE_CLASS = ObjectsFileResource


OBJECTS_FILES_SERVICE_CONFIG = ObjectsFileServiceConfig


OBJECTS_FILES_SERVICE_CLASS = ObjectsFileService


OBJECTS_DRAFT_FILES_RESOURCE_CONFIG = ObjectsFileDraftResourceConfig


OBJECTS_DRAFT_FILES_RESOURCE_CLASS = ObjectsFileDraftResource


OBJECTS_DRAFT_FILES_SERVICE_CONFIG = ObjectsFileDraftServiceConfig


OBJECTS_DRAFT_FILES_SERVICE_CLASS = ObjectsFileDraftService
