from objects.services.files.config import ObjectsFileServiceConfig


class ObjectsFilePublishedServiceConfig(ObjectsFileServiceConfig):
    service_id = "published_objects_file"

    @property
    def components(self):
        return [*super().components]
