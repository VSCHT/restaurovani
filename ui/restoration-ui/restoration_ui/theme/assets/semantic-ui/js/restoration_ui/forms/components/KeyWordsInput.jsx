import React, { useState } from "react";
import { Button, Grid, Label, Icon, Form } from "semantic-ui-react";
import { FieldLabel } from "react-invenio-forms";
import { getIn } from "formik";
import _reverse from "lodash/reverse";
import _join from "lodash/join";
import _pick from "lodash/pick";
import { useFormikContext } from "formik";

export const KeyWordsInput = ({ fieldPath }) => {
  const { values, setFieldValue } = useFormikContext();

  const [words, setWords] = useState(getIn(values, fieldPath) || []);
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setWords([...words, inputValue.trim()]);
      setInputValue("");
      setFieldValue(fieldPath, words);
    }
  };
  const deleteKeyword = (index) => {
    words.splice(index, 1);
    setWords([...words]);
    setFieldValue(fieldPath, words);
    console.log(words);
  };

  return (
    <>
      <Form.Input
        className="form__input"
        name="metadata.restorationObject.keywords"
        aria-label="Klíčová slova"
        fieldPath={fieldPath}
        fluid
        placeholder="Napište klíčová slova..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleEnterPress}
        label={
          <FieldLabel
            htmlFor="metadata.restorationObject.keywords"
            className="predmety__form__div__label"
            label="Klíčová slova"
          />
        }
      />
      {words.length > 0 && (
        <>
          <Grid className="form-edit__keywords__labels">
            {words.map((word, index) => (
              <Label key={index}>
                <Icon name="key" /> {word}{" "}
                <Button
                  className="form-edit__keywords__btn-cancel"
                  onClick={() => deleteKeyword(index)}
                >
                  <Icon right name="cancel" />
                </Button>
              </Label>
            ))}
          </Grid>
        </>
      )}
    </>
  );
};
