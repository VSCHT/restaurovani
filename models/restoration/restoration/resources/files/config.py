import importlib_metadata
from flask_resources import ResponseHandler
from invenio_records_resources.resources import FileResourceConfig

from restoration.resources.files.ui import (
    RestorationFileDraftUIJSONSerializer,
    RestorationFileUIJSONSerializer,
)


class RestorationFileResourceConfig(FileResourceConfig):
    """RestorationFile resource config."""

    blueprint_name = "restoration_file"
    url_prefix = "/restoration/<pid_value>"

    @property
    def response_handlers(self):
        entrypoint_response_handlers = {}
        for x in importlib_metadata.entry_points(
            group="invenio.restoration.response_handlers"
        ):
            entrypoint_response_handlers.update(x.load())
        return {
            "application/vnd.inveniordm.v1+json": ResponseHandler(
                RestorationFileUIJSONSerializer()
            ),
            **super().response_handlers,
            **entrypoint_response_handlers,
        }


class RestorationFileDraftResourceConfig(FileResourceConfig):
    """RestorationFileDraft resource config."""

    blueprint_name = "restoration_file_draft"
    url_prefix = "/restoration/<pid_value>/draft"

    @property
    def response_handlers(self):
        entrypoint_response_handlers = {}
        for x in importlib_metadata.entry_points(
            group="invenio.restoration.response_handlers"
        ):
            entrypoint_response_handlers.update(x.load())
        return {
            "application/vnd.inveniordm.v1+json": ResponseHandler(
                RestorationFileDraftUIJSONSerializer()
            ),
            **super().response_handlers,
            **entrypoint_response_handlers,
        }
