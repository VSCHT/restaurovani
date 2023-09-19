from oarepo_ui.resources.config import RecordsUIResourceConfig
from oarepo_ui.resources import BabelComponent


class RestorationUiResourceConfig(RecordsUIResourceConfig):
    template_folder = "../templates"
    url_prefix = "/objekty/"
    blueprint_name = "restoration-ui"
    ui_serializer_class = "restoration.resources.records.ui.RestorationUIJSONSerializer"
    api_service = "restoration"
    layout = "restoration"

    components = [BabelComponent]
    try:
        from oarepo_vocabularies.ui.resources.components import DepositVocabularyOptionsComponent
        components.append(DepositVocabularyOptionsComponent)
    except ImportError:
        pass

    templates = {
        "detail": {
            "layout": "restoration_ui/Detail.html.jinja",
            "blocks": {
                "record_main_content": "Main",
                # "record_sidebar": "Sidebar"                
            },
        },
        "search": {"layout": "restoration_ui/search.html"},
        "edit": {"layout": "restoration_ui/deposit.html"},
        "create": {"layout": "restoration_ui/deposit.html"},
    }
    def search_app_config(self, identity, api_config, overrides={}, **kwargs):
        return super().search_app_config(identity, api_config,
                                     overrides=overrides, endpoint='/api/user/restoration/', **kwargs)
