from oarepo_ui.resources.config import RecordsUIResourceConfig
from oarepo_ui.resources import BabelComponent


class RestorationUiResourceConfig(RecordsUIResourceConfig):
    template_folder = "../templates"
    url_prefix = "/prace/"
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
            "layout": "restoration_ui/detail.html",
            "blocks": {
                "record_main_content": "restoration_ui/main.html",
                "record_sidebar": "restoration_ui/sidebar.html"                
            },
        },
        "search": {"layout": "restoration_ui/search.html"},
        "edit": {"layout": "restoration_ui/deposit.html"},
        "create": {"layout": "restoration_ui/deposit.html"},
    }
