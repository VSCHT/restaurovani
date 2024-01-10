from invenio_drafts_resources.records.api import Draft as InvenioDraft
from invenio_drafts_resources.records.api import DraftRecordIdProviderV2, ParentRecord
from invenio_drafts_resources.records.api import Record as InvenioRecord
from invenio_records.systemfields import ConstantField, ModelField
from invenio_records_resources.records.systemfields import FilesField, IndexField
from invenio_records_resources.records.systemfields.pid import PIDField, PIDFieldContext
from invenio_requests.records import Request
from invenio_requests.records.systemfields.relatedrecord import RelatedRecord
from invenio_vocabularies.records.api import Vocabulary
from oarepo_runtime.records.relations import (
    InternalRelation,
    PIDRelation,
    RelationsField,
)
from oarepo_runtime.records.systemfields.has_draftcheck import HasDraftCheckField
from oarepo_runtime.records.systemfields.record_status import RecordStatusSystemField

from objects.files.api import ObjectsFile, ObjectsFileDraft
from objects.records.dumpers.dumper import ObjectsDraftDumper, ObjectsDumper
from objects.records.models import (
    ObjectsDraftMetadata,
    ObjectsMetadata,
    ObjectsParentMetadata,
    ObjectsParentState,
)


class ObjectsParentRecord(ParentRecord):
    model_cls = ObjectsParentMetadata
    delete_record = RelatedRecord(
        Request,
        keys=["type", "receiver", "status"],
    )
    publish_draft = RelatedRecord(
        Request,
        keys=["type", "receiver", "status"],
    )


class ObjectsIdProvider(DraftRecordIdProviderV2):
    pid_type = "rstr"


class ObjectsRecord(InvenioRecord):

    model_cls = ObjectsMetadata

    schema = ConstantField("$schema", "local://objects-1.0.0.json")

    index = IndexField("objects-objects-1.0.0")

    pid = PIDField(provider=ObjectsIdProvider, context_cls=PIDFieldContext, create=True)

    dumper = ObjectsDumper()

    relations = RelationsField(
        dimension=PIDRelation(
            "metadata.restorationObject.dimensions.dimension",
            keys=["id", "title"],
            pid_field=Vocabulary.pid.with_type_ctx("Dimensions"),
        ),
        itemTypes=PIDRelation(
            "metadata.restorationObject.itemTypes",
            keys=["id", "title"],
            pid_field=Vocabulary.pid.with_type_ctx("ItemTypes"),
        ),
        colors=PIDRelation(
            "metadata.restorationObject.parts.colors",
            keys=["id", "title"],
            pid_field=Vocabulary.pid.with_type_ctx("Colors"),
        ),
        fabricationTechnologies=PIDRelation(
            "metadata.restorationObject.parts.fabricationTechnologies",
            keys=["id", "title"],
            pid_field=Vocabulary.pid.with_type_ctx("FabricationTechnologies"),
        ),
        materialType=PIDRelation(
            "metadata.restorationObject.parts.materialType",
            keys=["id", "title"],
            pid_field=Vocabulary.pid.with_type_ctx("MaterialTypes"),
        ),
        secondaryMaterialTypes=PIDRelation(
            "metadata.restorationObject.parts.secondaryMaterialTypes",
            keys=["id", "title"],
            pid_field=Vocabulary.pid.with_type_ctx("MaterialTypes"),
        ),
        restorationRequestor=PIDRelation(
            "metadata.restorationObject.restorationRequestor",
            keys=["id", "title"],
            pid_field=Vocabulary.pid.with_type_ctx("Requestors"),
        ),
        examinationMethods=PIDRelation(
            "metadata.restorationWork.examinationMethods",
            keys=["id", "title"],
            pid_field=Vocabulary.pid.with_type_ctx("ExaminationMethods"),
        ),
        part=InternalRelation(
            "metadata.restorationWork.parts.part",
            keys=["id"],
            related_part="metadata.restorationObject.parts",
        ),
        restorationMethods=PIDRelation(
            "metadata.restorationWork.parts.restorationMethods",
            keys=["id", "title"],
            pid_field=Vocabulary.pid.with_type_ctx("RestorationMethods"),
        ),
        restorationWork_restorationMethods=PIDRelation(
            "metadata.restorationWork.restorationMethods",
            keys=["id", "title"],
            pid_field=Vocabulary.pid.with_type_ctx("RestorationMethods"),
        ),
        workType=PIDRelation(
            "metadata.restorationWork.workType",
            keys=["id", "title"],
            pid_field=Vocabulary.pid.with_type_ctx("WorkTypes"),
        ),
    )

    versions_model_cls = ObjectsParentState

    parent_record_cls = ObjectsParentRecord
    record_status = RecordStatusSystemField()

    files = FilesField(file_cls=ObjectsFile, store=False, create=False, delete=False)

    bucket_id = ModelField(dump=False)
    bucket = ModelField(dump=False)


class ObjectsDraft(InvenioDraft):

    model_cls = ObjectsDraftMetadata

    schema = ConstantField("$schema", "local://objects-1.0.0.json")

    index = IndexField("objects-objects_draft-1.0.0")

    pid = PIDField(
        provider=ObjectsIdProvider,
        context_cls=PIDFieldContext,
        create=True,
        delete=False,
    )

    dumper = ObjectsDraftDumper()

    relations = RelationsField(
        dimension=PIDRelation(
            "metadata.restorationObject.dimensions.dimension",
            keys=["id", "title"],
            pid_field=Vocabulary.pid.with_type_ctx("Dimensions"),
        ),
        itemTypes=PIDRelation(
            "metadata.restorationObject.itemTypes",
            keys=["id", "title"],
            pid_field=Vocabulary.pid.with_type_ctx("ItemTypes"),
        ),
        colors=PIDRelation(
            "metadata.restorationObject.parts.colors",
            keys=["id", "title"],
            pid_field=Vocabulary.pid.with_type_ctx("Colors"),
        ),
        fabricationTechnologies=PIDRelation(
            "metadata.restorationObject.parts.fabricationTechnologies",
            keys=["id", "title"],
            pid_field=Vocabulary.pid.with_type_ctx("FabricationTechnologies"),
        ),
        materialType=PIDRelation(
            "metadata.restorationObject.parts.materialType",
            keys=["id", "title"],
            pid_field=Vocabulary.pid.with_type_ctx("MaterialTypes"),
        ),
        secondaryMaterialTypes=PIDRelation(
            "metadata.restorationObject.parts.secondaryMaterialTypes",
            keys=["id", "title"],
            pid_field=Vocabulary.pid.with_type_ctx("MaterialTypes"),
        ),
        restorationRequestor=PIDRelation(
            "metadata.restorationObject.restorationRequestor",
            keys=["id", "title"],
            pid_field=Vocabulary.pid.with_type_ctx("Requestors"),
        ),
        examinationMethods=PIDRelation(
            "metadata.restorationWork.examinationMethods",
            keys=["id", "title"],
            pid_field=Vocabulary.pid.with_type_ctx("ExaminationMethods"),
        ),
        part=InternalRelation(
            "metadata.restorationWork.parts.part",
            keys=["id"],
            related_part="metadata.restorationObject.parts",
        ),
        restorationMethods=PIDRelation(
            "metadata.restorationWork.parts.restorationMethods",
            keys=["id", "title"],
            pid_field=Vocabulary.pid.with_type_ctx("RestorationMethods"),
        ),
        restorationWork_restorationMethods=PIDRelation(
            "metadata.restorationWork.restorationMethods",
            keys=["id", "title"],
            pid_field=Vocabulary.pid.with_type_ctx("RestorationMethods"),
        ),
        workType=PIDRelation(
            "metadata.restorationWork.workType",
            keys=["id", "title"],
            pid_field=Vocabulary.pid.with_type_ctx("WorkTypes"),
        ),
    )

    versions_model_cls = ObjectsParentState

    parent_record_cls = ObjectsParentRecord
    record_status = RecordStatusSystemField()

    has_draft = HasDraftCheckField(config_key="HAS_DRAFT_CUSTOM_FIELD")

    files = FilesField(file_cls=ObjectsFileDraft, store=False)

    bucket_id = ModelField(dump=False)
    bucket = ModelField(dump=False)


ObjectsRecord.has_draft = HasDraftCheckField(
    draft_cls=ObjectsDraft, config_key="HAS_DRAFT_CUSTOM_FIELD"
)

ObjectsFile.record_cls = ObjectsRecord

ObjectsFileDraft.record_cls = ObjectsDraft
