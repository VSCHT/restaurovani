from pprint import pprint

import xlsxwriter
import yaml


def dump_vocabulary(sheet, vocabulary_data, source):
    sheet.set_column(0, 1, 35)
    sheet.write_row(0, 0, ["Kód slovníku", vocabulary_data["vocabulary"]])
    sheet.write_row(1, 0, ["Název slovníku", vocabulary_data["title"]["cs"]])
    sheet.write_row(2, 0, ["Ponechat slovník", "ano"])

    with open(source["source"]) as f:
        vocabulary_data = list(yaml.safe_load_all(f))

    key2col = {"id": 0, "title": 1, "parent": 2}
    for v in vocabulary_data:
        if "props" in v:
            for vv in v["props"]:
                if vv not in key2col:
                    key2col[vv] = len(key2col)

    r = 6
    ponechat = key2col["Ponechat"] = len(key2col)
    odstranit = key2col["Odstranit a nahradit za existující položku"] = len(key2col)
    presunout = key2col["Přesunout pod jinou položku"] = len(key2col)
    sheet.write_row(5, 0, list(key2col.keys()))
    for v in vocabulary_data:
        r += 1
        sheet.write_row(
            r, 0, [v["id"], v["title"]["cs"], v.get("hierarchy", {}).get("parent", "")]
        )
        for pk, pv in v.get("props", {}).items():
            sheet.write(r, key2col[pk], pv)
        sheet.write(r, ponechat, "ano")


def run():
    with open("catalogue.yaml") as f:
        catalogue = yaml.safe_load(f)

    out = xlsxwriter.Workbook("/tmp/restaurovani-slovniky.xlsx")
    for k, v in catalogue.items():
        sheet_name = v[0]["title"]["cs"]
        dump_vocabulary(out.add_worksheet(sheet_name), v[0], v[1])
    out.close()


if __name__ == "__main__":
    run()
