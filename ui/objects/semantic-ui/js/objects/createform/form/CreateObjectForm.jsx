import React from "react";
import _isEmpty from "lodash/isEmpty";
import { TextField, FieldLabel, RadioField } from "react-invenio-forms";

import { Container, Label, Form, Grid, Header } from "semantic-ui-react";
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

export const CreateObjectFormContent = ({ errors }) => {
  const { values } = useDepositApiClient();
  

  return (
    <Grid>
    <Grid.Column className="predmety__form">
      <Header as='h3'>Vytvoření nového předmětu</Header>
      <Grid.Column >
        <div className="vert-div predmety__form__div">
          <TextField
            fieldPath="metadata.restorationObject.title"
            label={
              <div className="horiz-div form__label__div-err">
                <FieldLabel
                  htmlFor="metadata.restorationObject.title"
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
                required
                label="Kategorie"
              ></FieldLabel>
            </div>
            <Form.Group>
              {categories.map((option) => (
                <Form.Field key={option.value}>
                  <div
                    key={option.id}
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
        </Grid.Column>
      <SaveButton />
    </Grid.Column>
    </Grid>
  );
};

export const CreateObjectForm = () => {
  const { record } = useFormConfig();

  let initVal = {
    ...record,
    files: {enabled: true},
    metadata: {
      restorationObject: {
        title: "",
        category: "",
      },

      restorationWork: {
        restorer: "",
      },
    },
  };

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
