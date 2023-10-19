import React from "react";
import _isEmpty from "lodash/isEmpty";
import PropTypes from "prop-types";
import {
  AccordionField,
  BaseForm,
  TextField,
  FieldLabel,
  SelectField,
  BooleanField,
  ArrayField,
  TextAreaField,
} from "react-invenio-forms";

import { Container, Message, Grid, Form } from "semantic-ui-react";
import { DepositValidationSchemaEdit } from "../deposit/DepositValidationSchema";
import { useFormConfig, ArrayFieldItem } from "@js/oarepo_ui";
import { FieldArray, Formik, useFormikContext } from "formik";
import { LocalVocabularySelectField } from "@js/oarepo_vocabularies";
import _get from "lodash/get";
import Overridable from "react-overridable";
import { SaveButton, KeyWordsInput } from ".";

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

document.getElementsByClassName("mt-20")[0].style.display = "none";

export const EditObjectForm = ({ edit }) => {
  const { record, formConfig } = useFormConfig();
  return (
    <Container>
      <Formik
        initialValues={record}
        onSubmit={() => {}}
        enableReinitialize
        validationSchema={DepositValidationSchemaEdit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ values }) => (
          <>
            <Grid className="vert-div predmety__form">
              <div>
                <h3 className="predmety__form__h">
                  Editace předmětu{" "}
                  {values.metadata.restorationObject.title[0].value}
                </h3>
              </div>

              <div className="vert-div predmety__form-main">
                <div className="vert-div predmety__form__div-fields">
                  {" "}
                  <Overridable id="Deposit.AccordionFieldBasicInformation.container">
                    <AccordionField
                      includesPaths={[
                        "metadata.restorationObject.materialType",
                        "metadata.restorationObject.secondaryMaterialTypes",
                        "metadata.restorationObject.itemTypes",
                        "metadata.restorationObject.stylePeriod",
                        "metadata.restorationObject.description",
                        "metadata.restorationObject.title",
                        "metadata.restorationObject.archeologic",
                      ]}
                      active
                      label="Udaje"
                    >
                      <div className="vert-div predmety__form__div-fields">
                        <KeyWordsInput fieldPath="metadata.restorationObject.keywords" />
                        <div className="vert-div predmety__form__div">
                          <TextAreaField
                            name="metadata.restorationObject.description[0].value"
                            aria-label="Popis"
                            fieldPath="metadata.restorationObject.description[0].value"
                            label={
                              <FieldLabel
                                htmlFor="metadata.restorationObject.description[0].value"
                                className="predmety__form__div__label"
                                label="Popis"
                              ></FieldLabel>
                            }
                          />
                        </div>
                        <div className="vert-div predmety__form__div">
                          <LocalVocabularySelectField
                            optionsListName="MaterialTypes"
                            fieldPath="metadata.materialType"
                            multiple={false}
                            clearable
                            placeholder="Vyberte typy materiálů"
                            label={
                              <FieldLabel
                                htmlFor="metadata.materialType"
                                label="Typy materiálů"
                              />
                            }
                          />
                        </div>
                        <div className="vert-div predmety__form__div">
                          <LocalVocabularySelectField
                            optionsListName="MaterialTypes"
                            fieldPath="metadata.secondaryMaterialTypes"
                            multiple={true}
                            clearable
                            placeholder="Vyberte vedlejší typy materiálů"
                            label={
                              <FieldLabel
                                htmlFor="metadata.secondaryMaterialTypes"
                                label="Vedlejší typy materiálů"
                              />
                            }
                          />
                        </div>
                        <div className="vert-div predmety__form__div">
                          <LocalVocabularySelectField
                            optionsListName="ItemTypes"
                            fieldPath="metadata.restorationObject.itemTypes"
                            multiple={true}
                            placeholder="Vyberte typ předmětu"
                            clearable
                            label={
                              <FieldLabel
                                htmlFor="metadata.restorationObject.itemTypes"
                                label="Typ předmětu"
                              />
                            }
                          />
                        </div>
                        <div>
                          <FieldArray name="stylePeriod">
                            <div className="horiz-div predmety__form__div">
                              <div className="vert-div predmety__form__div">
                                <LocalVocabularySelectField
                                  optionsListName="StylePeriods"
                                  fieldPath="metadata.restorationObject.stylePeriod"
                                  clearable
                                  label={
                                    <FieldLabel
                                      htmlFor={
                                        "metadata.restorationObject.stylePeriod"
                                      }
                                      label="Období"
                                    />
                                  }
                                />
                              </div>
                            </div>
                          </FieldArray>
                        </div>
                        <div className="vert-div predmety__form__div predmety__form__div-checkbox">
                          <Form.Field>
                            <BooleanField
                              name="metadata.restorationObject.archeologic"
                              aria-label="Archeologický nález"
                              fieldPath="metadata.restorationObject.archeologic"
                              label={
                                <FieldLabel
                                  htmlFor="metadata.restorationObject.archeologic"
                                  className="predmety__form__div__label"
                                  label="Archeologický nález"
                                ></FieldLabel>
                              }
                            />
                          </Form.Field>
                        </div>
                      </div>
                    </AccordionField>
                  </Overridable>
                </div>
              </div>

              <div className="vert-div predmety__form-main">
                <div className="vert-div predmety__form__div-fields">
                  <Overridable id="Deposit.AccordionFieldBasicInformation.container">
                    <AccordionField
                      includesPaths={[
                        "metadata.restorationObject.restorationMethods",
                        "metadata.restorationObject.fabricationTechnology",
                        "metadata.restorationObject.restorationRequestor",
                        "metadata.restorationObject.creationPeriod",
                      ]}
                      active
                      label="Prace"
                    >
                      <div className="vert-div predmety__form__div-fields">
                        <div className="vert-div predmety__form__div">
                          <LocalVocabularySelectField
                            optionsListName="RestorationMethods"
                            fieldPath="metadata.restorationWork.restorationMethods"
                            multiple={true}
                            placeholder="Vyberte metody restaurování"
                            clearable
                            label={
                              <FieldLabel
                                htmlFor="metadata.restorationWork.restorationMethods"
                                label="Metody restaurování"
                              />
                            }
                          />
                        </div>

                        <div className="vert-div predmety__form__div">
                          <LocalVocabularySelectField
                            optionsListName="FabricationTechnologies"
                            fieldPath="metadata.fabricationTechnology"
                            placeholder="Vyberte technologie výroby"
                            multiple={false}
                            clearable
                            label={
                              <FieldLabel
                                htmlFor="metadata.fabricationTechnology"
                                label="Technologie výroby"
                              />
                            }
                          />
                        </div>

                        <FieldArray name="metadata.restorationWork.restorationPeriod">
                          <div className="horiz-div predmety__form__div-small">
                            <div className="vert-div predmety__form__div-medium">
                              <TextField
                                name="metadata.restorationWork.restorationPeriod.since"
                                aria-label="Od"
                                fieldPath="metadata.restorationWork.restorationPeriod.since"
                                label={
                                  <FieldLabel
                                    htmlFor="metadata.restorationWork.restorationPeriod.since"
                                    className="predmety__form__div__label-small"
                                    label="Období restaurování od"
                                  ></FieldLabel>
                                }
                              />
                            </div>

                            <div className="vert-div predmety__form__div-medium">
                              <TextField
                                name="metadata.restorationWork.restorationPeriod.until"
                                aria-label="Do"
                                fieldPath="metadata.restorationWork.restorationPeriod.until"
                                label={
                                  <FieldLabel
                                    htmlFor="metadata.restorationWork.restorationPeriod.until"
                                    className="predmety__form__div__label-small"
                                    label="Období restaurování do"
                                  ></FieldLabel>
                                }
                              />
                            </div>
                          </div>
                        </FieldArray>

                        <div className="vert-div predmety__form__div">
                          <LocalVocabularySelectField
                            fieldPath="metadata.restorationObject.restorationRequestor"
                            multiple={false}
                            optionsListName="Requestors"
                            clearable
                            label={
                              <FieldLabel
                                htmlFor={
                                  "metadata.restorationObject.restorationRequestor"
                                }
                                label="Zadavatel"
                              />
                            }
                          />
                        </div>
                      </div>
                    </AccordionField>
                  </Overridable>
                </div>
              </div>

              <div className="vert-div predmety__form-main">
                <div className="vert-div predmety__form__div-fields">
                  <Overridable id="Deposit.AccordionFieldBasicInformation.container">
                    <AccordionField
                      includesPaths={[
                        "metadata.restorationObject.color",
                        "metadata.restorationObject.dimensions",
                      ]}
                      active
                      label="Vzhled"
                    >
                      <div className="vert-div predmety__form__div-fields">
                        <div className="vert-div predmety__form__div">
                          <LocalVocabularySelectField
                            optionsListName="Colors"
                            fieldPath="metadata.color"
                            multiple={false}
                            clearable
                            label={
                              <FieldLabel
                                htmlFor="metadata.color"
                                label="Barva"
                              />
                            }
                            placeholder="Vyberte barvu"
                          />
                        </div>
                        <div className="vert-div predmety__form__div-dimensions">
                          <ArrayField
                            addButtonLabel="Přidat rozměr"
                            fieldPath="metadata.restorationObject.dimensions"
                            defaultNewValue={{}}
                          >
                            {({ arrayHelpers, indexPath }) => {
                              const fieldPathPrefix = `${"metadata.restorationObject.dimensions"}[${indexPath}]`;
                              return (
                                <ArrayFieldItem
                                  name="metadata.restorationObject.dimensions"
                                  fieldPath="metadata.restorationObject.dimensions"
                                  indexPath={indexPath}
                                  arrayHelpers={arrayHelpers}
                                >
                                  <div className="horiz-div predmety__form__div-small">
                                    <div className="vert-div predmety__form__div-small__div">
                                      <LocalVocabularySelectField
                                        optionsListName="Dimensions"
                                        fieldPath={`${fieldPathPrefix}.dimension`}
                                        clearable
                                        label={
                                          <FieldLabel
                                            htmlFor={`${fieldPathPrefix}.dimension.title`}
                                            label="Rozměr"
                                          />
                                        }
                                      />
                                    </div>

                                    <div className="vert-div predmety__form__div-small__div">
                                      <TextField
                                        name={`${fieldPathPrefix}.value`}
                                        aria-label="Value"
                                        fieldPath={`${fieldPathPrefix}.value`}
                                        label={
                                          <FieldLabel
                                            htmlFor={`${fieldPathPrefix}.value`}
                                            className="predmety__form__div__label"
                                            label="Hodnota"
                                          ></FieldLabel>
                                        }
                                      />
                                    </div>

                                    <div className="vert-div predmety__form__div-small__div predmety__form__div-unit">
                                      <SelectField
                                        name={`${fieldPathPrefix}.unit`}
                                        aria-label="Unit"
                                        fieldPath={`${fieldPathPrefix}.unit`}
                                        options={units}
                                        label={
                                          <FieldLabel
                                            htmlFor={`${fieldPathPrefix}.unit`}
                                            className="predmety__form__div__label"
                                            label="Jednotka"
                                          ></FieldLabel>
                                        }
                                      />
                                    </div>
                                  </div>
                                </ArrayFieldItem>
                              );
                            }}
                          </ArrayField>
                        </div>
                      </div>
                    </AccordionField>
                  </Overridable>
                </div>
              </div>
              <SaveButton title="ULOŽIT" edit={edit} />
            </Grid>
          </>
        )}
      </Formik>
    </Container>
  );
};
