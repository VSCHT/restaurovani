from typing import List, Any

from oarepo_runtime.records.systemfields import Selector


class CreationPeriodSelector(Selector):
    def select(self, record) -> List[Any]:
        md = record.get("metadata", {})
        restorationObject = md.get("restorationObject", {})
        creationPeriod = restorationObject.get("creationPeriod", {})
        if creationPeriod:
            start = creationPeriod.get("since", '')
            end = creationPeriod.get("until", '')
            if start or end:
                return [start or end]
            # return [f"{start}/{end}"]  # todo: edtf interval does not seem to work
        return []

