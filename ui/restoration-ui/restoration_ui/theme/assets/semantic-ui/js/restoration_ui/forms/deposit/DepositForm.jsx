import React, { useEffect, useState } from "react";
import _isEmpty from "lodash/isEmpty";
import PropTypes from "prop-types";
import { BaseForm, TextField, FieldLabel } from "react-invenio-forms";
import { Container, Header, Message } from "semantic-ui-react";
import { DepositValidationSchema } from "./DepositValidationSchema";
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

export const DepositForm = () => {
  const { record, formConfig } = useFormConfig();
  const context = formConfig.createUrl
    ? submitContextType.create
    : submitContextType.update;

  // console.log(formConfig)
  // console.log(record)

  const { onSubmit } = useOnSubmit({
    apiUrl: formConfig.createUrl || formConfig.updateUrl,
    context: context,
    onSubmitSuccess: (result) => {
      window.location.href = editMode
        ? currentPath.replace("/edit", "")
        : currentPath.replace("_new", result.id);
    },
    onSubmitError: (error) => {
      console.error("Sumbission failed", error);
    },
  });

  return (
    <Container>
      <Formik
        initialValues={{
          kategorie: "",
          keyword: [],
          description: "",
          restorationMethods: [],
          fabricationTechnology: "",
          materialType: "",
          secondaryMaterialTypes: [],
          color: "",
          dimensions: [{ dimension: "", value: "", unit: "" }],
          archeologic: false,
          creationPeriod: [{ since: "", until: "" }],
          restorationRequestor: "",
          stylePeriod: [{ period: "", startYear: "", endYear: "" }],
          itemType: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log(JSON.stringify(values))
            // alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <>
            <Form className="vert-div predmety__form" onSubmit={handleSubmit}>
              <h3 className="predmety__form__h">Predmet</h3>

              <div className="vert-div predmety__form-main">
                <div className="vert-div predmety__form__div">
                  <div className="vert-div predmety__form__div">
                    <label htmlFor="keyword" className="predmety__form__div__label">
                      Klíčová slova
                    </label>
                    <Field
                      type="text"
                      id="keyword"
                      name="keyword"
                      className="predmety__form__div__input"
                      aria-label="Klíčová slova"
                    />
                  </div>

                  <div className="vert-div predmety__form__div">
                    <label htmlFor="description" className="predmety__form__div__label">
                      Popis
                    </label>
                    <Field
                      type="text"
                      id="description"
                      name="description"
                      className="predmety__form__div__input"
                      aria-label="Popis"
                    />
                  </div>

                  <div className="vert-div predmety__form__div">
                    <label htmlFor="kategorie" className="predmety__form__div__label">
                      Kategorie materialu
                    </label>
                    <div className="horiz-div predmety__form__div__input-radio">
                      <label className="predmety__form__div__label horiz-div">
                        <Field
                          className="predmety__form__div__radio"
                          type="radio"
                          id="kovy"
                          name="kategorie"
                          value="kovy"
                          aria-label="Kovy"
                        />
                        Kovy
                      </label>
                      <label className="predmety__form__div__label horiz-div">
                        <Field
                          className="predmety__form__div__radio"
                          type="radio"
                          id="textil"
                          name="kategorie"
                          value="textil"
                          aria-label="Textil"
                        />
                        Textil
                      </label>
                      <label className="predmety__form__div__label horiz-div">
                        <Field
                         className="predmety__form__div__radio"
                          type="radio"
                          id="keramika"
                          name="kategorie"
                          value="keramika"
                          aria-label="Keramika"
                        />
                        Keramika
                      </label>
                      <label className="predmety__form__div__label horiz-div">
                        <Field
                         className="predmety__form__div__radio"
                          type="radio"
                          id="sklo"
                          name="kategorie"
                          value="sklo"
                          aria-label="Sklo"
                        />
                        Sklo
                      </label>
                    </div>
                  </div>
                  <div className="vert-div predmety__form__div">
                    <div className="vert-div predmety__form__div">
                      <label
                        htmlFor="RestorationMethods"
                       className="predmety__form__div__label"
                      >
                        Metoda restaurace:
                      </label>
                      <VocabularySelectField
                        type={`RestorationMethods?h-parent=${values.kategorie}`}
                        fieldPath="restorationMethods"
                        multiple={true}
                      />
                    </div>

                    <div className="vert-div predmety__form__div">
                      <label
                        htmlFor="fabricationTechnology"
                       className="predmety__form__div__label"
                      >
                        Technologie Fabrikace:
                      </label>
                      <VocabularySelectField
                        name="fabricationTechnology"
                        fieldPath="fabricationTechnology"
                        type={`FabricationTechnologies?h-parent=${values.kategorie}`}
                      />
                    </div>

                    <div className="vert-div predmety__form__div">
                      <label
                        htmlFor="materialType"
                       className="predmety__form__div__label"
                      >
                        Typ Materialu:
                      </label>
                      <VocabularySelectField
                        fieldPath="materialType"
                        type={`MaterialTypes?h-parent=${values.kategorie}`}
                      />
                    </div>
                    <div className="vert-div predmety__form__div">
                      <label
                        htmlFor="secondaryMaterialTypes"
                       className="predmety__form__div__label"
                      >
                        Additional typy Materialu:
                      </label>
                      <VocabularySelectField
                        type={`MaterialTypes?h-parent=${values.kategorie}`}
                        fieldPath="secondaryMaterialTypes"
                        multiple={true}
                      />
                    </div>
                    <div className="vert-div predmety__form__div">
                      <label
                        htmlFor="itemType"
                       className="predmety__form__div__label"
                      >
                        Typ predmetu:
                      </label>
                      <VocabularySelectField
                        type={`ItemTypes?h-parent=${values.kategorie}`}
                        fieldPath="itemType"
                      />
                    </div>
                    <div className="vert-div predmety__form__div">
                      <label htmlFor="color" className="predmety__form__div__label">
                        Barvy:
                      </label>
                      <VocabularySelectField
                        fieldPath="color"
                        type={`Colors`}
                      />
                    </div>

                    <div className="vert-div predmety__form__div">
                      <label className="predmety__form__div__label">Rozmery:</label>

                      <div>
                        <FieldArray name="dimensions">
                          {({ insert, remove, push }) => (
                            <div>
                              {values.dimensions.length > 0 &&
                                values.dimensions.map((dimension, index) => (
                                  <div className="horiz-div" key={index}>
                                    <div className="vert-div predmety__form__div">
                                      <label
                                        htmlFor={`dimensions.${index}.dimension`}
                                       className="predmety__form__div__label"
                                      >
                                        Parametry
                                      </label>
                                      <VocabularySelectField
                                        type={`Dimensions`}
                                        fieldPath={`dimensions.${index}.dimension`}
                                      />
                                    </div>

                                    <div className="vert-div predmety__form__div">
                                      <label
                                        htmlFor={`dimensions.${index}.value`}
                                      >
                                        Value
                                      </label>
                                      <Field
                                        className="predmety__form__div__input"
                                        name={`dimensions.${index}.value`}
                                        placeholder="Value"
                                        type="number"
                                      />
                                      <ErrorMessage
                                        name={`dimensions.${index}.value`}
                                        component="div"
                                        className="field-error"
                                      />
                                    </div>

                                    <div className="vert-div predmety__form__div predmety__form__div-unit">
                                      <label
                                        htmlFor="unit"
                                       className="predmety__form__div__label"
                                      >
                                        Unit:
                                      </label>
                                      <Field
                                        component="select"
                                        name={`dimensions.${index}.unit`}
                                        id="dimensions"
                                        form="dimensions"
                                        className="predmety__form__div__input"
                                      >
                                        <option value="cm">cm</option>
                                        <option value="mm">mm</option>
                                        <option value="metr">metr</option>
                                        <option value="kg">kg</option>
                                        <option value="mg">mg</option>
                                        <option value="gram">gram</option>
                                      </Field>
                                    </div>
                                    <ErrorMessage
                                      name={`dimensions.${index}.unit`}
                                      component="div"
                                      className="field-error"
                                    />

                                    <div className="vert-div">
                                      <button
                                        type="button"
                                        className="secondary"
                                        onClick={() => remove(index)}
                                      >
                                        X
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              <button
                                type="button"
                                className="secondary"
                                onClick={() =>
                                  push({ dimension: "", value: "", unit: "" })
                                }
                              >
                                Add Dimension
                              </button>
                            </div>
                          )}
                        </FieldArray>
                      </div>
                    </div>

                    <div>
                      <FieldArray name="stylePeriod">
                       
                              <div className="horiz-div">
                                <div className="vert-div predmety__form__div">
                                  <label
                                    htmlFor={`stylePeriod[0].period`}
                                   className="predmety__form__div__label"
                                  >
                                    period
                                  </label>
                                  <VocabularySelectField
                                    type={`StylePeriods`}
                                    fieldPath={`stylePeriod[0].period`}
                                  />
                                </div>

                                <div className="vert-div predmety__form__div">
                                  <label htmlFor={`stylePeriod.startYear`}>
                                    StartYear
                                  </label>
                                  <Field
                                    className="predmety__form__div__input"
                                    name={`stylePeriod[0].startYear`}
                                    placeholder="StartYear"
                                    type="year"
                                  />
                                  <ErrorMessage
                                    name={`stylePeriod[0].startYear`}
                                    component="div"
                                    className="field-error"
                                  />
                                </div>

                                <div className="vert-div predmety__form__div">
                                  <label htmlFor={`stylePeriod[0].endYear`}>
                                    End Year
                                  </label>
                                  <Field
                                    className="predmety__form__div__input"
                                    name={`stylePeriod.[0].endYear`}
                                    placeholder="endYear"
                                    type="year"
                                  />
                                  <ErrorMessage
                                    name={`stylePeriod.endYear`}
                                    component="div"
                                    className="field-error"
                                  />
                                </div>
                              </div>
                            
                      </FieldArray>
                    </div>

                    <div className="vert-div predmety__form__div">
                      <label
                        htmlFor="archeologic"
                        className="predmety__form__div__label"
                      >
                        <Field
                          type="checkbox"
                          id="archeologic"
                          name="archeologic"
                          aria-label="Archeologicky nalez"
                        />
                        Archeologicky nalez
                      </label>
                    </div>

                    <div>
                      <FieldArray name="creationPeriod">
                      
                                <div className="horiz-div" >
                                  <div className="vert-div predmety__form__div">
                                    <label htmlFor={`creationPeriod[0].since`}>
                                      Od
                                    </label>
                                    <Field
                                      className="predmety__form__div__input"
                                      name={`creationPeriod[0].since`}
                                      placeholder="Since"
                                      type="date"
                                    />
                                    <ErrorMessage
                                      name={`creationPeriod[0].since`}
                                      component="div"
                                      className="field-error"
                                    />
                                  </div>

                                  <div className="vert-div predmety__form__div">
                                    <label htmlFor={`creationPeriod[0].until`}>
                                      Until
                                    </label>
                                    <Field
                                      className="predmety__form__div__input"
                                      name={`creationPeriod[0].until`}
                                      placeholder="Until"
                                      type="date"
                                    />
                                    <ErrorMessage
                                      name={`creationPeriod[0].until`}
                                      component="div"
                                      className="field-error"
                                    />
                                  </div>
                                </div>
                      </FieldArray>
                    </div>

                    
                    
                    <div className="vert-div predmety__form__div">
                      <label
                        htmlFor="restorationRequestor"
                       className="predmety__form__div__label"
                      >
                        Zadatel restaurace:
                      </label>
                      <VocabularySelectField
                        type={`Institutions`}
                        fieldPath="restorationRequestor"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button
               className="form main-page__btn__addPredmety"
                aria-label="tlacitko ulozeni predmetu"
              >
                Uložit
              </button>
            </Form>

            <Form className="vert-div predmety__form" onSubmit={handleSubmit}>
              <h3 className="predmety__form__h">Vytvoreni noveho predmetu</h3>
              <div className="vert-div predmety__form-main">
                <div className="vert-div predmety__form__div">
                  <label htmlFor="subjectName" className="predmety__form__div__label">
                    Nazev predmetu
                  </label>
                  <Field
                    type="text"
                    id="subjectName"
                    name="subjectName"
                   className="predmety__form__div__input"
                    aria-label="Nazev predmetu"
                  />
                </div>
                <div className="vert-div predmety__form__div">
                  <label htmlFor="fullName" className="predmety__form__div__label">
                    Restauroval(a)
                  </label>
                  <Field
                    type="text"
                    id="fullName"
                    name="fullName"
                   className="predmety__form__div__input"
                    aria-label="Restauroval(a)"
                  />
                </div>
                <div className="vert-div predmety__form__div">
                  <label htmlFor="" className="predmety__form__div__label">
                    Kategorie
                  </label>
                  <div className="horiz-div predmety__form__div__input-radio">
                    <label className="predmety__form__div__label horiz-div">
                      <Field
                       className="predmety__form__div__radio"
                        type="radio"
                        id="Kovy"
                        name="category"
                        value="Kovy"
                        aria-label="Kovy"
                      />
                      Kovy
                    </label>
                    <label className="predmety__form__div__label horiz-div">
                      <Field
                       className="predmety__form__div__radio"
                        type="radio"
                        id="Textil"
                        name="category"
                        value="Textil"
                        aria-label="Textil"
                      />
                      Textil
                    </label>
                    <label className="predmety__form__div__label horiz-div">
                      <Field
                       className="predmety__form__div__radio"
                        type="radio"
                        id="Keramika"
                        name="category"
                        value="Keramika"
                        aria-label="Keramika"
                      />
                      Keramika
                    </label>
                    <label className="predmety__form__div__label horiz-div">
                      <Field
                       className="predmety__form__div__radio"
                        type="radio"
                        id="Sklo"
                        name="category"
                        value="Sklo"
                        aria-label="Sklo"
                      />
                      Sklo
                    </label>
                  </div>
                </div>
              </div>
              <button
               className=" form main-page__btn__addPredmety"
                aria-label="tlacitko vytvoreni predmetu"
              >
                VYTVORIT PREDMET
              </button>
            </Form>
          </>
        )}
      </Formik>
    </Container>
  );
};
