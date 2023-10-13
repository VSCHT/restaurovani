from invenio_assets.webpack import WebpackThemeBundle

theme = WebpackThemeBundle(
    __name__,
    "assets",
    default="semantic-ui",
    themes={
        "semantic-ui": dict(
            entry={
                "restoration_ui_components": "./js/restoration_ui/custom-components.js",
                "restoration_ui_search": "./js/restoration_ui/search/index.js",
                "restoration_ui_deposit_form": "./js/restoration_ui/forms/   deposit/index.js",
            },
            dependencies={
                "react-searchkit": "^2.0.0",
            },
            devDependencies={},
            aliases={
                "@translations/restoration_ui": "translations/restoration_ui",
            },
        )
    },
)
