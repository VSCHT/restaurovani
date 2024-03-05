from invenio_assets.webpack import WebpackThemeBundle

theme = WebpackThemeBundle(
    __name__,
    ".",
    default="semantic-ui",
    themes={
        "semantic-ui": dict(
            entry={
                "objects_search": "./js/objects/search/index.js",
                "objects_img_gallery": "./js/objects/gallery/index.js",
                "objects_deposit_edit": "./js/objects/editform/index.js",
                "objects_deposit_create": "./js/objects/createform/form/index.js",
                "carousel-styles": './js/objects/gallery/carousel-styles.js'
            },
            dependencies={
                "react-slick": "0.30.0",
                "slick-carousel": "1.8.1",
                "react-media": "^1.10.0",
                "jquery": "^3.7.1",
                "@oarepo/file-manager": "^1.0.8",
                "preact": "^10.5.13",
            },
            devDependencies={},
            aliases={},
        )
    },
)
