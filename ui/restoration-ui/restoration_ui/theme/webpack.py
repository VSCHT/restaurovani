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
                "restoration_ui_img_gallery":"./js/restoration_ui/gallery/index.js",
                "restoration_ui_deposit_edit": "./js/restoration_ui/editform/index.js",
                "restoration_ui_deposit_create": "./js/restoration_ui/createform/form/index.js",
               
            },
            dependencies={
                "react-searchkit": "^2.0.0",
                 "react-slick": "^0.29.0",
                 "slick-carousel": "^1.8.1",
                 "react-media":"^1.10.0",
                 "jquery": "^3.7.1",
                 "@oarepo/file-manager": "^1.0.3",
                 "preact": "^10.5.13"
            },
            devDependencies={},
            aliases={
                "@translations/restoration_ui": "translations/restoration_ui",
            },
        )
    },
)
