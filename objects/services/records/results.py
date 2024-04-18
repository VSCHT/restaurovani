from oarepo_requests.services.results import RequestsComponent, RequestTypesComponent
from oarepo_runtime.services.results import RecordItem, RecordList

from common.services.results import RestorationYearRecordList


class ObjectsRecordItem(RecordItem):
    """ObjectsRecord record item."""

    components = [*RecordItem.components, RequestsComponent(), RequestTypesComponent()]


class ObjectsRecordList(RestorationYearRecordList):
    """ObjectsRecord record list."""

    components = [*RecordList.components]
