import React from "react";
import _isEmpty from "lodash/isEmpty";
import _cloneDeep from "lodash/cloneDeep";
import {
  AccordionField,
  TextField,
  FieldLabel,
  SelectField,
  BooleanField,
  ArrayField,
  TextAreaField,
  MultiInput,
  NumberInput,
} from "react-invenio-forms";
import { Grid } from "semantic-ui-react";
import { ArrayFieldItem, useSanitizeInput } from "@js/oarepo_ui";
import {
  LocalVocabularySelectField,
  VocabularyTreeSelectField,
} from "@js/oarepo_vocabularies";
import _get from "lodash/get";
import { FileStat } from "./FileStat";
import { getIn } from "formik";

export const BasicInfo = ({
  activeIndex,
  handleActive,
  record,
  category,
  values,
  setFieldValue,
  setFieldTouched,
}) => {
  const { sanitizeInput } = useSanitizeInput();

  const units = [
    { value: "kg", text: "kg" },
    { value: "mg", text: "mg" },
    { value: "gr", text: "gr" },
    { value: "cm", text: "cm" },
    { value: "m", text: "m" },
    { value: "mm", text: "mm" },
  ];
  const fieldPath = "metadata.restorationObject";

  return (
    <AccordionField
      includesPaths={[
        `${fieldPath}.itemTypes`,
        `${fieldPath}.dimensions`,
        `${fieldPath}.description`,
        `${fieldPath}.title`,
        `${fieldPath}.archeologic`,
        `${fieldPath}.keywords`,
        `${fieldPath}.creationPeriod.since`,
        `${fieldPath}.creationPeriod.until`,
        `${fieldPath}.restorationRequestor`,
      ]}
      label="Údaje"
      active={activeIndex === 0}
      styled
      onClick={() => handleActive(0)}
    >
      <Grid columns={1}>
        <Grid.Column>
          <TextField
            name={`${fieldPath}.title`}
            aria-label="Název předmětu"
            fieldPath={`${fieldPath}.title`}
            required
            label={
              <FieldLabel
                htmlFor={`${fieldPath}.title`}
                label="Název předmětu"
              />
            }
            onBlur={() => {
              const cleanedContent = sanitizeInput(
                getIn(values, `${fieldPath}.title`)
              );
              setFieldValue(`${fieldPath}.title`, cleanedContent);
              setFieldTouched(`${fieldPath}.title`, true);
            }}
          />
        </Grid.Column>
        <Grid.Column>
          <MultiInput
            fieldPath={`${fieldPath}.keywords`}
            label="Klíčová slova"
            placeholder="Napište klíčová slova..."
            required={false}
            name={`${fieldPath}.keywords`}
            disabled={false}
          />
        </Grid.Column>
        <Grid.Column>
          <TextAreaField
            name={`${fieldPath}.description`}
            aria-label="Popis"
            fieldPath={`${fieldPath}.description`}
            label={
              <FieldLabel
                htmlFor={`${fieldPath}.description`}
                label="Popis"
              ></FieldLabel>
            }
            onBlur={() => {
              const cleanedContent = sanitizeInput(
                getIn(values, `${fieldPath}.description`)
              );
              setFieldValue(`${fieldPath}.description`, cleanedContent);
              setFieldTouched(`${fieldPath}.description`, true);
            }}
          />
        </Grid.Column>
        <Grid.Column>
          <VocabularyTreeSelectField
            optionsListName="ItemTypes"
            fieldPath={`${fieldPath}.itemTypes`}
            multiple={true}
            clearable
            placeholder="Vyberte typ předmětu"
            root={category}
            label={
              <FieldLabel
                htmlFor={`${fieldPath}.itemTypes`}
                label="Typ předmětu"
              />
            }
          />
        </Grid.Column>

        <Grid columns={2}>
          <Grid.Column>
            <NumberInput
              name={`${fieldPath}.creationPeriod.since`}
              aria-label="Datace od"
              fieldPath={`${fieldPath}.creationPeriod.since`}
              required
              label={
                <FieldLabel
                  htmlFor={`${fieldPath}.creationPeriod.since`}
                  label="Datace od"
                />
              }
            />
          </Grid.Column>
          <Grid.Column>
            <NumberInput
              name={`${fieldPath}.creationPeriod.until`}
              aria-label="Datace do"
              fieldPath={`${fieldPath}.creationPeriod.until`}
              required
              label={
                <FieldLabel
                  htmlFor={`${fieldPath}.creationPeriod.until`}
                  label="Datace do"
                />
              }
            />
          </Grid.Column>
        </Grid>

        {category !== "textil" && (
          <ArrayField
            addButtonLabel="Přidat rozměr"
            fieldPath={`${fieldPath}.dimensions`}
          >
            {({ arrayHelpers, indexPath }) => {
              const fieldPathPrefix = `${fieldPath}.dimensions[${indexPath}]`;
              return (
                <ArrayFieldItem
                  name={`${fieldPath}.dimensions`}
                  fieldPathPrefix={`${fieldPath}.dimensions`}
                  indexPath={indexPath}
                  arrayHelpers={arrayHelpers}
                >
                  <Grid columns={3} className="gapped">
                    <Grid.Column>
                      <LocalVocabularySelectField
                        optionsListName="Dimensions"
                        placeholder="Rozměr"
                        fieldPath={`${fieldPathPrefix}.dimension`}
                        clearable
                        label={
                          <FieldLabel
                            htmlFor={`${fieldPathPrefix}.dimension.title`}
                            label="Rozměr"
                          />
                        }
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <TextField
                        name={`${fieldPathPrefix}.value`}
                        aria-label="Value"
                        fieldPath={`${fieldPathPrefix}.value`}
                        placeholder="Napište hodnotu"
                        label={
                          <FieldLabel
                            htmlFor={`${fieldPathPrefix}.value`}
                            label="Hodnota"
                          ></FieldLabel>
                        }
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <SelectField
                        name={`${fieldPathPrefix}.unit`}
                        aria-label="Unit"
                        fieldPath={`${fieldPathPrefix}.unit`}
                        options={units}
                        placeholder="Jednotka"
                        label={
                          <FieldLabel
                            htmlFor={`${fieldPathPrefix}.unit`}
                            label="Jednotka"
                          ></FieldLabel>
                        }
                      />
                    </Grid.Column>
                  </Grid>
                </ArrayFieldItem>
              );
            }}
          </ArrayField>
        )}
        <Grid.Column>
          <BooleanField
            optimized="false"
            name={`${fieldPath}.archeologic`}
            aria-label="Archeologický nález"
            fieldPath={`${fieldPath}.archeologic`}
            label={
              <FieldLabel
                htmlFor={`${fieldPath}.archeologic`}
                label="Archeologický nález"
              ></FieldLabel>
            }
          />
        </Grid.Column>
        <Grid.Column>
          <VocabularyTreeSelectField
            optionsListName="Requestors"
            fieldPath={`${fieldPath}.restorationRequestor`}
            multiple={false}
            clearable
            placeholder="Vyberte zadavatele"
            label={
              <FieldLabel
                htmlFor={`${fieldPath}.restorationRequestor`}
                label="Zadavatel"
              />
            }
          />
        </Grid.Column>
        <Grid.Column>
          <FileStat apiUrl={record?.links?.files} record={record} />
        </Grid.Column>
      </Grid>
    </AccordionField>
  );
};
