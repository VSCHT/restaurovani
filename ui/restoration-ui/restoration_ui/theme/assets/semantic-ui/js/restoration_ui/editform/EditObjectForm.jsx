import React, {useState} from "react";
import _isEmpty from "lodash/isEmpty";
import {
  AccordionField,
  TextField,
  FieldLabel,
  SelectField,
  BooleanField,
  ArrayField,
  TextAreaField,
  MultiInput,
  RichInputField,
} from "react-invenio-forms";

import { Container, Grid, Form } from "semantic-ui-react";
import { DepositValidationSchemaEdit } from "../forms/deposit/DepositValidationSchema";
import {
  useFormConfig,
  ArrayFieldItem,
} from "@js/oarepo_ui";
import { FieldArray, Formik } from "formik";
import { LocalVocabularySelectField } from "@js/oarepo_vocabularies";
import _get from "lodash/get";
import Overridable from "react-overridable";
import { SaveButton } from "../forms/components/";



const units = [
  { value: "kg", text: "kg" },
  { value: "mg", text: "mg" },
  { value: "cm", text: "cm" },
  { value: "metr", text: "metr" },
  { value: "mm", text: "mm" },
];


export const EditObjectForm = ({ edit }) => {
  const { record } = useFormConfig();

  const [activeIndex, setActiveIndex]= useState(0)
  const handleActive = ( x, values) => {
console.log(values)
    setActiveIndex(x)
  }

 const initialValues = {
  ...record,
  metadata: {
    restorationObject: {
      parts: [{ main: true }]
    }
  }
};

  console.log(record);
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
        
            <Grid className="vert-div predmety__form">
              <div>
                <h3 className="predmety__form__h">
                  Editace předmětu &nbsp;
                  {values.metadata.restorationObject.title}
                </h3>
              </div>

              <div className="vert-div predmety__form-main">
                <div className="vert-div predmety__form__div-fields">
                
                  <Overridable id="Deposit.AccordionFieldBasicInformation.container">
                    <AccordionField
                      includesPaths={[
                        "metadata.restorationObject.itemTypes",
                        "metadata.restorationObject.dimensions",
                        "metadata.restorationObject.description",
                        "metadata.restorationObject.title",
                        "metadata.restorationObject.archeologic",
                        "metadata.restorationObject.keywords",
                        "metadata.restorationObject.stylePeriod.endYear",
                        "metadata.restorationObject.stylePeriod.startYear",
                        "metadata.restorationObject.restorationRequestor"
                      ]}
                      
                      label="Udaje"
                      active={activeIndex === 0}
                      defaultActiveIndex={0}
                      onClick={()=>handleActive(0, values)}
                    >
                      <div className="vert-div predmety__form__div-fields">
                        <div className="vert-div predmety__form__div">
                          <TextField
                            name="metadata.restorationObject.title"
                            className="form__input"
                            aria-label="Název předmětu"
                            fieldPath="metadata.restorationObject.title"
                            required
                            label={
                              <FieldLabel
                                htmlFor="metadata.restorationObject.title"
                                className="predmety__form__div__label"
                                label="Název předmětu"
                               
                              />
                            }
                          />
                        </div>

                        {/* <KeyWordsInput fieldPath="metadata.restorationObject.keywords" /> */}
                        <div className="vert-div predmety__form__div">
                          <MultiInput
                            fieldPath="metadata.restorationObject.keywords"
                            label="Klíčová slova"
                            placeholder="Napište klíčová slova..."
                            required={false}
                            disabled={false}
                          />
                        </div>
                        <div className="vert-div predmety__form__div">
                          <TextAreaField
                            name="metadata.restorationObject.description"
                            aria-label="Popis"
                            fieldPath="metadata.restorationObject.description"
                            label={
                              <FieldLabel
                                htmlFor="metadata.restorationObject.description"
                                className="predmety__form__div__label"
                                label="Popis"
                              ></FieldLabel>
                            }
                          />
                        </div>

                        <div className="vert-div predmety__form__div">
                          <LocalVocabularySelectField
                            optionsListName="ItemTypes"
                            fieldPath="metadata.restorationObject.itemTypes"
                            multiple={true}
                            placeholder="Vyberte typ předmětu"
                            label={
                              <FieldLabel
                                htmlFor="metadata.restorationObject.itemTypes"
                                label="Typ předmětu"
                                className="predmety__form__div__label"
                              />
                            }
                          />
                         
                        </div>
                        <div>
                          <FieldArray name="stylePeriod">
                            <div className="horiz-div predmety__form__div">
                              {/* <LocalVocabularySelectField
                                  optionsListName="StylePeriods"
                                  fieldPath="metadata.restorationObject.stylePeriod.properties.period"
                                  clearable
                                  placeholder="Napište období"
                                  label={
                                    <FieldLabel
                                      htmlFor={
                                        "metadata.restorationObject.stylePeriod.properties.period"
                                      }
                                      label="Období"
                                      className="predmety__form__div__label"
                                    />
                                  }
                                /> */}

                              <div className="vert-div predmety__form__div-medium">
                                <TextField
                                  name="metadata.restorationObject.stylePeriod.startYear"
                                  aria-label="Počateční rok"
                                  fieldPath="metadata.restorationObject.stylePeriod.startYear"
                                  placeholder="Počateční rok"
                                  label={
                                    <FieldLabel
                                      htmlFor="metadata.restorationObject.stylePeriod.startYear"
                                      className="predmety__form__div__label"
                                      label="Počateční rok"
                                    ></FieldLabel>
                                  }
                                />
                              </div>
                              <div className="vert-div predmety__form__div-medium">
                                <TextField
                                  name="metadata.restorationObject.stylePeriod.endYear"
                                  aria-label="Končící rok"
                                  fieldPath="metadata.restorationObject.stylePeriod.endYear"
                                  placeholder="Končící rok"
                                  label={
                                    <FieldLabel
                                      htmlFor="metadata.restorationObject.stylePeriod.endYear"
                                      className="predmety__form__div__label"
                                      label="Končící rok"
                                    ></FieldLabel>
                                  }
                                />
                              </div>
                            </div>
                          </FieldArray>
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
                                        placeholder="Rozměr"
                                        fieldPath={`${fieldPathPrefix}.dimension`}
                                        clearable
                                        label={
                                          <FieldLabel
                                            htmlFor={`${fieldPathPrefix}.dimension.title`}
                                            label="Rozměr"
                                            className="predmety__form__div__label"
                                          />
                                        }
                                      />
                                    </div>

                                    <div className="vert-div predmety__form__div-small__div">
                                      <TextField
                                        name={`${fieldPathPrefix}.value`}
                                        aria-label="Value"
                                        fieldPath={`${fieldPathPrefix}.value`}
                                        placeholder="Napište hodnotu"
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
                                        placeholder="Jednotka"
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
                        <div className="vert-div predmety__form__div predmety__form__div-checkbox">
                          <Form.Field>
                            <BooleanField
                            optimized='false'
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
                        <div className="vert-div predmety__form__div">
                          <LocalVocabularySelectField
                            fieldPath="metadata.restorationObject.restorationRequestor"
                            multiple={false}
                            optionsListName="Requestors"
                            placeholder="Vyberte zadavatele"
                            clearable
                            label={
                              <FieldLabel
                                htmlFor={
                                  "metadata.restorationObject.restorationRequestor"
                                }
                                label="Zadavatel"
                                className="predmety__form__div__label"
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
                        "metadata.restorationObject.restorationMethods",
                        "metadata.restorationWork.workType",
                        "metadata.restorationWork.examinationMethods",
                        "metadata.restorationWork.restorer",
                        "metadata.restorationWork.abstract[0].value",
                        "metadata.restorationWork.literature[0].value",
                        "metadata.restorationWork.restorationPeriod",
                        "metadata.restorationWork.supervisors"
                      ]}
                      label="Práce"
                      active={activeIndex === 1}
                      defaultActiveIndex={1}
                      onClick={()=>handleActive(1)}
                    >
                      <div className="vert-div predmety__form__div-fields">
                        <div className="vert-div predmety__form__div">
                          <TextField
                            name="metadata.restorationWork.restorer"
                            aria-label="Restauroval(a)"
                            fieldPath="metadata.restorationWork.restorer"
                            className="form__input"
                            label={
                              <FieldLabel
                                htmlFor="metadata.restorationWork.restorer"
                                className="predmety__form__div__label"
                                label="Restauroval(a)"
                              />
                            }
                          />
                        </div>
                        <div className="vert-div predmety__form__div">
                          {/*  <TextAreaField
                            name="metadata.restorationWork.abstract[0].value"
                            aria-label="Popis restaurování"
                            fieldPath="metadata.restorationWork.abstract[0].value"
                            label={
                              <FieldLabel
                                htmlFor="metadata.restorationWork.abstract[0].value"
                                className="predmety__form__div__label"
                                label="Popis restaurování"
                              ></FieldLabel>
                            }
                          /> */}
                          <RichInputField
                            name="metadata.restorationWork.abstract[0].value"
                            aria-label="Popis restaurování"
                            fieldPath="metadata.restorationWork.abstract[0].value"
                            label={
                              <FieldLabel
                                htmlFor="metadata.restorationWork.abstract[0].value"
                                className="predmety__form__div__label"
                                label="Popis restaurování"
                              ></FieldLabel>
                            }
                          ></RichInputField>
                        </div>
                        <div className="vert-div predmety__form__div">
                          <TextAreaField
                            name="metadata.restorationWork.literature[0].value"
                            aria-label="Použitá literatura"
                            fieldPath="metadata.restorationWork.literature[0].value"
                            label={
                              <FieldLabel
                                htmlFor="metadata.restorationWork.literature[0].value"
                                className="predmety__form__div__label"
                                label="Použitá literatura"
                              ></FieldLabel>
                            }
                          />
                        </div>
                        <div className="vert-div predmety__form__div">
                          <ArrayField
                            addButtonLabel="Přidat vedoucího"
                            fieldPath="metadata.restorationWork.supervisors"
                            defaultNewValue={{}}
                          >
                            {({ arrayHelpers, indexPath }) => {
                              const fieldPathPrefix = `${"metadata.restorationWork.supervisors"}[${indexPath}]`;
                              return (
                                
                                  <ArrayFieldItem
                                    name="metadata.restorationWork.supervisors"
                                    fieldPath="metadata.restorationWork.supervisors"
                                    indexPath={indexPath}
                                    arrayHelpers={arrayHelpers}
                                  >
                                    <div className="vert-div predmety__form__div-fields__parts">
                                      {/* <div className="vert-div predmety__form__div-fields"> */}
                                      <h4>Vedoucí N{indexPath + 1}</h4>

                                      <div className="vert-div">
                                        <div className="horiz-div predmety__form__div-small">
                                          {/* <div className="vert-div predmety__form__div-medium">
                                            <TextField
                                              name={`${fieldPathPrefix}.sisCode`}
                                              aria-label="sisCode"
                                              fieldPath={`${fieldPathPrefix}.sisCode`}
                                              placeholder="SisCode"
                                              label={
                                                <FieldLabel
                                                  htmlFor={`${fieldPathPrefix}.sisCode`}
                                                  className="predmety__form__div__label"
                                                  label="sisCode"
                                                ></FieldLabel>
                                              }
                                            />
                                          </div> */}

                                          <div className="vert-div predmety__form__div-medium">
                                            <TextField
                                              name={`${fieldPathPrefix}.fullName`}
                                              aria-label="Celé jméno"
                                              fieldPath={`${fieldPathPrefix}.fullName`}
                                              placeholder="Napište celé jméno"
                                              label={
                                                <FieldLabel
                                                  htmlFor={`${fieldPathPrefix}.fullName`}
                                                  className="predmety__form__div__label"
                                                  label="Celé jméno"
                                                ></FieldLabel>
                                              }
                                            />
                                          </div>
                                        </div>
                                        <div className="horiz-div predmety__form__div-small">
                                          <div className="vert-div predmety__form__div-medium">
                                            <TextField
                                              name={`${fieldPathPrefix}.comment`}
                                              aria-label="Komentář"
                                              fieldPath={`${fieldPathPrefix}.comment`}
                                              placeholder="Komentář"
                                              label={
                                                <FieldLabel
                                                  htmlFor={`${fieldPathPrefix}.comment`}
                                                  className="predmety__form__div__label"
                                                  label="Komentář"
                                                ></FieldLabel>
                                              }
                                            />
                                          </div>
                                          <div className="vert-div predmety__form__div-medium">
                                            <TextField
                                              name={`${fieldPathPrefix}.institution`}
                                              aria-label="Institut"
                                              fieldPath={`${fieldPathPrefix}.institution`}
                                              placeholder="Institut"
                                              label={
                                                <FieldLabel
                                                  htmlFor={`${fieldPathPrefix}.institution`}
                                                  className="predmety__form__div__label"
                                                  label="Institut"
                                                ></FieldLabel>
                                              }
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    {/* </div> */}
                                  </ArrayFieldItem>
                                
                              );
                            }}
                          </ArrayField>
                        </div>
                        {/* <div className="vert-div predmety__form__div">
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
                                className="predmety__form__div__label"
                              />
                            }
                          />
                        </div> */}

                        <FieldArray name="metadata.restorationWork.restorationPeriod">
                          <div className="horiz-div predmety__form__div-small">
                            <div className="vert-div predmety__form__div-medium">
                              <TextField
                                name="metadata.restorationWork.restorationPeriod.since"
                                aria-label="Od"
                                placeholder="Napište období"
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
                                placeholder="Napište období"
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
                            fieldPath="metadata.restorationWork.workType"
                            multiple={false}
                            optionsListName="WorkTypes"
                            placeholder="Vyberte typ práce"
                            clearable
                            label={
                              <FieldLabel
                                htmlFor={"metadata.restorationWork.workType"}
                                label="Typ práce"
                                className="predmety__form__div__label"
                              />
                            }
                          />
                        </div>
                        <div className="vert-div predmety__form__div">
                          <LocalVocabularySelectField
                            fieldPath="metadata.restorationWork.examinationMethods"
                            multiple={true}
                            optionsListName="ExaminationMethods"
                            placeholder="Vyberte metody zkoumání"
                            clearable
                            label={
                              <FieldLabel
                                htmlFor={
                                  "metadata.restorationWork.examinationMethods"
                                }
                                label="Metody zkoumání"
                                className="predmety__form__div__label"
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
                      includesPaths={["metadata.restorationObject.parts"]}
                      label="Součásti"
                      active={activeIndex === 2}
                      defaultActiveIndex={2}
                      onClick={()=>handleActive(2)}
                    >
                      <ArrayField
                        fieldPath="metadata.restorationObject.parts"
                        defaultNewValue={{}}
                        addButtonLabel="Dodat součást"
                      >
                        {({ arrayHelpers, indexPath }) => {
                          const fieldPathPrefix = `metadata.restorationObject.parts[${indexPath}]`;
                          return (
                            <ArrayFieldItem
                              name="metadata.restorationObject.parts"
                              fieldPath="metadata.restorationObject.parts"
                              indexPath={indexPath}
                              arrayHelpers={arrayHelpers}
                            >
                              <div className="vert-div predmety__form__div-fields__parts">
                                <div className="vert-div predmety__form__div-fields">
                                  <h3>
                                    Součást &nbsp;
                                    {values.metadata?.restorationObject
                                      ?.parts?.[indexPath]?.name == null
                                      ? indexPath + 1
                                      : values.metadata.restorationObject.parts[
                                          indexPath
                                        ].name[0].value}
                                  </h3>
                                  <div className="vert-div predmety__form__div">
                                    {/* <TextField
                                      name={`${fieldPathPrefix}.name${0}.value`}
                                      className="form__input"
                                      placeholder="Název součásti"
                                      aria-label="Název součásti"
                                      onChange={(e) =>
                                        setPartName(e.target.value)
                                      }
                                      fieldPath={`${fieldPathPrefix}.name${0}.value`}
                                      required
                                      label={
                                        <FieldLabel
                                          htmlFor={`${fieldPathPrefix}.name${0}.value`}
                                          className="predmety__form__div__label"
                                          label="Název součásti"
                                        />
                                      }
                                    /> */}
                                    {/* <MultilingualTextInput
                                      fieldPath={`${fieldPathPrefix}.name`}
                                      addButtonLabel="Dodat název"
                                      textFieldLabel="Název"
                                    /> */}
                                    <TextField
                                      fieldPath={`${fieldPathPrefix}.name.value`}
                                      className="form__input"
                                      label={
                                        <FieldLabel
                                          htmlFor={`${fieldPathPrefix}.name.value`}
                                          className="predmety__form__div__label"
                                          label="Název"
                                        />
                                      }
                                      required
                                    />
                                  </div>
                                  <div className="vert-div predmety__form__div predmety__form__div-checkbox">
                                    <Form.Field>
                                      <BooleanField
                                        name={`${fieldPathPrefix}.main`}
                                        aria-label="Hlávní součást"
                                        fieldPath={`${fieldPathPrefix}.main`}
                                        label={
                                          <FieldLabel
                                            htmlFor={`${fieldPathPrefix}.main`}
                                            className="predmety__form__div__label"
                                            label="Hlávní součást"
                                          ></FieldLabel>
                                        }
                                      />
                                    </Form.Field>
                                  </div>
                                  <div className="vert-div predmety__form__div">
                                    <LocalVocabularySelectField
                                      optionsListName="Colors"
                                      fieldPath={`${fieldPathPrefix}.colors`}
                                      multiple={true}
                                      clearable
                                      label={
                                        <FieldLabel
                                          htmlFor={`${fieldPathPrefix}.colors`}
                                          label="Barva"
                                          className="predmety__form__div__label"
                                        />
                                      }
                                      placeholder="Vyberte barvu"
                                    />
                                  </div>
                                  <div className="vert-div predmety__form__div">
                                    <LocalVocabularySelectField
                                      optionsListName="FabricationTechnologies"
                                      fieldPath={`${fieldPathPrefix}.fabricationTechnologies`}
                                      placeholder="Vyberte technologie výroby"
                                      multiple={true}
                                      clearable
                                      label={
                                        <FieldLabel
                                          htmlFor={`${fieldPathPrefix}.fabricationTechnologies`}
                                          label="Technologie výroby"
                                          className="predmety__form__div__label"
                                        />
                                      }
                                    />
                                  </div>

                                  <div className="vert-div predmety__form__div">
                                    <LocalVocabularySelectField
                                      optionsListName="MaterialTypes"
                                      fieldPath={`${fieldPathPrefix}.materialType`}
                                      multiple={false}
                                      clearable
                                      placeholder="Vyberte typy materiálů"
                                      label={
                                        <FieldLabel
                                          htmlFor={`${fieldPathPrefix}.materialType`}
                                          label="Typ materiálů"
                                          className="predmety__form__div__label"
                                        />
                                      }
                                    />
                                  </div>
                                  <div className="vert-div predmety__form__div">
                                    <LocalVocabularySelectField
                                      optionsListName="MaterialTypes"
                                      fieldPath={`${fieldPathPrefix}.secondaryMaterialTypes`}
                                      multiple={true}
                                      clearable
                                      placeholder="Vyberte vedlejší typy materiálů"
                                      label={
                                        <FieldLabel
                                          htmlFor={`${fieldPathPrefix}.secondaryMaterialTypes`}
                                          label="Vedlejší typy materiálů"
                                          className="predmety__form__div__label"
                                        />
                                      }
                                    />
                                  </div>
                                  <div className="vert-div predmety__form__div">
                                    <LocalVocabularySelectField
                                      optionsListName="RestorationMethods"
                                      fieldPath={`metadata.restorationWork.parts.${indexPath}.restorationMethods`}
                                      multiple={true}
                                      placeholder="Vyberte metody restaurování"
                                      clearable
                                      label={
                                        <FieldLabel
                                          htmlFor={`metadata.restorationWork.parts[${indexPath}].restorationMethods`}
                                          label="Metody restaurování"
                                          className="predmety__form__div__label"
                                        />
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </ArrayFieldItem>
                          );
                        }}
                      </ArrayField>
                    </AccordionField>
                  </Overridable>
                </div>
              </div>
              <SaveButton title="ULOŽIT" edit={edit} />
            </Grid>
         
        )}
      </Formik>
    </Container>
  );
};
