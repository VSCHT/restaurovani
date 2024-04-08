from oarepo_runtime.services.results import RecordList

class RestorationYearRecordList(RecordList):

    @property
    def aggregations(self):
        """Get the search result aggregations."""
        try:
            result =  self._results.labelled_facets.to_dict()
            for key in ['metadata_restorationObject_creationPeriod_since', 'metadata_restorationObject_creationPeriod_until']:
                if key in result:
                    if 'buckets' in result[key]:
                        for bucket in result[key]['buckets']:
                            bucket['key'] = str(bucket['key'])
            return result
        except AttributeError:
            return None