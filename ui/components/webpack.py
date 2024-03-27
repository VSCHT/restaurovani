from invenio_assets.webpack import WebpackThemeBundle

theme = WebpackThemeBundle(
    __name__,
    ".",
    default="semantic-ui",
    themes={
        "semantic-ui": {
            "entry": {
                "components": "./js/index.js",
                
            },
            "dependencies": {
            },
            "devDependencies": {},
            "aliases": {
            },
        }
    },
)
