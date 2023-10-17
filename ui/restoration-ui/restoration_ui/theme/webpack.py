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
                "restoration_ui_deposit_form": "./js/restoration_ui/forms/deposit/index.js",
                "restoration_ui_img_gallery":"./js/restoration_ui/gallery/index.js",
                "restoration_ui_deposit_edit": "./js/restoration_ui/editform/index.js",
                "restoration_ui_deposit_create": "./js/restoration_ui/createform/index.js",
            },
            dependencies={
                "react-searchkit": "^2.0.0",
                 "react-slick": "^0.29.0",
            },
            devDependencies={},
            aliases={
                "@translations/restoration_ui": "translations/restoration_ui",
            },
        )
    },
)
