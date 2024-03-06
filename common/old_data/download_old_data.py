import uuid
from collections import namedtuple
from pathlib import Path

import requests
import yaml
import tqdm

MetadataWithFiles = namedtuple("MetadataWithFiles", ["metadata", "files"])


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
        self.replaced_vocabulary_terms = {}
        self.vocabularies = {}

        catalogue = self.get_catalogue(
            Path(__file__).parent.parent.parent / "fixtures" / "catalogue.yaml"
        )
        for vocabulary_name, vocabulary_file in catalogue.items():
            self.load_vocabulary(vocabulary_name, vocabulary_file)
        self.load_replaced_vocabulary_terms()

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
        if slug in self.replaced_vocabulary_terms:
            slug = self.replaced_vocabulary_terms[slug]

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

    def load_replaced_vocabulary_terms(self):
        with (
            Path(__file__).parent.parent.parent
            / "fixtures"
            / "files"
            / "replaced_identifiers.yaml"
        ).open() as f:
            self.replaced_vocabulary_terms = yaml.safe_load(f)


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


def cs_language(x):
    try:
        if x is None:
            return None
        if isinstance(x, str):
            return x
        if isinstance(x, list):
            for rec in x:
                if rec["lang"] == "cs":
                    return rec["value"]
            if x:
                return x[0]["value"]
            else:
                return None
        raise RuntimeError(f"Expected string or list of strings, got {x}")
    except Exception as e:
        raise RuntimeError(f"Error in cs_language({x})") from e


def convert_vocabulary_entry(entries, vocabulary, vocabulary_type):
    ret = []
    for x in entries:
        try:
            ret.append(vocabulary.convert(vocabulary_type, x))
        except:
            print(
                f"ItemType {x} not found in vocabulary {vocabulary_type}, ignoring it"
            )
    return ret


def convert_object(restoration_object, vocabulary):
    ret = {}
    restoration_object = restoration_object["metadata"]
    ret["title"] = cs_language(restoration_object.pop("title"))
    ret["description"] = cs_language(restoration_object.pop("description", None))
    ret["category"] = restoration_object.pop("category")
    ret["keywords"] = restoration_object.pop("keywords", [])

    methods = None
    all_parts = restoration_object.pop("parts", [])
    if all_parts:
        if len(all_parts) > 1:
            print(f"More than one part in {restoration_object['id']}")
            part = [x for x in all_parts if x['main']][0]
        else:
            part = all_parts[0]

        part_id = part.pop('id', None)
        part.pop('name', None)
        part.pop('main', None)

        ret_part = {
            "fabricationTechnologies": convert_vocabulary_entry(
                part.pop("fabricationTechnology", []),
                vocabulary,
                "FabricationTechnologies",
            ),
            "materialType": vocabulary.convert(
                "MaterialTypes", part.pop("materialType", None)
            ),
            "secondaryMaterialTypes": [
                vocabulary.convert("MaterialTypes", x)
                for x in part.pop("secondaryMaterialTypes", [])
            ],
            "colors": [vocabulary.convert("Colors", x) for x in part.pop("color", [])],
        }
        ret.update(ret_part)

        if "restorationMethods" in part:
            methods = [
                vocabulary.convert("RestorationMethods", x)
                for x in part.pop("restorationMethods", [])
            ]

        if part != {}:
            raise AssertionError(f"Expected empty part after conversion, got {part}")

    # some of the itemtypes are undefined, so catching the exception here
    ret["itemTypes"] = convert_vocabulary_entry(
        restoration_object.pop("itemType", []), vocabulary, "ItemTypes"
    )

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

    ret["creationPeriod"] = restoration_object.pop("creationPeriod", None)

    style_period = restoration_object.pop("stylePeriod", None)
    if style_period and not ret["creationPeriod"]:
        start_year = style_period.pop("startYear", None)
        end_year = style_period.pop("endYear", None)
        ret["creationPeriod"] = {"since": start_year, "until": end_year}

    ret["archeologic"] = restoration_object.pop("archeologic")
    ret["restorationRequestor"] = vocabulary.convert(
        "Requestors", restoration_object.pop("restorationRequestor", None)
    )

    restoration_object.pop("$schema")
    restoration_object.pop("_bucket")
    files = restoration_object.pop("_files", [])
    restoration_object.pop("created")
    restoration_object.pop("creator")
    object_id = restoration_object.pop("id")
    restoration_object.pop("identifier")
    restoration_object.pop("modified")
    restoration_object.pop("public")
    restoration_object.pop("submissionStatus")
    thumbnail = restoration_object.pop("thumbnail", None)

    files = [f for f in files if f["selected"]]

    if thumbnail:
        for f in files:
            f["featured"] = f["key"] == thumbnail["key"]

    restoration_works_and_files = []
    for x in restoration_object.pop("works", []):
        work_files = [*files]
        restoration_works_and_files.append(
            (
                convert_work(object_id, x, vocabulary, part_id, methods, work_files),
                work_files,
            )
        )

    if restoration_object != {}:
        raise AssertionError(
            f"Expected empty restoration_object after conversion, got {restoration_object}"
        )
    return [
        MetadataWithFiles(
            fix_json(
                {
                    "metadata": {
                        "restorationObject": ret,
                        "restorationWork": w,
                    }
                }
            ),
            files,
        )
        for w, files in restoration_works_and_files
    ]


def convert_work(object_id, restoration_work, vocabulary, part_id, methods, files):
    restoration_work = restoration_work["metadata"]
    ret = {"restorer": restoration_work.pop("creator")}
    restoration_work.pop("$schema")
    restoration_work.pop("_bucket")
    files.extend(
        [f for f in restoration_work.pop("_files", []) if not f.get("generated-image")]
    )
    restoration_work.pop("id")
    restoration_work.pop("_restoration")
    restoration_work.pop("public")

    ret["abstract"] = cs_language(restoration_work.pop("abstract", None))
    ret["examinationMethods"] = [
        vocabulary.convert("ExaminationMethods", x)
        for x in restoration_work.pop("examinationMethods", [])
    ]
    ret["restorationMethods"] = convert_vocabulary_entry(
        restoration_work.pop("restorationMethods", []), vocabulary, "RestorationMethods"
    )
    if methods:
        ret["restorationMethods"].append(methods)

    ret["restorationPeriod"] = restoration_work.pop("restorationPeriod", None)
    supervisors = ret["supervisors"] = []
    for sup in restoration_work.pop("supervisor", []):
        institution = sup.pop("institution", {})
        supervisors.append(
            {
                "comment": sup.pop("comment", None),
                "institution": institution.pop("name", None),
                "fullName": trim(sup.pop("name", None)),
            }
        )
        sup.pop("code", None),
        if institution != {}:
            raise AssertionError(
                f"Expected empty institution after conversion, got {institution}"
            )

        if sup != {}:
            raise AssertionError(f"Expected empty sup after conversion, got {sup}")

    ret["workType"] = vocabulary.convert(
        "WorkTypes", restoration_work.pop("workType", None)
    )

    if restoration_work != {}:
        raise AssertionError(
            f"Expected empty restoration_work after conversion, got {restoration_work}"
        )
    return ret


def generate_files(idx, files, target_dir):
    metadata = []
    dn = idx + 1
    target_dir = target_dir / f"{dn:03d}" / "data"
    target_dir.mkdir(parents=True, exist_ok=True)
    select = True
    processed_keys = set()
    for f in files:
        if f["key"] in processed_keys:
            print(f"Duplicate key {f['key']} inside {idx}, data {f}")
            continue
        processed_keys.add(f["key"])
        url = f"https://restaurovani.vscht.cz/api/files/{f['bucket']}/{f['key']}"
        print(f"Getting file {url}")
        target_file = target_dir / f["key"]
        if not target_file.exists() or target_file.stat().st_size != f["size"]:
            response = requests.get(url)
            if response.status_code != 200:
                print(f"Error getting {url}: {response.status_code}")
                continue

            with target_file.open("wb") as fd:
                fd.write(response.content)

        metadata.append(
            fix_json(
                {
                    "key": f["key"],
                    "metadata": {
                        "fileType": "photo"
                        if f["mime_type"].startswith("image")
                        else "document",
                        "featured": f.get("featured", False) and select,
                        "caption": f.get("caption", f["key"]),
                        "checksum": f["checksum"],
                        "mimetype": f["mime_type"],
                        "size": f["size"],
                    },
                }
            )
        )
        if f.get("selected"):
            select = False
    with (target_dir / "metadata.yaml").open("w") as fd:
        yaml.safe_dump_all(metadata, fd, allow_unicode=True)


def main():
    vocabs = Vocabularies()
    objects = download_records(
        "https://restaurovani.vscht.cz/api/drafts/restorations/objects/?size=50"
    )
    # keep the list always sorted
    object_values = list(objects.values())
    object_values.sort(key=lambda x: x["metadata"]["id"])
    converted_objects = []
    idx = 0
    for obj in tqdm.tqdm(object_values):
        converted_objects_and_files = convert_object(obj, vocabs)
        for converted_object, files in converted_objects_and_files:
            converted_objects.append(converted_object)
            generate_files(idx, files, Path(__file__).parent / "data" / "files")
            idx += 1
    with open(Path(__file__).parent / "data" / "data.yaml", "w") as f:
        yaml.safe_dump_all(converted_objects, f, allow_unicode=True)


if __name__ == "__main__":
    main()
