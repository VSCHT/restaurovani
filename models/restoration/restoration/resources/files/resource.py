from invenio_records_resources.resources.files.resource import FileResource
from uct_extras.theses.file_resource import S3RedirectFileResource


class RestorationFileResource(S3RedirectFileResource):
    """RestorationFile resource."""

    # here you can for example redefine
    # create_url_rules function to add your own rules


class RestorationFileDraftResource(FileResource):
    """RestorationFileDraft resource."""

    # here you can for example redefine
    # create_url_rules function to add your own rules
