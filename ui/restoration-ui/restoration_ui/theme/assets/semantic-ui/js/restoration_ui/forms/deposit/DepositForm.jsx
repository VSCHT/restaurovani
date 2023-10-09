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
  ToggleField,
  ArrayField,
} from "react-invenio-forms";

import {
  Container,
  Header,
  Message,
  Radio,
  Button,
  Grid,
  Label,
  Form,
} from "semantic-ui-react";
import {
  DepositValidationSchemaEdit,
  DepositValidationSchemaDraft,
} from "./DepositValidationSchema";
import {
  useFormConfig,
  useOnSubmit,
  submitContextType,
  ArrayFieldItem,
} from "@js/oarepo_ui";
import {
  Formik,
  useFormikContext,
  Field,
  FieldArray,
  ErrorMessage,
} from "formik";
import {
  VocabularySelectField,
  LocalVocabularySelectField,
} from "@js/oarepo_vocabularies";
import _get from "lodash/get";
import Overridable from "react-overridable";
import { i18next } from "@translations/restoration_ui/i18next";
import { useDepositApiClient } from "@js/oarepo_ui";
import { SaveButton , KeyWordsInput} from "../components";

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
  { value: "sklo", label: "Sklo" },
  { value: "keramika", label: "Keramika" },
  { value: "kovy", label: "Kovy" },
  { value: "textil", label: "Textil" },
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
        {record.metadata !== null ? (
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
              label={"Zakladni informace"}
            >
              <Grid className="vert-div predmety__form">
                <div>
                  <h3 className="predmety__form__h">Editace předmětu</h3>
                </div>
                <div className="vert-div predmety__form-main">
                <div className="vert-div predmety__form__div-fields">
                <KeyWordsInput fieldPath="metadata.restorationObject.keywords" />
                    

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
                        <LocalVocabularySelectField
                          optionsListName="RestorationMethods"
                          fieldPath="metadata.restorationWork.restorationMethods"
                          multiple={true}
                          placeholder={"Vyberte metody restaurování"}
                          clearable
                          label={
                            <FieldLabel
                              htmlFor={
                                "metadata.restorationWork.restorationMethods"
                              }
                              label={"Metody restaurování"}
                            />
                          }
                        />
                      </div>

                      <div className="vert-div predmety__form__div">
                        <LocalVocabularySelectField
                          optionsListName="FabricationTechnologies"
                          fieldPath="metadata.fabricationTechnology"
                          placeholder={"Vyberte technologie výroby"}
                          value={
                            record.metadata?.restorationWork?.fabricationMethods
                              ?.id
                          }
                          multiple={false}
                          clearable
                          label={
                            <FieldLabel
                              htmlFor={"metadata.fabricationTechnology"}
                              label={"Technologie výroby"}
                            />
                          }
                        />
                      </div>

                      <div className="vert-div predmety__form__div">
                        <LocalVocabularySelectField
                          optionsListName="MaterialTypes"
                          fieldPath="metadata.materialType"
                          multiple={false}
                          clearable
                          placeholder={"Vyberte typy materiálů"}
                          label={
                            <FieldLabel
                              htmlFor={"metadata.materialType"}
                              label={"Typy materiálů"}
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
                          placeholder={"Vyberte vedlejší typy materiálů"}
                          label={
                            <FieldLabel
                              htmlFor={"metadata.secondaryMaterialTypes"}
                              label={"Vedlejší typy materiálů"}
                            />
                          }
                        />
                      </div>

                      <div className="vert-div predmety__form__div">
                        <LocalVocabularySelectField
                          optionsListName="ItemTypes"
                          fieldPath="metadata.restorationObject.itemTypes"
                          multiple={false}
                          placeholder={"Vyberte typ předmětu"}
                          clearable
                          label={
                            <FieldLabel
                              htmlFor={"metadata.restorationObject.itemTypes"}
                              label={"Typ předmětu"}
                            />
                          }
                        />
                      </div>
                      <div className="vert-div predmety__form__div">
                        <LocalVocabularySelectField
                          optionsListName="Colors"
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

                      <div className="vert-div predmety__form__div-dimensions">
                        <ArrayField
                          addButtonLabel={"Přidat rozměr"}
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
                                          label={"Rozměr"}
                                        />
                                      }
                                    />
                                  </div>

                                  <div className="vert-div predmety__form__div-small__div">
                                    <TextField
                                      name={`${fieldPathPrefix}.value`}
                                      aria-label="Value"
                                      fieldPath={`${fieldPathPrefix}.value`}
                                      value={
                                        record.metadata?.restorationObject
                                          ?.dimensions?.[indexPath]?.value
                                      }
                                      label={
                                        <FieldLabel
                                          htmlFor={`${fieldPathPrefix}.value`}
                                          className="predmety__form__div__label"
                                          label={"Hodnota"}
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
                                      value={
                                        record.metadata?.restorationObject
                                          ?.dimensions?.[indexPath]?.unit
                                      }
                                      label={
                                        <FieldLabel
                                          htmlFor={`${fieldPathPrefix}.unit`}
                                          className="predmety__form__div__label"
                                          label={"Jednotka"}
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
                                    label={"Období"}
                                  />
                                }
                              />
                            </div>
                          </div>
                        </FieldArray>
                      </div>

                      <div className="vert-div predmety__form__div predmety__form__div-checkbox">
                        <BooleanField
                          name="metadata.restorationObject.archeologic"
                          aria-label="Archeologický nález"
                          fieldPath="metadata.restorationObject.archeologic"
                          value={
                            record.metadata?.restorationObject?.archeologic
                          }
                          label={
                            <FieldLabel
                              htmlFor="metadata.restorationObject.archeologic"
                              className="predmety__form__div__label"
                              label={"Archeologický nález"}
                            ></FieldLabel>
                          }
                        />
                      </div>

                      <div>
                        <FieldArray name="metadata.restorationWork.restorationPeriod">
                          <div className="horiz-div predmety__form__div-small">
                            <div className="vert-div predmety__form__div-medium">
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
                                    label={"Období restaurování od"}
                                  ></FieldLabel>
                                }
                              />
                            </div>

                            <div className="vert-div predmety__form__div-medium">
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
                                    label={"Období restaurování do"}
                                  ></FieldLabel>
                                }
                              />
                            </div>
                          </div>
                        </FieldArray>
                      </div>

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
                              label={"Zadavatel"}
                            />
                          }
                        />
                      </div>
                    
                  </div>
                </div>
                <SaveButton title={"ULOŽIT ZMĚNY"} />
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
          validateOnBlur: true,
          enableReinitialize: true,
          validationSchema: DepositValidationSchemaDraft,
        }}
      >
        {record.metadata == null ? (
          <Overridable id="Deposit.AccordionFieldBasicInformation.container">
            <AccordionField
              includesPaths={[
                "metadata.restorationWork.restorer",
                "metadata.restorationObject.title[0].value",
                "metadata.restorationObject.category",
              ]}
              active
              label={"Základní informace"}
            >
              <div className="vert-div predmety__form">
                <h3 className="predmety__form__h">Vytvoření nového předmětu</h3>
                <div className="vert-div predmety__form-main">
                  <div className="vert-div predmety__form__div">
                    <TextField
                      name="metadata.restorationObject.title[0].value"
                      aria-label="Název předmětu"
                      fieldPath="metadata.restorationObject.title[0].value"
                      required
                      label={
                        <FieldLabel
                          htmlFor="metadata.restorationObject.title[0].value"
                          className="predmety__form__div__label"
                          label={"Název předmětu"}
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
                    <Form>
                      <Label
                        for="metadata.restorationObject.category"
                        className="predmety__form__div__label"
                        required
                      >
                        Kategorie
                      </Label>
                      <Form.Group
                        className="horiz-div predmety__form__div__input-radio"
                        fieldPath="metadata.restorationObject.category"
                        name="metadata.restorationObject.category"
                      >
                        {categories.map((option) => (
                          <div className="predmety__form__div__label horiz-div">
                            <Form.Field
                              key={option.value}
                              fieldPath="metadata.restorationObject.category"
                              name="metadata.restorationObject.category"
                            >
                              <Radio
                                label={option.label}
                                className="predmety__form__div__radio"
                                checked={selectedRadio === option.value}
                                onChange={() => handleRadio(option.value)}
                                fieldPath="metadata.restorationObject.category"
                                name="metadata.restorationObject.category"
                              />
                            </Form.Field>
                          </div>
                        ))}
                      </Form.Group>
                    </Form>
                  </div>

                  {/* <div className="vert-div predmety__form__div">
                    <Form>
                      <Label
                        for="metadata.restorationObject.category"
                        className="predmety__form__div__label"
                        required
                      >
                        Kategorie
                      </Label>
                      <Field
                        type="radio"
                        name="metadata.restorationObject.category"
                      >
                        {({ field }) => (
                          <>
                            {categories.map((option) => (
                              <div
                                className="predmety__form__div__label horiz-div"
                                key={option.value}
                              >
                                <input
                                  type="radio"
                                  id={option.value}
                                  {...field}
                                  value={option.value}
                                  checked={field.value === option.value}
                                  onChange={() => field.onChange(option.value)}
                                  className="predmety__form__div__radio"
                                />
                                <label htmlFor={option.value}>
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </>
                        )}
                      </Field>
                    </Form>
                  </div> */}
                </div>
                <SaveButton />
              </div>
            </AccordionField>
          </Overridable>
        ) : null}
      </BaseForm>
    </Container>
  );
};
