from flask_resources import BaseListSchema, MarshmallowSerializer
from flask_resources.serializers import JSONSerializer

from restoration.services.files.ui_schema import (
    RestorationFileDraftUISchema,
    RestorationFileUISchema,
)


class RestorationFileUIJSONSerializer(MarshmallowSerializer):
    """UI JSON serializer."""

    def __init__(self):
        """Initialise Serializer."""
        super().__init__(
            format_serializer_cls=JSONSerializer,
            object_schema_cls=RestorationFileUISchema,
            list_schema_cls=BaseListSchema,
            schema_context={"object_key": "ui"},
        )


class RestorationFileDraftUIJSONSerializer(MarshmallowSerializer):
    """UI JSON serializer."""

    def __init__(self):
        """Initialise Serializer."""
        super().__init__(
            format_serializer_cls=JSONSerializer,
            object_schema_cls=RestorationFileDraftUISchema,
            list_schema_cls=BaseListSchema,
            schema_context={"object_key": "ui"},
        )
