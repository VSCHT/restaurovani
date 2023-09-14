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


const inputStyles={
  'borderRadius': '1px solid #555',
   'border': '40px'
}
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

  console.log(formConfig)
  console.log(record)

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
          category: "",
          keyword: [],
          description: "",
          restorationMethods: [],
          fabricationTechnology: "",
          materialType: "",
          secondaryMaterialTypes: [],
          color: "",
          dimensions: [{ dimension: {id:'', title: {}}, value: "", unit: "" }],
          archeologic: false,
          creationPeriod: { since: "", until: "" },
          restorationRequestor: {id:'', title: {}},
          stylePeriod: { period: {id:'', title: {}}, startYear: "", endYear: "" },
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
                    <label htmlFor="category" className="predmety__form__div__label">
                      Kategorie materialu
                    </label>
                    <div className="horiz-div predmety__form__div__input-radio">
                      <label className="predmety__form__div__label horiz-div">
                        <Field
                          className="predmety__form__div__radio"
                          type="radio"
                          id="kovy"
                          name="category"
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
                          name="category"
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
                          name="category"
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
                          name="category"
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
                        type={`RestorationMethods?h-parent=${values.category}`}
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
                        type={`FabricationTechnologies?h-parent=${values.category}`}
                      />
                    </div>

                    <div className="vert-div predmety__form__div">
                      <label
                        htmlFor="materialType"
                       className="predmety__form__div__label"
                      >
                        Typy Materialu:
                      </label>
                      <VocabularySelectField
                        fieldPath="materialType"
                        type={`MaterialTypes?h-parent=${values.category}`}
                      />
                    </div>
                    <div className="vert-div predmety__form__div">
                      <label
                        htmlFor="secondaryMaterialTypes"
                       className="predmety__form__div__label"
                      >
                        Vedlejší typy materiálu:
                      </label>
                      <VocabularySelectField
                        type={`MaterialTypes?h-parent=${values.category}`}
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
                        type={`ItemTypes?h-parent=${values.category}`}
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
                     
                        <FieldArray name="dimensions">
                          {({ insert, remove, push }) => (
                            <div>
                              {values.dimensions.length > 0 &&
                                values.dimensions.map((dimension, index) => (
                                  
                                  <div className="horiz-div predmety__form__div" key={index}>
                                    <div className="horiz-div predmety__form__div-small">
                                    <div className="vert-div predmety__form__div-small__div">
                                      <label
                                        htmlFor={`dimensions.${index}.dimension`}
                                       className="predmety__form__div__label"
                                      >
                                        Parametry
                                      </label>
                                      <VocabularySelectField
                                        type={`Dimensions`}
                                        fieldPath={`dimensions.${index}.dimension.id`}
                                      />
                                    </div>

                                    <div className="vert-div predmety__form__div-small__div">
                                      <label className="predmety__form__div__label"
                                        htmlFor={`dimensions.${index}.value`}
                                      >
                                        Value
                                      </label>
                                      <Field
                                        className="predmety__form__div__input predmety__form__div__input-small"
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

                                    <div className="vert-div predmety__form__div-small__div predmety__form__div-unit">
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
                                        className="predmety__form__div__input predmety__form__div__input-small"
                                      >
                                        <option value="cm">cm</option>
                                        <option value="mm">mm</option>
                                        <option value="metr">metr</option>
                                        <option value="kg">kg</option>
                                        <option value="mg">mg</option>
                                        <option value="gram">gram</option>
                                      </Field>
                                    
                                    <ErrorMessage
                                      name={`dimensions.${index}.unit`}
                                      component="div"
                                      className="field-error"
                                    />
                                    </div>
                                    </div>
                                    <div className="vert-div">
                                      <button
                                        type="button"
                                        className="predmety__form__div__button-small predmety__form__div__button-small-delete"
                                        onClick={() => remove(index)}
                                      >
                                        x
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              <button
                                type="button"
                                className="predmety__form__div__button-small"
                                onClick={() =>
                                  push({ dimension: {id:'', title:{}}, value: "", unit: "" })
                                }
                              >
                                Dodat
                              </button>
                            </div>
                          )}
                        </FieldArray>
                      
                    </div>

                    <div>
                      <FieldArray name="stylePeriod">
                       
                              <div className="horiz-div predmety__form__div-small">
                                <div className="vert-div predmety__form__div">
                                  <label
                                    htmlFor={`stylePeriod.period`}
                                   className="predmety__form__div__label"
                                  >
                                    Perioda
                                  </label>
                                  <VocabularySelectField
                                    type={`StylePeriods`}
                                    fieldPath={`stylePeriod.period.id`}
                                  />
                                </div>

                                <div className="vert-div predmety__form__div">
                                  <label className="predmety__form__div__label" htmlFor={`stylePeriod.startYear`}>
                                    Počáteční rok
                                  </label>
                                  <Field
                                    className="predmety__form__div__input predmety__form__div__input-small"
                                    name={`stylePeriod.startYear`}
                                    placeholder="StartYear"
                                    type="year"
                                  />
                                  <ErrorMessage
                                    name={`stylePeriod.startYear`}
                                    component="div"
                                    className="field-error"
                                  />
                                </div>

                                <div className="vert-div predmety__form__div">
                                  <label htmlFor={`stylePeriod.endYear`}>
                                    Končicí rok
                                  </label>
                                  <Field
                                    className="predmety__form__div__input predmety__form__div__input-small"
                                    name={`stylePeriod.endYear`}
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

                    <div className="vert-div predmety__form__div predmety__form__div">
                      <label
                        htmlFor="archeologic"
                        className="horiz-div predmety__form__div__label predmety__form__div__checkbox"
                      >
                        <Field
                          type="checkbox"
                          id="archeologic"
                          name="archeologic"
                          aria-label="Archeologicky nalez"
                        />
                        Archeologicky nález
                      </label>
                    </div>

                    <div>
                      <FieldArray name="creationPeriod">
                      
                                <div className="horiz-div predmety__form__div-small" >
                                  <div className="vert-div predmety__form__div">
                                    <label className="predmety__form__div__label"
                                    htmlFor={`creationPeriod.since`}>
                                      Od
                                    </label>
                                    <Field
                                      className="predmety__form__div__input"
                                      name={`creationPeriod.since`}
                                      placeholder="Since"
                                      type="date"
                                    />
                                    <ErrorMessage
                                      name={`creationPeriod.since`}
                                      component="div"
                                      className="field-error"
                                    />
                                  </div>

                                  <div className="vert-div predmety__form__div">
                                    <label className="predmety__form__div__label"
                                    htmlFor={`creationPeriod.until`}>
                                      Do
                                    </label>
                                    <Field
                                      className="predmety__form__div__input"
                                      name={`creationPeriod.until`}
                                      placeholder="Until"
                                      type="date"
                                    />
                                    <ErrorMessage
                                      name={`creationPeriod.until`}
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
                        Žadatel restaurace:
                      </label>
                      <VocabularySelectField
                        type={`Institutions`}
                        fieldPath="restorationRequestor.id"
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
                    Název předmětu
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
                VÝTVOŘIT PŘEDMĚT
              </button>
            </Form>
          </>
        )}
      </Formik>
    </Container>
  );
};
