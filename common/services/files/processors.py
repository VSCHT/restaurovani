import datetime
import re

import fitz
from invenio_records_resources.services.files.processors import FileProcessor, ImageMetadataExtractor
from invenio_records_resources.services.uow import UnitOfWork, RecordCommitOp
from oarepo_runtime.datastreams.utils import get_record_service_for_record

import logging

pdf_log = logging.getLogger("extract-pdf-text-processor")
img_log = logging.getLogger("extract-imgsize-processor")


class ExtractPDFTextProcessor(FileProcessor):

    def can_process(self, file_record):
        return self.file_extension(file_record) == '.pdf'

    def process(self, file_record):
        """Process a file."""
        try:
            pdf_log.info(f"Extracting text from PDF file {file_record.key}")
            with file_record.open_stream("rb") as fp:
                data = fp.read()
                doc = fitz.open(stream=data, filetype="pdf")
                text = []
                for page in doc:
                    text.append(page.get_text())
                text = "\n".join(text)
                text = re.sub(r'\s+\n[\s\n]*', '\n', text)
                lines = text.split('\n')
                filtered_lines = []
                # remove page numbers and short lines
                for line in lines:
                    line = line.strip()
                    if len(line)<5:
                        continue
                    if re.match(r'^[\d,.-]+$', line):
                        continue
                    filtered_lines.append(line)
                text = "\n".join(filtered_lines)
                record = file_record.record

                restoration_data = record['metadata'].setdefault('restorationData', [])
                for rd in restoration_data:
                    if rd['key'] == file_record.key:
                        found_rd = rd
                        break
                else:
                    found_rd = {'key': file_record.key}
                    restoration_data.append(found_rd)
                found_rd['text'] = text
                found_rd['timestamp'] = to_iso8601utc(datetime.datetime.utcnow())
                with UnitOfWork() as uow:
                    record_service = get_record_service_for_record(record)
                    if record_service:
                        indexer = record_service.indexer
                        uow.register(RecordCommitOp(record, indexer, index_refresh=True))
                        uow.commit()
        except Exception as e:
            record_id = file_record.record.get('id') or file_record.record.id
            pdf_log.exception(f"Error extracting text from pdf file {file_record.key} on record {record_id}: {e}")


def to_iso8601utc(dt: datetime.datetime) -> str:
    return dt.strftime("%Y-%m-%dT%H:%M:%S") + "Z"


class NoErrorImageProcessor(ImageMetadataExtractor):
    def process(self, file_record):
        try:
            super().process(file_record)
        except Exception as e:
            record_id = file_record.record.get('id') or file_record.record.id
            img_log.exception(f"Error processing image {file_record.key} on record {record_id}: {e}")
