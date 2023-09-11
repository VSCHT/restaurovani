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
          keywords: [],
          popis: "",
          restorationMethods: [],
          fabricationTechnology: "",
          materialType: "",
          secondaryMaterialTypes: "",
          dimensions: [{ dimension: "", value: "", unit: "" }],
          archeologic: false,
          creationPeriod: [{ since: "", until: "" }],
          restorationRequestor: "",
          stylePeriod: [{ period: "", startYear: "", endYear: "" }],
          itemType: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
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
            <Form class="vert-div predmety__form" onSubmit={handleSubmit}>
              <h3 class="predmety__form__h">Predmet</h3>

              <div class="vert-div predmety__form-main">
                <div class="vert-div predmety__form__div">
                  <div class="vert-div predmety__form__div">
                    <label for="description" class="predmety__form__div__label">
                      Klíčová slova
                    </label>
                    <Field
                      type="text"
                      id="keywords"
                      name="keywords"
                      class="predmety__form__div__input"
                      aria-label="Klíčová slova"
                    />
                  </div>

                  <div class="vert-div predmety__form__div">
                    <label for="description" class="predmety__form__div__label">
                      Popis
                    </label>
                    <Field
                      type="text"
                      id="description"
                      name="description"
                      class="predmety__form__div__input"
                      aria-label="Popis"
                    />
                  </div>

                  <div class="vert-div predmety__form__div">
                    <label for="kategorie" class="predmety__form__div__label">
                      Kategorie materialu
                    </label>
                    <div class="horiz-div predmety__form__div__input-radio">
                      <label class="predmety__form__div__label horiz-div">
                        <Field
                          class="predmety__form__div__radio"
                          type="radio"
                          id="kovy"
                          name="kategorie"
                          value="kovy"
                          aria-label="Kovy"
                        />
                        Kovy
                      </label>
                      <label class="predmety__form__div__label horiz-div">
                        <Field
                          class="predmety__form__div__radio"
                          type="radio"
                          id="textil"
                          name="kategorie"
                          value="textil"
                          aria-label="Textil"
                        />
                        Textil
                      </label>
                      <label class="predmety__form__div__label horiz-div">
                        <Field
                          class="predmety__form__div__radio"
                          type="radio"
                          id="keramika"
                          name="kategorie"
                          value="keramika"
                          aria-label="Keramika"
                        />
                        Keramika
                      </label>
                      <label class="predmety__form__div__label horiz-div">
                        <Field
                          class="predmety__form__div__radio"
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
                  <div class="vert-div predmety__form__div">
                    <div class="vert-div predmety__form__div">
                      <label
                        for="RestorationMethods"
                        class="predmety__form__div__label"
                      >
                        Metoda restaurace:
                      </label>
                      <VocabularySelectField
                        className="predmety__form__div__input"
                        type={`RestorationMethods?h-parent=${values.kategorie}`}
                      />
                    </div>

                    <div class="vert-div predmety__form__div">
                      <label
                        for="fabricationTechnology"
                        class="predmety__form__div__label"
                      >
                        Technologie Fabrikace:
                      </label>
                      <VocabularySelectField
                        name="fabricationTechnology"
                        class="predmety__form__div__input"
                        type={`FabricationTechnologies?h-parent=${values.kategorie}`}
                      />
                    </div>

                    <div class="vert-div predmety__form__div">
                      <label
                        for="materialType"
                        class="predmety__form__div__label"
                      >
                        Typ Materialu:
                      </label>
                      <VocabularySelectField
                        class="predmety__form__div__input"
                        type={`MaterialTypes?h-parent=${values.kategorie}`}
                      />
                    </div>
                    <div class="vert-div predmety__form__div">
                      <label
                        for="materialTypes"
                        class="predmety__form__div__label"
                      >
                        Additional typy Materialu:
                      </label>
                      <VocabularySelectField
                        class="predmety__form__div__input"
                        type={`MaterialTypes?h-parent=${values.kategorie}`}
                        multiple={true}
                      />
                    </div>
                    <div class="vert-div predmety__form__div">
                      <label for="colors" class="predmety__form__div__label">
                        Barvy:
                      </label>
                      <VocabularySelectField
                        class="predmety__form__div__input"
                        type={`Colors?h-parent=${values.kategorie}`}
                      />
                    </div>

                    <div class="vert-div predmety__form__div">
                      <label class="predmety__form__div__label">Rozmery:</label>

                      <div>
                        <FieldArray name="dimensions">
                          {({ insert, remove, push }) => (
                            <div>
                              {values.dimensions.length > 0 &&
                                values.dimensions.map((dimension, index) => (
                                  <div className="horiz-div" key={index}>
                                    <div class="vert-div predmety__form__div">
                                      <label
                                        for={`dimensions.${index}.dimension`}
                                        class="predmety__form__div__label"
                                      >
                                        Parametry
                                      </label>
                                      <VocabularySelectField
                                        className="predmety__form__div__input"
                                        type={`Dimensions`}
                                        name={`dimensions.${index}.dimension`}
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

                                    <div class="vert-div predmety__form__div predmety__form__div-unit">
                                      <label
                                        for="unit"
                                        class="predmety__form__div__label"
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
                                        <option value="cm">cm</option>
                                        <option value="mm">mm</option>
                                        <option value="metr">metr</option>
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
                        {({ insert, remove, push }) => (
                          <div>
                            {values.stylePeriod.length > 0 &&
                              values.stylePeriod.map((stylePeriod, index) => (
                                <div className="horiz-div" key={index}>
                                  <div class="vert-div predmety__form__div">
                                    <label
                                      for={`stylePeriod.${index}.period`}
                                      class="predmety__form__div__label"
                                    >
                                      period
                                    </label>
                                    <VocabularySelectField
                                      className="predmety__form__div__input"
                                      type={`StylePeriods`}
                                      name={`stylePeriod.${index}.period`}
                                    />
                                  </div>

                                  <div className="vert-div predmety__form__div">
                                    <label
                                      htmlFor={`stylePeriod.${index}.startYear`}
                                    >
                                      StartYear
                                    </label>
                                    <Field
                                      className="predmety__form__div__input"
                                      name={`dimensistylePeriodons.${index}.startYear`}
                                      placeholder="StartYear"
                                      type="number"
                                    />
                                    <ErrorMessage
                                      name={`stylePeriod.${index}.startYear`}
                                      component="div"
                                      className="field-error"
                                    />
                                  </div>

                                  <div className="vert-div predmety__form__div">
                                    <label
                                      htmlFor={`stylePeriod.${index}.endYear`}
                                    >
                                      End Year
                                    </label>
                                    <Field
                                      className="predmety__form__div__input"
                                      name={`dimensistylePeriodons.${index}.endYear`}
                                      placeholder="endYear"
                                      type="number"
                                    />
                                    <ErrorMessage
                                      name={`stylePeriod.${index}.endYear`}
                                      component="div"
                                      className="field-error"
                                    />
                                  </div>

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
                                push({ period: "", startYear: "", endYear: "" })
                              }
                            >
                              Add style Perios
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </div>

                    <div class="vert-div predmety__form__div">
                      <label
                        for="archeologic"
                        class="predmety__form__div__label"
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

                    <div class="vert-div predmety__form__div">
                      <label
                        for="creationPeriod-od"
                        class="predmety__form__div__label"
                      >
                        Perioda tvorby od
                      </label>
                      <Field
                        type="date"
                        id="creationPeriod-od"
                        name="since"
                        class="predmety__form__div__input"
                        aria-label="Perioda tvorby od"
                      />
                    </div>
                    <div class="vert-div predmety__form__div">
                      <label
                        for="creationPeriod-do"
                        class="predmety__form__div__label"
                      >
                        Perioda tvorby do
                      </label>
                      <Field
                        type="date"
                        id="creationPeriod-do"
                        name="until"
                        class="predmety__form__div__input"
                        aria-label="Perioda tvorby do"
                      />
                    </div>
                    <div class="vert-div predmety__form__div">
                      <label
                        for="restorationRequestor"
                        class="predmety__form__div__label"
                      >
                        Žadatel reataurace
                      </label>
                      <Field
                        component="select"
                        name="restorationRequestor"
                        id="restorationRequestor"
                        form="restorationRequestor"
                        class="predmety__form__div__input"
                      >
                        <option value="cirkevni-sprava">Církevní správa</option>
                        <option value="soukromy-vlastnik">
                          Soukromý vlastník
                        </option>
                        <option value="ostatni-zadavatele">
                          Ostatní zadavatelé
                        </option>
                      </Field>
                    </div>
                  </div>
                </div>
              </div>
              <button
                class=" form main-page__btn__addPredmety"
                aria-label="tlacitko ulozeni predmetu"
              >
                Uložit
              </button>
            </Form>

            <Form class="vert-div predmety__form" onSubmit={handleSubmit}>
              <h3 class="predmety__form__h">Vytvoreni noveho predmetu</h3>
              <div class="vert-div predmety__form-main">
                <div class="vert-div predmety__form__div">
                  <label for="subjectName" class="predmety__form__div__label">
                    Nazev predmetu
                  </label>
                  <Field
                    type="text"
                    id="subjectName"
                    name="subjectName"
                    class="predmety__form__div__input"
                    aria-label="Nazev predmetu"
                  />
                </div>
                <div class="vert-div predmety__form__div">
                  <label for="fullName" class="predmety__form__div__label">
                    Restauroval(a)
                  </label>
                  <Field
                    type="text"
                    id="fullName"
                    name="fullName"
                    class="predmety__form__div__input"
                    aria-label="Restauroval(a)"
                  />
                </div>
                <div class="vert-div predmety__form__div">
                  <label for="" class="predmety__form__div__label">
                    Kategorie
                  </label>
                  <div class="horiz-div predmety__form__div__input-radio">
                    <label class="predmety__form__div__label horiz-div">
                      <Field
                        class="predmety__form__div__radio"
                        type="radio"
                        id="Kovy"
                        name="category"
                        value="Kovy"
                        aria-label="Kovy"
                      />
                      Kovy
                    </label>
                    <label class="predmety__form__div__label horiz-div">
                      <Field
                        class="predmety__form__div__radio"
                        type="radio"
                        id="Textil"
                        name="category"
                        value="Textil"
                        aria-label="Textil"
                      />
                      Textil
                    </label>
                    <label class="predmety__form__div__label horiz-div">
                      <Field
                        class="predmety__form__div__radio"
                        type="radio"
                        id="Keramika"
                        name="category"
                        value="Keramika"
                        aria-label="Keramika"
                      />
                      Keramika
                    </label>
                    <label class="predmety__form__div__label horiz-div">
                      <Field
                        class="predmety__form__div__radio"
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
                class=" form main-page__btn__addPredmety"
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
