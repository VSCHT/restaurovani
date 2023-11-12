from invenio_drafts_resources.records.api import Draft as InvenioDraft
from invenio_drafts_resources.records.api import DraftRecordIdProviderV2, ParentRecord
from invenio_drafts_resources.records.api import Record as InvenioRecord
from invenio_records.systemfields import ConstantField, ModelField
from invenio_records_resources.records.systemfields import FilesField, IndexField
from invenio_records_resources.records.systemfields.pid import PIDField, PIDFieldContext
from invenio_vocabularies.records.api import Vocabulary
from oarepo_runtime.drafts.systemfields.has_draftcheck import HasDraftCheckField
from oarepo_runtime.relations import InternalRelation, PIDRelation, RelationsField

from restoration.files.api import RestorationFile, RestorationFileDraft
from restoration.records.dumpers.dumper import RestorationDraftDumper, RestorationDumper
from restoration.records.models import (
    RestorationDraftMetadata,
    RestorationMetadata,
    RestorationParentMetadata,
    RestorationParentState,
)


class RestorationParentRecord(ParentRecord):
    model_cls = RestorationParentMetadata


class RestorationIdProvider(DraftRecordIdProviderV2):
    pid_type = "rstr"


class RestorationRecord(InvenioRecord):
    model_cls = RestorationMetadata

    schema = ConstantField("$schema", "local://restoration-1.0.0.json")

    index = IndexField("restoration-restoration-1.0.0")

    pid = PIDField(
        provider=RestorationIdProvider, context_cls=PIDFieldContext, create=True
    )

    dumper = RestorationDumper()

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

    versions_model_cls = RestorationParentState

    parent_record_cls = RestorationParentRecord

    files = FilesField(
        file_cls=RestorationFile, store=False, create=False, delete=False
    )

    bucket_id = ModelField(dump=False)
    bucket = ModelField(dump=False)


class RestorationDraft(InvenioDraft):
    model_cls = RestorationDraftMetadata

    schema = ConstantField("$schema", "local://restoration-1.0.0.json")

    index = IndexField("restoration-restoration_draft-1.0.0")

    pid = PIDField(
        provider=RestorationIdProvider,
        context_cls=PIDFieldContext,
        create=True,
        delete=False,
    )

    dumper = RestorationDraftDumper()

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

    versions_model_cls = RestorationParentState

    parent_record_cls = RestorationParentRecord
    has_draft = HasDraftCheckField(config_key="HAS_DRAFT_CUSTOM_FIELD")

    files = FilesField(file_cls=RestorationFileDraft, store=False)

    bucket_id = ModelField(dump=False)
    bucket = ModelField(dump=False)


RestorationRecord.has_draft = HasDraftCheckField(
    draft_cls=RestorationDraft, config_key="HAS_DRAFT_CUSTOM_FIELD"
)

RestorationFile.record_cls = RestorationRecord

RestorationFileDraft.record_cls = RestorationDraft
