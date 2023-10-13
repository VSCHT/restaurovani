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
import { SaveButton, KeyWordsInput } from "../components";
import _has from "lodash/has";
import { EditObjectForm } from "../components/EditObjectForm";
import { CreateObjectForm } from "../components/CreateObjectForm";

const CurrentRecord = (props) => {
  const { record } = props;
  return (
    <Message>
      <Message.Header>Current record state</Message.Header>
      <pre>{JSON.stringify(record)}</pre>
    </Message>
  );
};

const RecordPreviewer = ({ record }) => <CurrentRecord record={record} />;

document.getElementsByClassName("mt-20")[0].style.display = "none";

export const DepositForm = () => {
  const { record, formConfig } = useFormConfig();
  const metadata = _get(formConfig, "metadata", "no metadata");
  console.log(formConfig);
  console.log(record);
  console.log(metadata);

  const edit = _has(formConfig, "updateUrl");

  return edit ? <EditObjectForm /> : <CreateObjectForm />;
};
