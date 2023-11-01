from invenio_records_permissions import RecordPermissionPolicy

# from invenio_records_permissions.generators import SystemProcess, AnyUser


class RestorationFileDraftPermissionPolicy(RecordPermissionPolicy):
    """restoration.files.api.RestorationFileDraft permissions.
    Values in this class will be merged with permission presets.
    """

    can_search = []
    can_read = []
    can_create = []
    can_update = []
    can_delete = []
    can_manage = []
    can_read_files = []
    can_update_files = []
