from restoration_ui.resources.components import RestorationVocabularyOptionsComponent
from oarepo_ui.resources.config import RecordsUIResourceConfig
from oarepo_ui.resources.components import BabelComponent, FilesComponent


class RestorationUiResourceConfig(RecordsUIResourceConfig):
    template_folder = "../templates"
    url_prefix = "/objekty/"
    blueprint_name = "restoration-ui"
    ui_serializer_class = "restoration.resources.records.ui.RestorationUIJSONSerializer"
    api_service = "restoration"
    layout = "restoration"

    components = [BabelComponent, RestorationVocabularyOptionsComponent, FilesComponent]

    templates = {
        "detail": {
            "layout": "restoration_ui/Detail.html.jinja",
            "blocks": {"record_main_content": "Main", "record_sidebar": "Sidebar"},
        },
        "search": {
            "layout": "restoration_ui/Search.html.jinja",
            "app_id": "Restoration_ui.Search",
        },
        "edit": {"layout": "restoration_ui/EditObjectForm.html.jinja"},
        "create": {"layout": "restoration_ui/CreateObjectForm.html.jinja"},
    }

    def search_app_config(self, identity, api_config, overrides={}, **kwargs):
        return super().search_app_config(
            identity,
            api_config,
            overrides=overrides,
            endpoint="/api/user/restoration/",
            **kwargs
        )

    def search_active_facets(self, api_config, identity):
        return [
            k
            for k in self.search_available_facets(api_config, identity).keys()
            if not k.startswith("metadata_abstract")
        ]
