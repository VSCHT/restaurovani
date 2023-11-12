from pathlib import Path

import openpyxl

from itertools import islice
import yaml

import graphlib


def load_original_vocabulary_entries(code, catalogue):
    catalogue_data = catalogue[code]
    sources = [x for x in catalogue_data if "source" in x]
    source = sources[0]["source"]
    with (Path(__file__).parent / ("original_" + source)).open() as f:
        return {x["id"]: x for x in yaml.safe_load_all(f)}


def load_modified_vocabularies_lr_2023_10():
    with (Path(__file__).parent / "catalogue.yaml").open() as f:
        catalogue = yaml.safe_load(f)

    rdr = openpyxl.load_workbook(
        Path(__file__).parent / "restaurovani-slovniky_LR.xlsx", read_only=True
    )
    replaced_identifiers = {}

    for worksheet in rdr.worksheets:
        vocabulary_code = worksheet["B1"].value
        vocabulary_name = worksheet["B2"].value
        keep_vocabulary = worksheet["B3"].value.strip() == "ano"

        print(f"Processing vocabulary {vocabulary_code} {vocabulary_name}")

        if not keep_vocabulary:
            print(f"Remove vocabulary {vocabulary_code} from catalogue")
            catalogue.pop(vocabulary_code, None)
            continue

        original_entries = load_original_vocabulary_entries(vocabulary_code, catalogue)
        transformed_entries = {}

        worksheet_rows = [[cell.value for cell in row] for row in worksheet.rows]
        worksheet_rows = [
            [cell.strip() if isinstance(cell, str) else cell for cell in row]
            for row in worksheet_rows
        ]

        header = worksheet_rows[5]

        rows = [dict(zip(header, row)) for row in worksheet_rows[7:]]
        for r in rows:
            if r["Ponechat"] != "ano":
                print(f"{vocabulary_code} {vocabulary_name}: Will remove {r}")
        rows = [x for x in rows if x["Ponechat"] == "ano"]

        def non_null_set(*vals):
            return {x for x in vals if x}

        graph = {
            k["id"]: non_null_set(
                k["Odstranit a nahradit za existující položku"],
                k["Přesunout pod jinou položku"] or k["parent"],
            )
            for k in rows
        }
        sorter = graphlib.TopologicalSorter(graph)
        order = {x: idx for idx, x in enumerate(sorter.static_order())}

        rows.sort(key=lambda x: order[x["id"]])

        for row in rows:
            id_ = row["id"]
            replace = row["Odstranit a nahradit za existující položku"]
            move = row["Přesunout pod jinou položku"]
            title = row["title"]

            if row["id"] not in original_entries:
                print(f"Missing {id_} in original data")
                continue

            if replace:
                if replace not in transformed_entries:
                    raise Exception(
                        f"Missing '{replace}' in transformed data, "
                        f"vocabulary {vocabulary_code} {vocabulary_name}"
                    )
                replaced_identifiers[id_] = replace
                continue

            entry = original_entries[id_]
            entry["title"] = {"cs": title}
            if move:
                entry["hierarchy"]["parent"] = move

            transformed_entries[entry["id"]] = entry

        with (Path(__file__).parent / "files" / f"{vocabulary_code}.yaml").open(
            "w"
        ) as f:
            yaml.safe_dump_all(transformed_entries.values(), f, allow_unicode=True)

    with (Path(__file__).parent / "files" / "replaced_identifiers.yaml").open("w") as f:
        yaml.safe_dump(replaced_identifiers, f, allow_unicode=True)

    with (Path(__file__).parent / "catalogue.yaml").open("w") as f:
        yaml.safe_dump(catalogue, f, allow_unicode=True)


if __name__ == "__main__":
    load_modified_vocabularies_lr_2023_10()
