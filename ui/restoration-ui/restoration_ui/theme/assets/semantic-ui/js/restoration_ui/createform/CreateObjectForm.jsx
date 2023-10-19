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
  TextAreaField,
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
} from "../forms/deposit/DepositValidationSchema";
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
import { SaveButton, KeyWordsInput } from "../forms/components/index";

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
document.getElementsByClassName("mt-20")[0].style.display = "none";

export const CreateObjectForm = () => {
  const { record, formConfig } = useFormConfig();
  const [checked, setChecked] = useState("");

  return (
    <Container>
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
        {record.metadata == null ? (
          <div className="vert-div predmety__form">
            <h3 className="predmety__form__h">Vytvoření nového předmětu</h3>
            <div className="vert-div predmety__form-main">
              <div className="vert-div predmety__form__div">
                <TextField
                  name="metadata.restorationObject.title"
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
                      label="Restauroval(a)"
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
                            checked={
                              checked == option.value

                              // _get(
                              //   record,
                              //   "metadata.restorationObject.category"
                              // ) == option.value
                            }
                            onChange={({ data, formikProps }) => {
                              setChecked(option.value)
                              formikProps.form.setFieldValue(
                                "metadata.restorationObject.category",
                                option.value
                              );
                              console.log(formikProps)
                             
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
        ) : null}
      </BaseForm>
    </Container>
  );
};
