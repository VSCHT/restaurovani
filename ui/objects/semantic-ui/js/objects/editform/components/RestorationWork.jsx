import React, { memo } from "react";
import {
  AccordionField,
  TextField,
  FieldLabel,
  RichInputField,
  RichEditor,
} from "react-invenio-forms";
import { Grid } from "semantic-ui-react";
import { getIn } from "formik";
import { useSanitizeInput } from "@js/oarepo_ui";
import {
  LocalVocabularySelectField,
  VocabularyTreeSelectField,
} from "@js/oarepo_vocabularies";
import { DaterangePicker } from "./DateRange";
import { SupervisorsArrayField } from "./SupervisorsArrayField";

const MemoizedRichEditor = memo(RichEditor, (prevProps, nextProps) => prevProps.initialValue === nextProps.initialValue);

export const RestorationWork = ({
  activeIndex,
  handleActive,
  values,
  category,
  setFieldValue,
  setFieldTouched,
}) => {
  const { sanitizeInput, validEditorTags } = useSanitizeInput();

  const fieldPath = "metadata.restorationWork";
  return (
    <AccordionField
      includesPaths={[
        "metadata.restorationWork.restorationMethods",
        "metadata.restorationWork.workType",
        "metadata.restorationWork.examinationMethods",
        "metadata.restorationWork.restorer",
        "metadata.restorationWork.abstract",
        "metadata.restorationWork.restorationPeriod",
        "metadata.restorationWork.supervisors",
      ]}
      label="Práce"
      styled
      active={activeIndex === 1}
      onClick={() => handleActive(1, values)}
    >
      <Grid columns={1}>
        <Grid.Column>
          <TextField
            name={`${fieldPath}.restorer`}
            aria-label="Restauroval(a)"
            fieldPath={`${fieldPath}.restorer`}
            label={
              <FieldLabel
                htmlFor={`${fieldPath}.restorer`}
                label="Restauroval(a)"
              />
            }
          />
        </Grid.Column>
        <Grid.Column>
          <RichInputField
            name={`${fieldPath}.abstract`}
            aria-label="Popis restaurování"
            fieldPath={`${fieldPath}.abstract`}
            optimized
            editor={
              <MemoizedRichEditor
                initialValue={getIn(values, `${fieldPath}.abstract`, "")}
                optimized
                editorConfig={{
                  toolbar:
                    "bold italic | bullist numlist | outdent indent | undo redo",
                  valid_elements: validEditorTags,
                }}
                onBlur={(event, editor) => {
                  const cleanedContent = sanitizeInput(
                    editor.getContent()
                  );
                  setFieldValue(`${fieldPath}.abstract`, cleanedContent);
                  setFieldTouched(`${fieldPath}.abstract`, true);
                }}
              />
            }
            label={
              <FieldLabel
                htmlFor={`${fieldPath}.abstract`}
                label="Popis restaurování"
              ></FieldLabel>
            }
          />
        </Grid.Column>

        <SupervisorsArrayField fieldPath={fieldPath} />

        <Grid.Column>
          <DaterangePicker
            name={`${fieldPath}.restorationPeriod`}
            aria-label="Období restaurování"
            fieldPath={`${fieldPath}.restorationPeriod`}
            startDateInputPlaceholder="Období restaurování"
            endDateInputPlaceholder="Období restaurování"
            clearButtonClassName="small transparent"
            label="Období restaurování"
            dateFormat="yyyy/MM/dd"
          />
        </Grid.Column>

        <Grid.Column>
          <LocalVocabularySelectField
            fieldPath={`${fieldPath}.workType`}
            multiple={false}
            optionsListName="WorkTypes"
            placeholder="Vyberte typ práce"
            clearable
            label={
              <FieldLabel htmlFor={`${fieldPath}.workType`} label="Typ práce" />
            }
          />
        </Grid.Column>
        <Grid.Column>
          <VocabularyTreeSelectField
            fieldPath={`${fieldPath}.examinationMethods`}
            multiple={true}
            vocabulary="ExaminationMethods"
            placeholder="Vyberte metody průzkumu"
            clearable
            label={
              <FieldLabel
                htmlFor={`${fieldPath}.examinationMethods`}
                label="Metody průzkumu"
              />
            }
          />
        </Grid.Column>
        <Grid.Column>
          <VocabularyTreeSelectField
            fieldPath={`${fieldPath}.restorationMethods`}
            multiple={true}
            vocabulary="RestorationMethods"
            root={category}
            placeholder="Vyberte metody restaurování"
            clearable
            label={
              <FieldLabel
                htmlFor={`${fieldPath}.restorationMethods`}
                label="Metody restaurování"
              />
            }
          />
        </Grid.Column>
      </Grid>
    </AccordionField>
  );
};
