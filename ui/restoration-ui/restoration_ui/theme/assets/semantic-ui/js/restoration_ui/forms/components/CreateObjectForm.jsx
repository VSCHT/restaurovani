import React, { useState } from "react";
import _isEmpty from "lodash/isEmpty";
import PropTypes from "prop-types";
import { TextField, FieldLabel, RadioField } from "react-invenio-forms";

import { Container, Message, Label, Form } from "semantic-ui-react";
import { DepositValidationSchemaDraft } from "../deposit/DepositValidationSchema";
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
import _get from "lodash/get";
import { SaveButton, KeyWordsInput } from ".";


const categories = [
  { value: "sklo", label: "Sklo" },
  { value: "keramika", label: "Keramika" },
  { value: "kovy", label: "Kovy" },
  { value: "textil", label: "Textil" },
];
document.getElementsByClassName("mt-20")[0].style.display = "none";

export const CreateObjectFormContent = ({ values }) => {
  return (
    <div className="vert-div predmety__form">
      <h3 className="predmety__form__h">Vytvoření nového předmětu</h3>
      <div className="vert-div predmety__form-main">
        <div className="vert-div predmety__form__div">
          <TextField
            name="metadata.restorationObject.title[0].value"
            className="form__input"
            aria-label="Název předmětu"
            fieldPath="metadata.restorationObject.title[0].value"
            required
            label={
              <FieldLabel
                htmlFor="metadata.restorationObject.title[0].value"
                className="predmety__form__div__label"
                label="Název předmětu"
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
          <Form>
            <Label
              htmlFor="metadata.restorationObject.category"
              className="predmety__form__div__label"
              required
            >
              Kategorie
            </Label>
            <Form.Group className="horiz-div predmety__form__div__input-radio">
              {categories.map((option) => (
                <Form.Field key={option.value}>
                  <div
                    key={option.value}
                    className="predmety__form__div__label horiz-div"
                  >
                    <RadioField
                      label={option.label}
                      // className="predmety__form__div__radio"
                      fieldPath="metadata.restorationObject.category"
                      name="metadata.restorationObject.category"
                      value={option.value}
                      checked={
                        _get(values, "metadata.restorationObject.category") ==
                        option.value
                      }
                      onChange={({ formikProps }) => {
                        formikProps.form.setFieldValue(
                          "metadata.restorationObject.category",
                          option.value
                        );
                      }}
                      optimized
                    />
                  </div>
                </Form.Field>
              ))}
            </Form.Group>
          </Form>
        </div>
      </div>
      <SaveButton />
    </div>
  );
};

export const CreateObjectForm = () => {
  const { record, formConfig } = useFormConfig();
  const metadata = _get(formConfig, "metadata", "no metadata");
  console.log(formConfig);
  console.log(record);
  console.log(metadata);


  return (
    <Container>
      {/* <BaseForm
        onSubmit={() => {}}
        formik={{
          initialValues: record,
          validateOnChange: false,
          validateOnBlur: false,
          enableReinitialize: true,
          validationSchema: DepositValidationSchemaDraft,
        }}
      > */}
      <Formik
        initialValues={record}
        onSubmit={() => {}}
        enableReinitialize
        validationSchema={DepositValidationSchemaDraft}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ values }) => <CreateObjectFormContent values={values} />}
      </Formik>
      {/* </BaseForm> */}
    </Container>
  );
};
