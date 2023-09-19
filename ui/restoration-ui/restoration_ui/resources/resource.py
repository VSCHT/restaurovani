from oarepo_ui.resources.resource import RecordsUIResource
from flask import g

class RestorationUiResource(RecordsUIResource):
    def _get_record(self, resource_requestctx, allow_draft=True):
        read_method = (
            getattr(self.api_service, "read_draft") or self.api_service.read
        )
        return read_method(g.identity, resource_requestctx.view_args["pid_value"])
