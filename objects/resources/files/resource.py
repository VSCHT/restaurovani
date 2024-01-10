from oarepo_ui.resources.file_resource import S3RedirectFileResource


class ObjectsFileResource(S3RedirectFileResource):
    """ObjectsFile resource."""

    # here you can for example redefine
    # create_url_rules function to add your own rules


class ObjectsFileDraftResource(S3RedirectFileResource):
    """ObjectsFileDraft resource."""

    # here you can for example redefine
    # create_url_rules function to add your own rules
