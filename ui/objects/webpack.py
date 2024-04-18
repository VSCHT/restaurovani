from invenio_assets.webpack import WebpackThemeBundle

theme = WebpackThemeBundle(
    __name__,
    ".",
    default="semantic-ui",
    themes={
        "semantic-ui": dict(
            entry={
                "objects_search": "./js/objects/search/index.js",
                "objects_img_gallery": "./js/objects/detail/index.js",
                "objects_deposit_edit": "./js/objects/editform/index.js",
                "objects_deposit_create": "./js/objects/createform/form/index.js"
            },
            dependencies={
                "react-slick": "0.30.0",
                "slick-carousel": "1.8.1",
                "@oarepo/file-manager": "^1.0.8",
                "preact": "^10.5.13",
                "react-datepicker": "^4.21.0",
                "html-entities": "2.5.2" 
            },
            devDependencies={},
            aliases={},
        )
    },
)
