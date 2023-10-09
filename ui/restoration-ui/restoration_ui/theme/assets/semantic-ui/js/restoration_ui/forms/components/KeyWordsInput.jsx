import React, { useState } from "react";
import {
  Input,
  Button,
  Item,
  Segment,
  Grid,
  List,
  Divider,
  Label,
  Icon
} from "semantic-ui-react";
import { TextField, FieldLabel } from "react-invenio-forms";
import { getIn } from "formik";
import _reverse from "lodash/reverse";
import _join from "lodash/join";
import _pick from "lodash/pick";
import { useFormikContext } from "formik";
import PropTypes from "prop-types";
import { useFormConfig } from "@js/oarepo_ui";

export const KeyWordsInput = ({ fieldPath }) => {
  const { values } = useFormikContext();

  const [inputValue, setInputValue] = useState("");
  const [words, setWords] = useState(getIn(values, fieldPath) || []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setWords([...words, inputValue.trim()]);
      setInputValue("");
    }
  };

  return (
    <>
      <TextField
        name="metadata.restorationObject.keywords"
        aria-label="Klíčová slova"
        fieldPath={fieldPath}
        fluid
        placeholder="Napište klíčová slova..."
        value={inputValue}
        // onChange={handleInputChange}
        onChange={(e, { data, formikProps }) => {
          handleInputChange(e);
          // formikProps.form.setFieldValue(fieldPath, data.value);
          // console.log(formikProps.form)
        }}
        onKeyPress={handleEnterPress}
        label={
          <FieldLabel
            htmlFor="metadata.restorationObject.keywords"
            className="predmety__form__div__label"
            label={"Klíčová slova"}
          />
        }
      />

      {words.length > 0 && (
        <>
          <Grid>
          {words.map((word, index)=>(
                <Label key={index}>
                <Icon name="key" /> {word}
              </Label>
              ))}
          </Grid>
        </>
      )}
    </>
  );
};
