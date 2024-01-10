import importlib_metadata
from flask_resources import ResponseHandler
from invenio_drafts_resources.resources import RecordResourceConfig

from objects.resources.records.ui import ObjectsUIJSONSerializer


class ObjectsResourceConfig(RecordResourceConfig):
    """ObjectsRecord resource config."""

    blueprint_name = "objects"
    url_prefix = "/objects/"

    @property
    def response_handlers(self):
        entrypoint_response_handlers = {}
        for x in importlib_metadata.entry_points(
            group="invenio.objects.response_handlers"
        ):
            entrypoint_response_handlers.update(x.load())
        return {
            "application/vnd.inveniordm.v1+json": ResponseHandler(
                ObjectsUIJSONSerializer()
            ),
            **super().response_handlers,
            **entrypoint_response_handlers,
        }
