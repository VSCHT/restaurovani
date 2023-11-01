from flask_resources import BaseListSchema
from flask_resources.serializers import JSONSerializer
from oarepo_runtime.resources import LocalizedUIJSONSerializer

from restoration.services.records.ui_schema import RestorationUISchema


class RestorationUIJSONSerializer(LocalizedUIJSONSerializer):
    """UI JSON serializer."""

    def __init__(self):
        """Initialise Serializer."""
        super().__init__(
            format_serializer_cls=JSONSerializer,
            object_schema_cls=RestorationUISchema,
            list_schema_cls=BaseListSchema,
            schema_context={"object_key": "ui"},
        )
