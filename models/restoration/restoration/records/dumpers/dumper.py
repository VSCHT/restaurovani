from oarepo_runtime.records.dumpers import SearchDumper
from oarepo_runtime.records.systemfields.mapping import SystemFieldDumperExt

from restoration.records.dumpers.edtf import (
    RestorationDraftEDTFIntervalDumperExt,
    RestorationEDTFIntervalDumperExt,
)


class RestorationDumper(SearchDumper):
    """RestorationRecord opensearch dumper."""

    extensions = [SystemFieldDumperExt(), RestorationEDTFIntervalDumperExt()]


class RestorationDraftDumper(SearchDumper):
    """RestorationDraft opensearch dumper."""

    extensions = [SystemFieldDumperExt(), RestorationDraftEDTFIntervalDumperExt()]
