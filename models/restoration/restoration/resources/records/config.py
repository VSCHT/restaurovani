import importlib_metadata
from flask_resources import ResponseHandler
from invenio_drafts_resources.resources import RecordResourceConfig

from restoration.resources.records.ui import RestorationUIJSONSerializer


class RestorationResourceConfig(RecordResourceConfig):
    """RestorationRecord resource config."""

    blueprint_name = "restoration"
    url_prefix = "/restoration/"

    @property
    def response_handlers(self):
        entrypoint_response_handlers = {}
        for x in importlib_metadata.entry_points(
            group="invenio.restoration.response_handlers"
        ):
            entrypoint_response_handlers.update(x.load())
        return {
            "application/vnd.inveniordm.v1+json": ResponseHandler(
                RestorationUIJSONSerializer()
            ),
            **super().response_handlers,
            **entrypoint_response_handlers,
        }
