import pandas as pd
import yaml


def construct_name(row):
    name = []
    row.fillna("", inplace=True)
    if row["TITULPRED"] != "":
        name.append(row["TITULPRED"])
    if row["given_name"] != "":
        name.append(row["given_name"])
    name.append(row["family_name"])
    if row["TITULZA"] != "":
        name.append(row["TITULZA"])
    return " ".join(name)


def construct_affiliations(row):
    affiliations = []
    affiliations.append({"name": row["NAZEV_USTAV"], "id": str(row["USTAV"])})
    if row["USTAV2"]:
        affiliations.append({"name": row["NAZEV_USTAV2"], "id": str(row["USTAV2"])})
    return affiliations


def process_names(names: pd.DataFrame):
    names_new = names.rename(columns={"KOD": "id", "NAZEV": "name", "PRIJMENI": "family_name", "JMENO": "given_name"})
    names_new["name"] = names_new.apply(construct_name, axis=1)
    names_new["identifiers"] = names_new["id"].apply(lambda x: [{"identifier": str(x), "scheme": "uct-teacher-number"}])
    names_new["affiliations"] = names_new[['USTAV', 'USTAV2', 'NAZEV_USTAV', 'NAZEV_USTAV2']].apply(construct_affiliations, axis=1)
    names_new.drop(columns=["USTAV", "USTAV2", "FAKULTA", "TITULPRED", "TITULZA", "NAZEV_USTAV", "NAZEV_USTAV2"], inplace=True)
    names_new = names_new[["name", "id", "given_name", "family_name", "identifiers", "affiliations"]]
    return names_new


def process_affiliations(affiliations: pd.DataFrame):
    affiliations_new = affiliations.rename(columns={"KOD": "id", "NAZEV": "name"})
    affiliations_new["identifiers"] = affiliations_new["id"].apply(lambda x: [{"identifier": str(x), "scheme": "uct-institution-number"}])
    return affiliations_new


def dump_yaml(names, affiliations):
    with open("files/names.yaml", "w") as f:
        yaml.dump_all(names.to_dict(orient="records"), f, allow_unicode=True, sort_keys=False)
    with open("files/affiliations.yaml", "w") as f:
        yaml.dump_all(affiliations.to_dict(orient="records"), f, allow_unicode=True, sort_keys=False)


def main():
    print("Converting...")
    names = pd.read_csv(
        "STDOWNER_UCIT.csv",
        usecols=["KOD","NAZEV","USTAV","USTAV2","FAKULTA","PRIJMENI","JMENO","TITULPRED","TITULZA"],
        dtype=str
    )
    affiliations = pd.read_csv(
        "STDOWNER_USTAV.csv",
        usecols=["KOD","NAZEV"],
        dtype=str
    )
    faculties = pd.read_csv(
        "STDOWNER_FAK.csv", 
        usecols=[0, 2], 
        dtype=str
    )
    faculties.columns = ["KOD", "NAZEV"]
    affiliations = pd.concat([affiliations, faculties], ignore_index=True)
    names = names.join(affiliations.set_index("KOD"), on="USTAV", rsuffix="_USTAV")
    names = names.join(affiliations.set_index("KOD"), on="USTAV2", rsuffix="_USTAV2")
    
    names = process_names(names)
    affiliations = process_affiliations(affiliations)
    dump_yaml(names, affiliations)
    print("Done")


if __name__ == "__main__":
    main()
