from oarepo_runtime.records.dumpers import SearchDumper

from restoration.records.dumpers.edtf import (
    RestorationDraftEDTFIntervalDumperExt,
    RestorationEDTFIntervalDumperExt,
)


class RestorationDumper(SearchDumper):
    """RestorationRecord opensearch dumper."""

    extensions = [RestorationEDTFIntervalDumperExt()]


class RestorationDraftDumper(SearchDumper):
    """RestorationDraft opensearch dumper."""

    extensions = [RestorationDraftEDTFIntervalDumperExt()]
