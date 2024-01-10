import importlib_metadata
from flask_resources import ResponseHandler
from invenio_records_resources.resources import FileResourceConfig

from objects.resources.files.ui import (
    ObjectsFileDraftUIJSONSerializer,
    ObjectsFileUIJSONSerializer,
)


class ObjectsFileResourceConfig(FileResourceConfig):
    """ObjectsFile resource config."""

    blueprint_name = "objects_file"
    url_prefix = "/objects/<pid_value>"

    @property
    def response_handlers(self):
        entrypoint_response_handlers = {}
        for x in importlib_metadata.entry_points(
            group="invenio.objects.response_handlers"
        ):
            entrypoint_response_handlers.update(x.load())
        return {
            "application/vnd.inveniordm.v1+json": ResponseHandler(
                ObjectsFileUIJSONSerializer()
            ),
            **super().response_handlers,
            **entrypoint_response_handlers,
        }


class ObjectsFileDraftResourceConfig(FileResourceConfig):
    """ObjectsFileDraft resource config."""

    blueprint_name = "objects_file_draft"
    url_prefix = "/objects/<pid_value>/draft"

    @property
    def response_handlers(self):
        entrypoint_response_handlers = {}
        for x in importlib_metadata.entry_points(
            group="invenio.objects.response_handlers"
        ):
            entrypoint_response_handlers.update(x.load())
        return {
            "application/vnd.inveniordm.v1+json": ResponseHandler(
                ObjectsFileDraftUIJSONSerializer()
            ),
            **super().response_handlers,
            **entrypoint_response_handlers,
        }
