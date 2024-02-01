from invenio_assets.webpack import WebpackThemeBundle

theme = WebpackThemeBundle(
    __name__,
    ".",
    default="semantic-ui",
    themes={
        "semantic-ui": {
            "entry": {
                "branding": './js/branding.js'
            },
            "dependencies": {
                "react-searchkit": "^2.0.0",
                "jquery":"3.7.1",
                "react-slick": "0.30.0",
                "slick-carousel": "1.8.1",
            },
            "devDependencies": {},
            "aliases": {
                "../../theme.config$": "less/theme.config",
                "../../less/site": "less/site",
                "../../less": "less",
                "@less": "less",
            },
        }
    },
)
