import uuid
from pathlib import Path
from pprint import pprint

import requests
import yaml


def download_records(url):
    data = {}
    while url:
        print(f"Getting {url}")
        response = requests.get(url).json()
        for d in response["hits"]["hits"]:
            data[d["id"]] = d
        url = response.get("links", {}).get("next")
    return data


class Vocabularies:
    def __init__(self):
        self.vocabularies = {}
        catalogue = self.get_catalogue(
            Path(__file__).parent.parent / "fixtures" / "catalogue.yaml"
        )
        for vocabulary_name, vocabulary_file in catalogue.items():
            self.load_vocabulary(vocabulary_name, vocabulary_file)

    def get_catalogue(self, f):
        with f.open("r") as fd:
            catalogue = yaml.safe_load(fd)
            return {x: f.parent / "files" / f"{x}.yaml" for x in catalogue}

    def load_vocabulary(self, name, f):
        ret = {}
        with f.open("r") as fd:
            for i in yaml.safe_load_all(fd):
                ret[i["id"]] = i
        self.vocabularies[name] = ret

    def convert(self, vocabulary_name, value):
        if not value:
            return None
        if "path" not in value:
            raise AssertionError(
                f"path not in vocabulary value in {vocabulary_name} {value}"
            )
        slug = value["path"].replace("/", "-")
        if slug.startswith("-"):
            slug = slug[1:]
        vocab = self.vocabularies[vocabulary_name]
        if slug.endswith("-1") and slug not in vocab:
            slug = slug[:-2]
        if slug.endswith("-2") and slug not in vocab:
            slug = slug[:-2]
        slug_conversion = {
            "cirkevni-sprava-rimskokatolicka-farnost-ostrov-1-litomericka-dieceze-jablonne-v-podjestedi": "cirkevni-sprava-litomericka-dieceze-jablonne-v-podjestedi",
            "muzea-armadni-muzeum-zizkov-vychodoceske-muzeum-v-pardubicich-vlastivedne-muzeum-dr-hostase-v-klatovech": "muzea-vlastivedne-muzeum-dr-hostase-v-klatovech",
            "zapadoceske-muzeum-v-plzni": "muzea-zapadoceske-muzeum-v-plzni",
            "cirkevni-sprava-rimskokatolicka-farnost-bzi-zelezny-brod-biskupstvi-litomysl": "cirkevni-sprava-biskupstvi-litomysl",
            "zidovske-muzeum-praha": "muzea-zidovske-muzeum-praha",
        }
        slug = slug_conversion.get(slug, slug)
        if slug in vocab:
            value.pop("ancestors", None)
            value.pop("id", None)
            value.pop("level", None)
            value.pop("links", None)
            value.pop("path", None)
            value.pop("slug", None)
            value.pop("title", None)
            value.pop("descendants_count", None)
            value.pop("tooltip", None)
            value.pop("address", None)
            value.pop("contact", None)
            return {"id": slug}
        raise Exception(
            f"Vocabulary item {slug} not in {vocabulary_name}. Full value {value} "
        )


def trim(x):
    if x:
        return x.strip()
    return None


def fix_json(d):
    if isinstance(d, dict):
        return {k: fix_json(v) for k, v in d.items() if v is not None and v != ""}
    if isinstance(d, list):
        return [fix_json(v) for v in d if v is not None and v != ""]
    if isinstance(d, str):
        d = trim(d)
        d = d.replace(r"\n", " ")
        d = d.replace("\n", " ")
        d = d.replace(" ", " ")
        d = d.replace("  ", " ")
        d = d.replace("  ", " ")
        d = d.replace("  ", " ")
        d = d.replace("  ", " ")
        d = d.replace("  ", " ")
        return d
    return d


def convert_object(restoration_object, vocabulary):
    ret = {}
    restoration_object = restoration_object["metadata"]
    ret["title"] = restoration_object.pop("title")
    ret["description"] = restoration_object.pop("description", None)
    ret["category"] = restoration_object.pop("category")
    ret["keywords"] = restoration_object.pop("keywords", [])
    ret_parts = ret["parts"] = []
    methods_for_part = {}
    for part in restoration_object.pop("parts", []):
        ret_part = {
            "id": uuid.uuid4().hex,
            "name": part.pop("name"),
            "main": part.pop("main"),
            "fabricationTechnologies": [
                vocabulary.convert("FabricationTechnologies", x)
                for x in part.pop("fabricationTechnology", [])
            ],
            "materialType": vocabulary.convert(
                "MaterialTypes", part.pop("materialType", None)
            ),
            "secondaryMaterialTypes": [
                vocabulary.convert("MaterialTypes", x)
                for x in part.pop("secondaryMaterialTypes", [])
            ],
            "colors": [vocabulary.convert("Colors", x) for x in part.pop("color", [])],
        }
        if "restorationMethods" in part:
            methods_for_part[ret_part["id"]] = [
                vocabulary.convert("RestorationMethods", x)
                for x in part.pop("restorationMethods", [])
            ]
        if part != {}:
            raise AssertionError(f"Expected empty part after conversion, got {part}")
        ret_parts.append(part)
    ret["itemTypes"] = [
        vocabulary.convert("ItemTypes", x)
        for x in restoration_object.pop("itemType", [])
    ]
    ret["dimensions"] = ret_dimensions = []
    for dim in restoration_object.pop("dimensions", []):
        ret_dimension = {
            "dimension": vocabulary.convert("Dimensions", dim.pop("dimension")),
            "unit": dim.pop("unit"),
            "value": dim.pop("value"),
        }
        if dim != {}:
            raise AssertionError(
                f"Expected empty dimension after conversion, got {dim}"
            )
        ret_dimensions.append(ret_dimension)
    style_period = restoration_object.pop("stylePeriod", None)
    if style_period:
        ret["stylePeriod"] = {
            "period": vocabulary.convert("StylePeriods", style_period),
            "startYear": style_period.pop("startYear", None),
            "endYear": style_period.pop("endYear", None),
        }
        if style_period != {}:
            raise AssertionError(
                f"Expected empty stylePeriod after conversion, got {style_period}"
            )
    ret["archeologic"] = restoration_object.pop("archeologic")
    ret["creationPeriod"] = restoration_object.pop("creationPeriod", None)
    ret["restorationRequestor"] = vocabulary.convert(
        "Requestors", restoration_object.pop("restorationRequestor", None)
    )

    restoration_object.pop("$schema")
    restoration_object.pop("_bucket")
    restoration_object.pop("_files", None)
    restoration_object.pop("created")
    restoration_object.pop("creator")
    object_id = restoration_object.pop("id")
    restoration_object.pop("identifier")
    restoration_object.pop("modified")
    restoration_object.pop("public")
    restoration_object.pop("submissionStatus")
    restoration_object.pop("thumbnail", None)

    restoration_works = [
        convert_work(object_id, x, vocabulary, methods_for_part)
        for x in restoration_object.pop("works", [])
    ]

    if restoration_object != {}:
        raise AssertionError(
            f"Expected empty restoration_object after conversion, got {restoration_object}"
        )
    return fix_json(
        [
            {
                "metadata": {
                    "restorationObject": ret,
                    "restorationWork": w,
                }
            }
            for w in restoration_works
        ]
    )


def convert_work(object_id, restoration_work, vocabulary, methods_for_part):
    restoration_work = restoration_work["metadata"]
    ret = {"restorer": restoration_work.pop("creator")}
    restoration_work.pop("$schema")
    restoration_work.pop("_bucket")
    restoration_work.pop("_files", None)
    restoration_work.pop("id")
    restoration_work.pop("_restoration")
    restoration_work.pop("public")

    ret["abstract"] = restoration_work.pop("abstract", None)
    ret["examinationMethods"] = [
        vocabulary.convert("ExaminationMethods", x)
        for x in restoration_work.pop("examinationMethods", [])
    ]
    ret["restorationMethods"] = [
        vocabulary.convert("RestorationMethods", x)
        for x in restoration_work.pop("restorationMethods", [])
    ]
    ret["restorationPeriod"] = restoration_work.pop("restorationPeriod", None)
    supervisors = ret["supervisors"] = []
    for sup in restoration_work.pop("supervisor", []):
        institution = sup.pop("institution", {})
        supervisors.append(
            {
                "sisCode": sup.pop("code", None),
                "comment": sup.pop("comment", None),
                "institution": institution.pop("name", None),
                "fullName": trim(sup.pop("name", None)),
            }
        )
        if institution != {}:
            raise AssertionError(
                f"Expected empty institution after conversion, got {institution}"
            )

        if sup != {}:
            raise AssertionError(f"Expected empty sup after conversion, got {sup}")
    if methods_for_part:
        ret["parts"] = [
            {"id": part_id, "restorationMethods": methods}
            for part_id, methods in methods_for_part.items()
        ]
    ret["workType"] = vocabulary.convert(
        "WorkTypes", restoration_work.pop("workType", None)
    )

    if restoration_work != {}:
        raise AssertionError(
            f"Expected empty restoration_work after conversion, got {restoration_work}"
        )
    return ret


def main():
    vocabs = Vocabularies()
    objects = download_records(
        "https://restaurovani.vscht.cz/api/drafts/restorations/objects/?size=50"
    )
    converted_objects = []
    for obj in objects.values():
        converted_objects.extend(convert_object(obj, vocabs))
    with open(Path(__file__).parent / "data" / "data.yaml", "w") as f:
        yaml.safe_dump_all(converted_objects, f, allow_unicode=True)


if __name__ == "__main__":
    main()