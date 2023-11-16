from oarepo_ui.resources.file_resource import S3RedirectFileResource


class RestorationFileResource(S3RedirectFileResource):
    """RestorationFile resource."""

    # here you can for example redefine
    # create_url_rules function to add your own rules


class RestorationFileDraftResource(S3RedirectFileResource):
    """RestorationFileDraft resource."""

    # here you can for example redefine
    # create_url_rules function to add your own rules
