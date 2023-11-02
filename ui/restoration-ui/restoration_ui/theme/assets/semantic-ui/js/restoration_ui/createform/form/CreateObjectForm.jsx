import React from "react";
import _isEmpty from "lodash/isEmpty";
import { TextField, FieldLabel, RadioField } from "react-invenio-forms";

import { Container, Label, Form } from "semantic-ui-react";
import { DepositValidationSchemaDraft } from "../../forms/deposit/DepositValidationSchema";
import { useFormConfig, useDepositApiClient } from "@js/oarepo_ui";
import { Formik, ErrorMessage } from "formik";
import _get from "lodash/get";
import { SaveButton } from "../../forms/components";

const categories = [
  { value: "sklo", label: "Sklo", id: "0" },
  { value: "keramika", label: "Keramika", id: "1" },
  { value: "kovy", label: "Kovy", id: "2" },
  { value: "textil", label: "Textil", id: "3" },
];

export const CreateObjectFormContent = ({ edit, errors }) => {
  const { values, formik } = useDepositApiClient();

  console.log(formik);
  console.log(values);

  return (
    <div className="vert-div predmety__form">
      <h3 className="predmety__form__h">Vytvoření nového předmětu</h3>
      <div className="vert-div predmety__form-main">
        <div className="vert-div predmety__form__div">
         
          <TextField
            fieldPath="metadata.restorationObject.title"
            className="form__input"
            label={
              <div className="horiz-div form__label__div-err">
                <FieldLabel
                  htmlFor="metadata.restorationObject.title"
                  className="predmety__form__div__label"
                  label="Název"
                />
              </div>
            }
            required
          />
        </div>

        <div className="vert-div predmety__form__div">
          <TextField
            name="metadata.restorationWork.restorer"
            aria-label="Restauroval(a)"
            optimized={true}
            fieldPath="metadata.restorationWork.restorer"
            required={true}
            className="form__input"
            label={
              <div className="horiz-div form__label__div-err">
                <FieldLabel
                  htmlFor="metadata.restorationWork.restorer"
                  className="predmety__form__div__label"
                  label="Restauroval(a)"
                />
              </div>
            }
          />
        </div>

        <div className="vert-div predmety__form__div">
          <Form>
            <div className="horiz-div form__label__div-err">
              <FieldLabel
                htmlFor="metadata.restorationObject.category"
                className="predmety__form__div__label"
                required
                label="Kategorie"
              ></FieldLabel>
            </div>
            <Form.Group className="horiz-div predmety__form__div__input-radio">
              {categories.map((option) => (
                <Form.Field key={option.value}>
                  <div
                    key={option.id}
                    className="predmety__form__div__label horiz-div"
                  >
                    <RadioField
                      label={option.label}
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
            {errors?.metadata?.restorationObject?.category ? (
              <Label pointing="above" prompt>
                Pole je povinné
              </Label>
            ) : null}
            <ErrorMessage name="metadata.restorationObject.category" />
          </Form>
        </div>
      </div>
      <SaveButton edit={edit} />
    </div>
  );
};

export const CreateObjectForm = () => {
  const { record } = useFormConfig();
  console.log(record);

  return (
    <Container>
      <Formik
        initialValues={record}
        onSubmit={() => {}}
        enableReinitialize
        validationSchema={DepositValidationSchemaDraft}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ values, errors, touched }) => (
          <CreateObjectFormContent
            record={record}
            values={values}
            errors={errors}
            touched={touched}
          />
        )}
      </Formik>
    </Container>
  );
};
