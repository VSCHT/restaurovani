from invenio_drafts_resources.records.api import Draft as InvenioDraft
from invenio_drafts_resources.records.api import DraftRecordIdProviderV2, ParentRecord
from invenio_drafts_resources.records.api import Record as InvenioRecord
from invenio_records.systemfields import ConstantField, ModelField
from invenio_records_resources.records.systemfields import FilesField, IndexField
from invenio_records_resources.records.systemfields.pid import PIDField, PIDFieldContext
from oarepo_runtime.records.relations import PIDRelation, RelationsField
from oarepo_runtime.records.systemfields.has_draftcheck import HasDraftCheckField
from oarepo_runtime.records.systemfields.owner import OwnersField
from oarepo_runtime.records.systemfields.record_status import RecordStatusSystemField
from oarepo_vocabularies.records.api import Vocabulary

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

    owners = OwnersField()


class ObjectsIdProvider(DraftRecordIdProviderV2):
    pid_type = "rstr"


class ObjectsRecord(InvenioRecord):

    model_cls = ObjectsMetadata

    schema = ConstantField("$schema", "local://objects-1.0.0.json")

    index = IndexField(
        "objects-objects-1.0.0",
    )

    pid = PIDField(provider=ObjectsIdProvider, context_cls=PIDFieldContext, create=True)

    dumper = ObjectsDumper()

    relations = RelationsField(
        colors=PIDRelation(
            "metadata.restorationObject.colors",
            keys=["id", "title"],
            pid_field=Vocabulary.pid.with_type_ctx("Colors"),
        ),
        dimension=PIDRelation(
            "metadata.restorationObject.dimensions.dimension",
            keys=["id", "title"],
            pid_field=Vocabulary.pid.with_type_ctx("Dimensions"),
        ),
        fabricationTechnologies=PIDRelation(
            "metadata.restorationObject.fabricationTechnologies",
            keys=["id", "title"],
            pid_field=Vocabulary.pid.with_type_ctx("FabricationTechnologies"),
        ),
        itemTypes=PIDRelation(
            "metadata.restorationObject.itemTypes",
            keys=["id", "title"],
            pid_field=Vocabulary.pid.with_type_ctx("ItemTypes"),
        ),
        materialType=PIDRelation(
            "metadata.restorationObject.materialType",
            keys=["id", "title"],
            pid_field=Vocabulary.pid.with_type_ctx("MaterialTypes"),
        ),
        restorationRequestor=PIDRelation(
            "metadata.restorationObject.restorationRequestor",
            keys=["id", "title"],
            pid_field=Vocabulary.pid.with_type_ctx("Requestors"),
        ),
        secondaryMaterialTypes=PIDRelation(
            "metadata.restorationObject.secondaryMaterialTypes",
            keys=["id", "title"],
            pid_field=Vocabulary.pid.with_type_ctx("MaterialTypes"),
        ),
        examinationMethods=PIDRelation(
            "metadata.restorationWork.examinationMethods",
            keys=["id", "title"],
            pid_field=Vocabulary.pid.with_type_ctx("ExaminationMethods"),
        ),
        restorationMethods=PIDRelation(
            "metadata.restorationWork.restorationMethods",
            keys=["id", "title"],
            pid_field=Vocabulary.pid.with_type_ctx("RestorationMethods"),
        ),
        supervisors=PIDRelation(
            "metadata.restorationWork.supervisors",
            keys=["id", "name", "affiliations"],
            pid_field=Vocabulary.pid.with_type_ctx("names"),
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
    has_draft = HasDraftCheckField(
        draft_cls=lambda: ObjectsDraft, config_key="HAS_DRAFT_CUSTOM_FIELD"
    )

    files = FilesField(file_cls=ObjectsFile, store=False, create=False, delete=False)

    bucket_id = ModelField(dump=False)
    bucket = ModelField(dump=False)


class ObjectsDraft(InvenioDraft):

    model_cls = ObjectsDraftMetadata

    schema = ConstantField("$schema", "local://objects-1.0.0.json")

    index = IndexField("objects-objects_draft-1.0.0", search_alias="objects")

    pid = PIDField(
        provider=ObjectsIdProvider,
        context_cls=PIDFieldContext,
        create=True,
        delete=False,
    )

    dumper = ObjectsDraftDumper()

    relations = RelationsField(
        colors=PIDRelation(
            "metadata.restorationObject.colors",
            keys=["id", "title"],
            pid_field=Vocabulary.pid.with_type_ctx("Colors"),
        ),
        dimension=PIDRelation(
            "metadata.restorationObject.dimensions.dimension",
            keys=["id", "title"],
            pid_field=Vocabulary.pid.with_type_ctx("Dimensions"),
        ),
        fabricationTechnologies=PIDRelation(
            "metadata.restorationObject.fabricationTechnologies",
            keys=["id", "title"],
            pid_field=Vocabulary.pid.with_type_ctx("FabricationTechnologies"),
        ),
        itemTypes=PIDRelation(
            "metadata.restorationObject.itemTypes",
            keys=["id", "title"],
            pid_field=Vocabulary.pid.with_type_ctx("ItemTypes"),
        ),
        materialType=PIDRelation(
            "metadata.restorationObject.materialType",
            keys=["id", "title"],
            pid_field=Vocabulary.pid.with_type_ctx("MaterialTypes"),
        ),
        restorationRequestor=PIDRelation(
            "metadata.restorationObject.restorationRequestor",
            keys=["id", "title"],
            pid_field=Vocabulary.pid.with_type_ctx("Requestors"),
        ),
        secondaryMaterialTypes=PIDRelation(
            "metadata.restorationObject.secondaryMaterialTypes",
            keys=["id", "title"],
            pid_field=Vocabulary.pid.with_type_ctx("MaterialTypes"),
        ),
        examinationMethods=PIDRelation(
            "metadata.restorationWork.examinationMethods",
            keys=["id", "title"],
            pid_field=Vocabulary.pid.with_type_ctx("ExaminationMethods"),
        ),
        restorationMethods=PIDRelation(
            "metadata.restorationWork.restorationMethods",
            keys=["id", "title"],
            pid_field=Vocabulary.pid.with_type_ctx("RestorationMethods"),
        ),
        supervisors=PIDRelation(
            "metadata.restorationWork.supervisors",
            keys=["id", "name", "affiliations"],
            pid_field=Vocabulary.pid.with_type_ctx("names"),
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


ObjectsFile.record_cls = ObjectsRecord

ObjectsFileDraft.record_cls = ObjectsDraft
