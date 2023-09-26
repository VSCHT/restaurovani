import React, { useEffect, useState } from "react";
import _isEmpty from "lodash/isEmpty";
import PropTypes from "prop-types";
import {
  AccordionField,
  BaseForm,
  TextField,
  FieldLabel,
  SelectField,
  RadioField,
  BooleanField,
  GroupField,
} from "react-invenio-forms";

import {
  Container,
  Header,
  Message,
  Radio,
  Button,
  Grid,
  Label,
} from "semantic-ui-react";
import {
  DepositValidationSchemaEdit,
  DepositValidationSchemaDraft,
} from "./DepositValidationSchema";
import { useFormConfig, useOnSubmit, submitContextType } from "@js/oarepo_ui";
import {
  Formik,
  useFormikContext,
  Field,
  Form,
  FieldArray,
  ErrorMessage,
} from "formik";
import { VocabularySelectField } from "@js/oarepo_vocabularies";
import _get from "lodash/get";
import Overridable from "react-overridable";
import { i18next } from "@translations/restoration_ui/i18next";
import { useDepositApiClient } from "@js/oarepo_ui";
import { SaveButton } from "../components";

const CurrentRecord = (props) => {
  const { record } = props;
  return (
    <Message>
      <Message.Header>Current record state</Message.Header>
      <pre>{JSON.stringify(record)}</pre>
    </Message>
  );
};

CurrentRecord.propTypes = {
  record: PropTypes.object,
};

CurrentRecord.defaultProps = {
  record: undefined,
};

const RecordPreviewer = ({ record }) => <CurrentRecord record={record} />;

RecordPreviewer.propTypes = {
  record: PropTypes.object,
};

RecordPreviewer.defaultProps = {
  record: undefined,
};

const units = [
  { value: "kg", text: "kg" },
  { value: "mg", text: "mg" },
  { value: "cm", text: "cm" },
  { value: "metr", text: "metr" },
  { value: "mm", text: "mm" },
];

const categories = [
  { value: "sklo", text: "sklo" },
  { value: "keramika", text: "keramika" },
  { value: "kovy", text: "kovy" },
];

export const DepositForm = () => {
  const { record, formConfig } = useFormConfig();
  const metadata = _get(formConfig, "metadata", "no metadata");
  console.log(formConfig);
  console.log(record);
  console.log(metadata);

  document.getElementsByClassName("mt-20")[0].style.display = "none";

  const [selectedRadio, setSelectedRadio] = useState("");
  const handleRadio = (value) => {
    setSelectedRadio(value);
  };

  return (
    <Container>
      <BaseForm
        onSubmit={() => {}}
        formik={{
          initialValues: record,
          validateOnChange: false,
          validateOnBlur: false,
          enableReinitialize: true,
          validationSchema: DepositValidationSchemaEdit,
        }}
      >
        {record.metadata  != null ? (
          <Overridable id="Deposit.AccordionFieldBasicInformation.container">
            <AccordionField
              includesPaths={[
                "metadata.restorationObject.materialType",
                "metadata.restorationObject.restorationMethods",
                "metadata.restorationObject.fabricationTechnology",
                "metadata.restorationObject.secondaryMaterialTypes",
                "metadata.restorationObject.itemTypes",
                "metadata.restorationObject.color",
                "metadata.restorationObject.dimensions",
                "metadata.restorationObject.stylePeriod",
                "metadata.restorationObject.restorationRequestor",
                "metadata.restorationObject.description",
                "metadata.restorationObject.title",
                "metadata.restorationObject.archeologic",
                "metadata.restorationObject.creationPeriod",
                "metadata.restorationObject.category",
              ]}
              active
              label={"Basic information"}
            >
              <Grid className="vert-div predmety__form">
                <div>
                  <h3 className="predmety__form__h">Editace predmetu</h3>
                </div>
                <div className="vert-div predmety__form-main">
                  <div className="vert-div predmety__form__div">
                    <div className="vert-div predmety__form__div">
                      <TextField
                        name="metadata.keyword"
                        aria-label="Klíčová slova"
                        fieldPath="metadata.keyword"
                        label={
                          <FieldLabel
                            htmlFor="metadata.keyword"
                            className="predmety__form__div__label"
                            label={"Klíčová slova"}
                          />
                        }
                      />
                    </div>

                    <div className="vert-div predmety__form__div">
                      <TextField
                        name="metadata.restorationObject.description"
                        aria-label="Popis"
                        fieldPath="metadata.restorationObject.description"
                        value={
                          record.metadata?.restorationWork?.abstract?.[0]?.value
                        }
                        label={
                          <FieldLabel
                            htmlFor="metadata.restorationObject.description"
                            className="predmety__form__div__label"
                            label={"Popis"}
                          ></FieldLabel>
                        }
                      />
                    </div>

                    <div className="vert-div predmety__form__div">
                      <Label
                        for="metadata.restorationObject.category"
                        className="predmety__form__div__label"
                      >
                        Kategorie
                      </Label>
                      <GroupField
                        fieldPath="metadata.restorationObject.category"
                        className="horiz-div predmety__form__div__input-radio"
                      >
                        <div className="predmety__form__div__label horiz-div">
                          <Radio
                            label="Kovy"
                            className="predmety__form__div__radio"
                            checked={selectedRadio == "Kovy"}
                            onChange={() => handleRadio("Kovy")}
                          ></Radio>
                        </div>
                        <div className="predmety__form__div__label horiz-div">
                          <Radio
                            label="Textil"
                            className="predmety__form__div__radio"
                            checked={selectedRadio == "Textil"}
                            onChange={() => handleRadio("Textil")}
                          ></Radio>
                        </div>
                        <div className="predmety__form__div__label horiz-div">
                          <Radio
                            label="Keramika"
                            className="predmety__form__div__radio"
                            checked={selectedRadio == "Keramika"}
                            onChange={() => handleRadio("Keramika")}
                          ></Radio>
                        </div>
                        <div className="predmety__form__div__label horiz-div">
                          <Radio
                            label="Sklo"
                            className="predmety__form__div__radio"
                            checked={selectedRadio == "Sklo"}
                            onChange={() => handleRadio("Sklo")}
                          ></Radio>
                        </div>
                      </GroupField>
                    </div>

                    <div className="vert-div predmety__form__div">
                      <div className="vert-div predmety__form__div">
                        <VocabularySelectField
                          type={`RestorationMethods`}
                          fieldPath="metadata.restorationWork.restorationMethods"
                          multiple={true}
                          placeholder={"Vyberte metodu restaurace"}
                          value={
                            record.metadata?.restorationWork
                              ?.restorationMethods[0]?.id
                          }
                          clearable
                          label={
                            <FieldLabel
                              htmlFor={
                                "metadata.restorationWork.restorationMethods"
                              }
                              label={"Metoda restaurace"}
                            />
                          }
                        />
                      </div>

                      <div className="vert-div predmety__form__div">
                        <VocabularySelectField
                          type={`FabricationTechnologies`}
                          fieldPath="metadata.fabricationTechnology"
                          placeholder={"Vyberte technologie fabrikace"}
                          value={
                            record.metadata?.restorationWork?.fabricationMethods
                              ?.id
                          }
                          multiple={false}
                          clearable
                          label={
                            <FieldLabel
                              htmlFor={"metadata.fabricationTechnology"}
                              label={"Technologie Fabrikace"}
                            />
                          }
                        />
                      </div>

                      <div className="vert-div predmety__form__div">
                        <VocabularySelectField
                          type={`MaterialTypes`}
                          fieldPath="metadata.materialType"
                          multiple={false}
                          clearable
                          placeholder={"Vyberte typy materialu"}
                          value={
                            record.metadata?.restorationWork?.materialType?.id
                          }
                          label={
                            <FieldLabel
                              htmlFor={"metadata.materialType"}
                              label={"Typy Materialu"}
                            />
                          }
                        />
                      </div>

                      <div className="vert-div predmety__form__div">
                        <VocabularySelectField
                          type={`MaterialTypes`}
                          fieldPath="metadata.secondaryMaterialTypes"
                          multiple={true}
                          clearable
                          placeholder={"Vyberte vedlejší typy materiálu"}
                          value={
                            record.metadata?.restorationWork
                              ?.secondaryMaterialTypes?.[0]?.id
                          }
                          label={
                            <FieldLabel
                              htmlFor={"metadata.secondaryMaterialTypes"}
                              label={"Vedlejší typy materiálu"}
                            />
                          }
                        />
                      </div>

                      <div className="vert-div predmety__form__div">
                        <VocabularySelectField
                          type={`ItemTypes`}
                          fieldPath="metadata.restorationObject.itemTypes"
                          multiple={false}
                          placeholder={"Vyberte typ predmetu"}
                          value={
                            record.metadata?.restorationWork?.itemTypes?.id
                          }
                          clearable
                          label={
                            <FieldLabel
                              htmlFor={"metadata.restorationObject.itemTypes"}
                              label={"Typ predmetu"}
                            />
                          }
                        />
                      </div>
                      <div className="vert-div predmety__form__div">
                        <VocabularySelectField
                          type={`Colors`}
                          fieldPath="metadata.color"
                          multiple={false}
                          clearable
                          label={
                            <FieldLabel
                              htmlFor={"metadata.color"}
                              label={"Barva"}
                            />
                          }
                          placeholder={"Vyberte barvu"}
                        />
                      </div>

                      <div className="vert-div predmety__form__div">
                        <FieldArray
                          name="metadata.restorationObject.dimensions"
                          fieldPath="metadata.restorationObject.dimensions"
                        >
                          {({ insert, remove, push }) => (
                            <>
                              {record?.metadata?.restorationObject?.dimensions.map(
                                (dimension, index) => (
                                  <>
                                    <div className="horiz-div predmety__form__div-small">
                                      <div className="vert-div predmety__form__div-small__div">
                                        <VocabularySelectField
                                          type={`Dimensions`}
                                          fieldPath="metadata.restorationObject.dimensions.dimension.id"
                                          clearable
                                          label={
                                            <FieldLabel
                                              htmlFor={
                                                "metadata.restorationObject.dimensions.dimension.id"
                                              }
                                              label={"Parametr"}
                                            />
                                          }
                                          value={
                                            record.metadata?.restorationObject
                                              ?.dimensions?.[index]?.dimension
                                              ?.id
                                          }
                                        />
                                      </div>

                                      <div className="vert-div predmety__form__div-small__div">
                                        <TextField
                                          name="metadata.restorationObject.dimensions.value"
                                          aria-label="Value"
                                          fieldPath="metadata.restorationObject.dimensions.value"
                                          value={
                                            record.metadata?.restorationObject
                                              ?.dimensions?.[index]?.value
                                          }
                                          label={
                                            <FieldLabel
                                              htmlFor="metadata.restorationObject.dimensions.value"
                                              className="predmety__form__div__label"
                                              label={"Value"}
                                            ></FieldLabel>
                                          }
                                        />
                                      </div>

                                      <div className="vert-div predmety__form__div-small__div predmety__form__div-unit">
                                        <SelectField
                                          name="metadata.restorationObject.dimensions.unit"
                                          aria-label="Unit"
                                          fieldPath="metadata.restorationObject.dimensions.unit"
                                          options={units}
                                          value={
                                            record.metadata?.restorationObject
                                              ?.dimensions?.[index]?.unit
                                          }
                                          label={
                                            <FieldLabel
                                              htmlFor="metadata.restorationObject.dimensions.unit"
                                              className="predmety__form__div__label"
                                              label={"Unit"}
                                            ></FieldLabel>
                                          }
                                        />
                                      </div>
                                      <div className="vert-div">
                                        <button
                                          type="button"
                                          className="predmety__form__div__button-small predmety__form__div__button-small-delete"
                                          onClick={() => {
                                            record.metadata?.restorationObject?.dimensions.splice(
                                              index,
                                              1
                                            );
                                            console.log(
                                              record.metadata?.restorationObject
                                                ?.dimensions
                                            );
                                          }}
                                        >
                                          x
                                        </button>
                                      </div>
                                    </div>
                                  </>
                                )
                              )}

                              <Button
                                type="button"
                                className="predmety__form__div__button-small"
                                color="grey"
                                onClick={() => {
                                  const data =
                                    record.metadata?.restorationObject
                                      ?.dimensions;
                                  data.push({
                                    dimension: { title: "" },
                                    value: "",
                                    unit: "",
                                  });
                                  console.log(data);
                                }}
                              >
                                Dodat
                              </Button>
                            </>
                          )}
                        </FieldArray>
                      </div>

                      <div>
                        <FieldArray name="stylePeriod">
                          <div className="horiz-div predmety__form__div-small">
                            <div className="vert-div predmety__form__div">
                              <VocabularySelectField
                                type={`StylePeriods`}
                                fieldPath="metadata.restorationObject.stylePeriod"
                                value={
                                  record.metadata?.restorationObject
                                    ?.stylePeriod?.period?.id
                                }
                                clearable
                                label={
                                  <FieldLabel
                                    htmlFor={
                                      "metadata.restorationObject.stylePeriod"
                                    }
                                    label={"Perioda"}
                                  />
                                }
                                // placeholder={"Perioda"}
                              />
                            </div>

                            <div className="vert-div predmety__form__div">
                              <TextField
                                name="metadata.stylePeriod.startYear"
                                aria-label="Počáteční rok"
                                fieldPath="metadata.stylePeriod.startYear"
                                label={
                                  <FieldLabel
                                    htmlFor="metadata.stylePeriod.startYear"
                                    className="predmety__form__div__label"
                                    label={"Počáteční rok"}
                                  ></FieldLabel>
                                }
                              />
                            </div>

                            <div className="vert-div predmety__form__div">
                              <TextField
                                name="metadata.stylePeriod.endYear"
                                aria-label="Končicí rok"
                                fieldPath="metadata.stylePeriod.endYear"
                                label={
                                  <FieldLabel
                                    htmlFor="metadata.stylePeriod.endYear"
                                    className="predmety__form__div__label"
                                    label={"Končicí rok"}
                                  ></FieldLabel>
                                }
                              />
                            </div>
                          </div>
                        </FieldArray>
                      </div>

                      <div className="vert-div predmety__form__div predmety__form__div">
                        <BooleanField
                          name="metadata.restorationObject.archeologic"
                          aria-label="Archeologicky nález"
                          fieldPath="metadata.restorationObject.archeologic"
                          value={
                            record.metadata?.restorationObject?.archeologic
                          }
                          label={
                            <FieldLabel
                              htmlFor="metadata.restorationObject.archeologic"
                              className="predmety__form__div__label"
                              label={"Archeologicky nález"}
                            ></FieldLabel>
                          }
                        />
                      </div>

                      <div>
                        <FieldArray name="metadata.restorationWork.restorationPeriod">
                          <div className="horiz-div predmety__form__div-small">
                            <div className="vert-div predmety__form__div">
                              <TextField
                                name="metadata.restorationWork.restorationPeriod.since"
                                aria-label="Od"
                                value={
                                  record.metadata?.restorationWork
                                    ?.restorationPeriod?.since
                                }
                                fieldPath="metadata.restorationWork.restorationPeriod.since"
                                label={
                                  <FieldLabel
                                    htmlFor="metadata.restorationWork.restorationPeriod.since"
                                    className="predmety__form__div__label"
                                    label={"Perioda prace od"}
                                  ></FieldLabel>
                                }
                              />
                            </div>

                            <div className="vert-div predmety__form__div">
                              <TextField
                                name="metadata.restorationWork.restorationPeriod.until"
                                aria-label="Do"
                                fieldPath="metadata.restorationWork.restorationPeriod.until"
                                value={
                                  record.metadata?.restorationWork
                                    ?.restorationPeriod?.until
                                }
                                label={
                                  <FieldLabel
                                    htmlFor="metadata.restorationWork.restorationPeriod.until"
                                    className="predmety__form__div__label"
                                    label={"Perioda prace do"}
                                  ></FieldLabel>
                                }
                              />
                            </div>
                          </div>
                        </FieldArray>
                      </div>

                      <div className="vert-div predmety__form__div">
                        <VocabularySelectField
                          type={`Institutions`}
                          fieldPath="metadata.restorationObject.restorationRequestor"
                          multiple={false}
                          value={
                            record.metadata?.restorationObject
                              ?.restorationRequestor?.id
                          }
                          clearable
                          label={
                            <FieldLabel
                              htmlFor={
                                "metadata.restorationObject.restorationRequestor"
                              }
                              label={"Žadatel restaurace"}
                            />
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <SaveButton />
              </Grid>
            </AccordionField>
          </Overridable>
        ) : null}
      </BaseForm>

      <BaseForm
        onSubmit={() => {}}
        formik={{
          initialValues: record,
          validateOnChange: false,
          validateOnBlur: false,
          enableReinitialize: true,
          validationSchema: DepositValidationSchemaDraft,
        }}
      >
        { record.metadata  == null? 
        (
          <Overridable id="Deposit.AccordionFieldBasicInformation.container">
          <AccordionField
            includesPaths={[
              "metadata.restorationWork.restorer",
              "metadata.restorationObject.title",
              "metadata.restorationObject.category",
            ]}
            active
            label={"Basic information"}
          >
            <div className="vert-div predmety__form">
              <h3 className="predmety__form__h">Vytvoreni noveho predmetu</h3>
              <div className="vert-div predmety__form-main">
                <div className="vert-div predmety__form__div">
                  <TextField
                    name="metadata.restorationObject.title"
                    aria-label="Nazev"
                    fieldPath="metadata.restorationObject.title"
                    required
                    label={
                      <FieldLabel
                        htmlFor="metadata.restorationObject.title"
                        className="predmety__form__div__label"
                        label={"Nazev"}
                      />
                    }
                  />
                </div>
                <div className="vert-div predmety__form__div">
                  <TextField
                    name="metadata.restorationWork.restorer"
                    aria-label="Restauroval(a)"
                    fieldPath="metadata.restorationWork.restorer"
                    required
                    label={
                      <FieldLabel
                        htmlFor="metadata.restorationWork.restorer"
                        className="predmety__form__div__label"
                        label={"Restauroval(a)"}
                      />
                    }
                  />
                </div>
                <div className="vert-div predmety__form__div">
                  <Label
                    for="metadata.restorationObject.category"
                    className="predmety__form__div__label"
                    
                  >
                    Kategorie
                  </Label>
                  <GroupField
                    fieldPath="metadata.restorationObject.category"
                    className="horiz-div predmety__form__div__input-radio"
                    required
                  >
                    <div className="predmety__form__div__label horiz-div">
                      <Radio
                        label="Kovy"
                        className="predmety__form__div__radio"
                        checked={selectedRadio == "Kovy"}
                        onChange={() => handleRadio("Kovy")}
                      ></Radio>
                    </div>
                    <div className="predmety__form__div__label horiz-div">
                      <Radio
                        label="Textil"
                        className="predmety__form__div__radio"
                        checked={selectedRadio == "Textil"}
                        onChange={() => handleRadio("Textil")}
                      ></Radio>
                    </div>
                    <div className="predmety__form__div__label horiz-div">
                      <Radio
                        label="Keramika"
                        className="predmety__form__div__radio"
                        checked={selectedRadio == "Keramika"}
                        onChange={() => handleRadio("Keramika")}
                      ></Radio>
                    </div>
                    <div className="predmety__form__div__label horiz-div">
                      <Radio
                        label="Sklo"
                        className="predmety__form__div__radio"
                        checked={selectedRadio == "Sklo"}
                        onChange={() => handleRadio("Sklo")}
                      ></Radio>
                    </div>
                  </GroupField>
                </div>
              </div>
              <SaveButton />
            </div>
          </AccordionField>
        </Overridable>
        )
        : null
        }
        
      </BaseForm>
    </Container>
  );

      }