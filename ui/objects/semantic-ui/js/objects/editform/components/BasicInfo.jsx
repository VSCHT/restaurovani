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
  NumberInput
} from "react-invenio-forms";
import { VocabularyTreeSelectField } from "./VocabularyTreeSelectField";

import { Grid } from "semantic-ui-react";
import { ArrayFieldItem } from "@js/oarepo_ui";

import { LocalVocabularySelectField } from "@js/oarepo_vocabularies";
import _get from "lodash/get";
import { FileStat } from "./FileStat";

export const BasicInfo = ({ activeIndex, handleActive, record, category }) => {
  const units = [
    { value: "kg", text: "kg" },
    { value: "mg", text: "mg" },
    { value: "gr", text: "gr" },
    { value: "cm", text: "cm" },
    { value: "m", text: "m" },
    { value: "mm", text: "mm" },
  ];

  return (
    <AccordionField
      includesPaths={[
        "metadata.restorationObject.itemTypes",
        "metadata.restorationObject.dimensions",
        "metadata.restorationObject.description",
        "metadata.restorationObject.title",
        "metadata.restorationObject.archeologic",
        "metadata.restorationObject.keywords",
        "metadata.restorationObject.creationPeriod.since",
        "metadata.restorationObject.creationPeriod.until",
        "metadata.restorationObject.restorationRequestor",
      ]}
      label="Údaje"
      active={activeIndex === 0}
      styled
      onClick={() => handleActive(0)}
    >
      <Grid columns={1}>
        <Grid.Column>
          <TextField
            name="metadata.restorationObject.title"
            aria-label="Název předmětu"
            fieldPath="metadata.restorationObject.title"
            required
            label={
              <FieldLabel
                htmlFor="metadata.restorationObject.title"
                label="Název předmětu"
              />
            }
          />
        </Grid.Column>
        <Grid.Column>
          <MultiInput
            fieldPath="metadata.restorationObject.keywords"
            label="Klíčová slova"
            placeholder="Napište klíčová slova..."
            required={false}
            name="metadata.restorationObject.keywords"
            disabled={false}
          />
        </Grid.Column>
        <Grid.Column>
          <TextAreaField
            name="metadata.restorationObject.description"
            aria-label="Popis"
            fieldPath="metadata.restorationObject.description"
            label={
              <FieldLabel
                htmlFor="metadata.restorationObject.description"
                label="Popis"
              ></FieldLabel>
            }
          />
        </Grid.Column>
        <Grid.Column>
          <VocabularyTreeSelectField
            optionsListName="ItemTypes"
            fieldPath="metadata.restorationObject.itemTypes"
            multiple={true}
            clearable
            placeholder="Vyberte typ předmětu"
            preFilteringOption={category}
            label={
              <FieldLabel
                htmlFor="metadata.restorationObject.itemTypes"
                label="Typ předmětu"
              />
            }
          />
        </Grid.Column>

        <Grid columns={2}>
          <Grid.Column>
            <NumberInput
              name="metadata.restorationObject.creationPeriod.since"
              aria-label="Datace od"
              fieldPath="metadata.restorationObject.creationPeriod.since"
              required
              label={
                <FieldLabel
                  htmlFor="metadata.restorationObject.creationPeriod.since"
                  label="Datace od"
                />
              }
            />
          </Grid.Column>
          <Grid.Column>
            <NumberInput
              name="metadata.restorationObject.creationPeriod.until"
              aria-label="Datace do"
              fieldPath="metadata.restorationObject.creationPeriod.until"
              required
              label={
                <FieldLabel
                  htmlFor="metadata.restorationObject.creationPeriod.until"
                  label="Datace do"
                />
              }
            />
          </Grid.Column>
        </Grid>

        {category != "textil" && (
          <ArrayField
            addButtonLabel="Přidat rozměr"
            fieldPath="metadata.restorationObject.dimensions"
          >
            {({ arrayHelpers, indexPath }) => {
              const fieldPathPrefix = `${"metadata.restorationObject.dimensions"}[${indexPath}]`;
              return (
                <ArrayFieldItem
                  name="metadata.restorationObject.dimensions"
                  fieldPath="metadata.restorationObject.dimensions"
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
            name="metadata.restorationObject.archeologic"
            aria-label="Archeologický nález"
            fieldPath="metadata.restorationObject.archeologic"
            label={
              <FieldLabel
                htmlFor="metadata.restorationObject.archeologic"
                label="Archeologický nález"
              ></FieldLabel>
            }
          />
        </Grid.Column>
        <Grid.Column>
            <VocabularyTreeSelectField
            optionsListName="Requestors"
            fieldPath="metadata.restorationObject.restorationRequestor"
            multiple={false}
            clearable
            placeholder="Vyberte zadavatele"
            label={
              <FieldLabel
                htmlFor={"metadata.restorationObject.restorationRequestor"}
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
