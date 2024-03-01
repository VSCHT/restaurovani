from invenio_records_resources.services.files.processors import FileProcessor


class ExtractPDFTextProcessor(FileProcessor):

    def can_process(self, file_record):
        return self.file_extension(file_record) == 'pdf'

    def process(self, file_record):
        """Process a file."""
        pass
