from invenio_records_resources.resources.files.resource import FileResource
from oarepo_ui.resources.components import FilesComponent


class RestorationFileResource(FilesComponent):
    """RestorationFile resource."""

    # here you can for example redefine
    # create_url_rules function to add your own rules


class RestorationFileDraftResource(FileResource):
    """RestorationFileDraft resource."""

    # here you can for example redefine
    # create_url_rules function to add your own rules
