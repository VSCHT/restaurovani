from oarepo_ui.resources.components import BabelComponent, FilesComponent, AllowedHtmlTagsComponent
from oarepo_ui.resources.config import RecordsUIResourceConfig
from oarepo_ui.resources.resource import RecordsUIResource

from flask import g

from oarepo_vocabularies.ui.resources.components import DepositVocabularyOptionsComponent


class RestorationVocabularyOptionsComponent(DepositVocabularyOptionsComponent):
    always_included_vocabularies = ["languages"]


class ObjectsResourceConfig(RecordsUIResourceConfig):
    template_folder = "templates"
    url_prefix = "/objects/"
    blueprint_name = "objects"
    ui_serializer_class = "objects.resources.records.ui.ObjectsUIJSONSerializer"
    api_service = "objects"

    components = [
        BabelComponent, 
        RestorationVocabularyOptionsComponent, 
        FilesComponent, 
        AllowedHtmlTagsComponent
    ]

    application_id="objects"

    templates = {
        "detail": "objects.Detail",
        "search": "objects.Search",
        "edit": "objects.EditObjectForm",
        "create":"objects.CreateObjectForm",
    }

    # HACK: overriden to change endpoint to show draft records, should be removed when we have a dashboard
    def search_app_config(self, identity, api_config, overrides={}, **kwargs):
        return super().search_app_config(
            identity,
            api_config,
            overrides=overrides,
            endpoint="/api/user/objects/",
            **kwargs
        )

    # HACK: should be inside oarepo-ui
    def search_active_facets(self, api_config, identity):
        return [
            k
            for k in self.search_available_facets(api_config, identity).keys()
            if not k.startswith("metadata_abstract")
        ]


class ObjectsResource(RecordsUIResource):
    def _get_record(self, resource_requestctx, allow_draft=True):
        read_method = (
            getattr(self.api_service, "read_draft") or self.api_service.read
        )
        return read_method(g.identity, resource_requestctx.view_args["pid_value"])

def create_blueprint(app):
    """Register blueprint for this resource."""
    return ObjectsResource(ObjectsResourceConfig()).as_blueprint()
