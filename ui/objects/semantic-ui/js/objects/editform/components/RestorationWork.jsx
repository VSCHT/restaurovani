import React from "react";
import _isEmpty from "lodash/isEmpty";
import _cloneDeep from "lodash/cloneDeep";
import {
  AccordionField,
  TextField,
  FieldLabel,
  ArrayField,
  RichInputField,
  RichEditor,
} from "react-invenio-forms";
import { Header, Grid } from "semantic-ui-react";
import { ArrayFieldItem, sanitizeInput, validTags } from "@js/oarepo_ui";
import {
  LocalVocabularySelectField,
  VocabularyTreeSelectField,
} from "@js/oarepo_vocabularies";
import _get from "lodash/get";
import { DaterangePicker } from "./DateRange";

export const RestorationWork = ({
  activeIndex,
  handleActive,
  values,
  category,
  setFieldValue,
  setFieldTouched,
}) => {
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
            editor={
              <RichEditor
                value={values.metadata.restorationWork.abstract}
                optimized
                editorConfig={{
                  toolbar:
                    "bold italic | bullist numlist | outdent indent | undo redo",
                  valid_elements: validTags,
                }}
                onBlur={async (event, editor) => {
                  const cleanedContent = await sanitizeInput(
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
        <ArrayField
          addButtonLabel="Přidat vedoucího"
          fieldPath={`${fieldPath}.supervisors`}
          defaultNewValue={{ fullName: "", comment: "", institution: "" }}
        >
          {({ arrayHelpers, indexPath }) => {
            const fieldPathPrefix = `${fieldPath}.supervisors[${indexPath}]`;
            const existingName = _get(values, `${fieldPathPrefix}.fullName`);
            return (
              <>
                <Header as="h4">
                  Vedoucí {existingName == null ? indexPath + 1 : existingName}
                </Header>
                <ArrayFieldItem
                  name={`${fieldPath}.supervisors`}
                  fieldPathPrefix={`${fieldPath}.supervisors`}
                  indexPath={indexPath}
                  arrayHelpers={arrayHelpers}
                >
                  <Grid columns={1}>
                    <Grid.Column>
                      <LocalVocabularySelectField
                        name={`${fieldPathPrefix}.fullName`}
                        aria-label="Celé jméno"
                        fieldPath={`${fieldPathPrefix}.fullName`}
                        placeholder="Napište celé jméno"
                        optionsListName="Supervisors"
                        clearable
                        label={
                          <FieldLabel
                            htmlFor={`${fieldPathPrefix}.fullName`}
                            label="Celé jméno"
                          ></FieldLabel>
                        }
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <TextField
                        name={`${fieldPathPrefix}.comment`}
                        aria-label="Komentář"
                        fieldPath={`${fieldPathPrefix}.comment`}
                        placeholder="Komentář"
                        label={
                          <FieldLabel
                            htmlFor={`${fieldPathPrefix}.comment`}
                            label="Komentář"
                          ></FieldLabel>
                        }
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <LocalVocabularySelectField
                        name={`${fieldPathPrefix}.institution`}
                        aria-label="Instituce"
                        fieldPath={`${fieldPathPrefix}.institution`}
                        placeholder="Instituce"
                        optionsListName="Institutions"
                        clearable
                        label={
                          <FieldLabel
                            htmlFor={`${fieldPathPrefix}.institution`}
                            label="Instituce"
                          ></FieldLabel>
                        }
                      />
                    </Grid.Column>
                  </Grid>
                </ArrayFieldItem>
              </>
            );
          }}
        </ArrayField>

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
            optionsListName="ExaminationMethods"
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
            optionsListName="RestorationMethods"
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
