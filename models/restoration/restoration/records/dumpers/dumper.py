from oarepo_runtime.records.dumpers import SearchDumper
from oarepo_runtime.records.systemfields import SystemFieldDumperExt

from restoration.records.dumpers.edtf import (
    RestorationDraftEDTFIntervalDumperExt,
    RestorationEDTFIntervalDumperExt,
)


class RestorationDumper(SearchDumper):
    """RestorationRecord opensearch dumper."""

    extensions = [RestorationEDTFIntervalDumperExt(), SystemFieldDumperExt()]


class RestorationDraftDumper(SearchDumper):
    """RestorationDraft opensearch dumper."""

    extensions = [RestorationDraftEDTFIntervalDumperExt(), SystemFieldDumperExt()]
