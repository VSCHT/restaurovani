from oarepo_runtime.records.dumpers import SearchDumper
from oarepo_runtime.records.systemfields.mapping import SystemFieldDumperExt

from objects.records.dumpers.edtf import (
    ObjectsDraftEDTFIntervalDumperExt,
    ObjectsEDTFIntervalDumperExt,
)


class ObjectsDumper(SearchDumper):
    """ObjectsRecord opensearch dumper."""

    extensions = [SystemFieldDumperExt(), ObjectsEDTFIntervalDumperExt()]


class ObjectsDraftDumper(SearchDumper):
    """ObjectsDraft opensearch dumper."""

    extensions = [SystemFieldDumperExt(), ObjectsDraftEDTFIntervalDumperExt()]
