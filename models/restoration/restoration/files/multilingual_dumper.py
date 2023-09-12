from oarepo_runtime.i18n.dumper import MultilingualDumper


class MultilingualSearchDumper(MultilingualDumper):
    """Multilingual search dumper."""

    paths = [
        "/metadata/restorationObject/description",
        "/metadata/restorationObject/parts/name",
        "/metadata/restorationObject/title",
        "/metadata/restorationWork/abstract",
    ]
    SUPPORTED_LANGS = ["cs", "en"]

    def dump(self, record, data):
        super().dump(record, data)

    def load(self, record, data):
        super().load(record, data)
