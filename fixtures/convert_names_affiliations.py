import pandas as pd
import yaml


def process_names(names: pd.DataFrame):
    names_new = names.rename(columns={"PRIJMENI_UCITELE": "family_name", "JMENO_UCITELE": "given_name"})
    names_new["id"] = names["KOD_UCITELE"].copy()
    names_new["name"] = names_new["family_name"] + ", " + names_new["given_name"]
    names_new["identifiers"] = names_new["KOD_UCITELE"].apply(lambda x: [{"identifier": str(x), "scheme": "uct-teacher-number"}])
    names_new["affiliations"] = names_new[['KOD_USTAVU', 'NAZEV_USTAVU']].apply(lambda x: [{"name": x["NAZEV_USTAVU"], "id": str(x["KOD_USTAVU"])}], axis=1)
    names_new.drop(columns=["KOD_UCITELE", "KOD_USTAVU", "NAZEV_USTAVU"], inplace=True)
    names_new = names_new[["name", "id", "given_name", "family_name", "identifiers", "affiliations"]]
    return names_new


def process_affiliations(affiliations: pd.DataFrame):
    affiliations_new = affiliations.rename(columns={"NAZEV_USTAVU": "name"})
    affiliations_new["id"] = affiliations["KOD_USTAVU"].copy()
    affiliations_new["identifiers"] = affiliations_new["KOD_USTAVU"].apply(lambda x: [{"identifier": str(x), "scheme": "uct-institution-number"}])
    affiliations_new.drop(columns=["KOD_USTAVU"], inplace=True)
    return affiliations_new


def dump_yaml(names, affiliations):
    with open("files/names.yaml", "w") as f:
        yaml.dump_all(names.to_dict(orient="records"), f, allow_unicode=True, sort_keys=False)
    with open("files/affiliations.yaml", "w") as f:
        yaml.dump_all(affiliations.to_dict(orient="records"), f, allow_unicode=True, sort_keys=False)


def main():
    print("Converting...")
    df = pd.read_csv(
        "osoby_spojene_s_pracemi_s_ustavy.csv", 
        names=["DID","AKADEMICKY_ROK","JMENO_STUDENTA","PRIJMENI_STUDENTA","JMENO_UCITELE","PRIJMENI_UCITELE","KOD_UCITELE","KOD_USTAVU","NAZEV_USTAVU","TYP_UCITELE"],
        dtype=str
    )
    names = df[["PRIJMENI_UCITELE", "JMENO_UCITELE", "KOD_UCITELE", "KOD_USTAVU", "NAZEV_USTAVU"]].drop_duplicates(subset="KOD_UCITELE")
    affiliations = df[["KOD_USTAVU", "NAZEV_USTAVU"]].drop_duplicates(subset="KOD_USTAVU")
    names = process_names(names)
    affiliations = process_affiliations(affiliations)
    dump_yaml(names, affiliations)
    print("Done")


if __name__ == "__main__":
    main()
