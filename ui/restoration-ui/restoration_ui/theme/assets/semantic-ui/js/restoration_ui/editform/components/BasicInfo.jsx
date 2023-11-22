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
} from "react-invenio-forms";

import { Form } from "semantic-ui-react";
import { ArrayFieldItem } from "@js/oarepo_ui";

import { LocalVocabularySelectField } from "@js/oarepo_vocabularies";
import _get from "lodash/get";
import { FileStat } from "./FileStat";

export const BasicInfo = ({ activeIndex, handleActive, record }) => {
  const units = [
    { value: "kg", text: "kg" },
    { value: "mg", text: "mg" },
    { value: "gr", text: "gr" },
    { value: "cm", text: "cm" },
    { value: "metr", text: "metr" },
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
      defaultActiveIndex={0}
      onClick={() => handleActive(0)}
    >
      <div className="vert-div predmety__form__div-fields">
        <div className="vert-div predmety__form__div">
          <TextField
            name="metadata.restorationObject.title"
            className="form__input"
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
          <MultiInput
            fieldPath="metadata.restorationObject.keywords"
            label="Klíčová slova"
            placeholder="Napište klíčová slova..."
            required={false}
            name="metadata.restorationObject.keywords"
            disabled={false}
          />
        </div>
        <div className="vert-div predmety__form__div">
          <TextAreaField
            name="metadata.restorationObject.description"
            aria-label="Popis"
            fieldPath="metadata.restorationObject.description"
            label={
              <FieldLabel
                htmlFor="metadata.restorationObject.description"
                className="predmety__form__div__label"
                label="Popis"
              ></FieldLabel>
            }
          />
        </div>

        <div className="vert-div predmety__form__div">
          <LocalVocabularySelectField
            optionsListName="ItemTypes"
            fieldPath="metadata.restorationObject.itemTypes"
            multiple={true}
            placeholder="Vyberte typ předmětu"
            label={
              <FieldLabel
                htmlFor="metadata.restorationObject.itemTypes"
                label="Typ předmětu"
                className="predmety__form__div__label"
              />
            }
          />
        </div>
        <div>
          <div className="horiz-div predmety__form__div">
            <div className="vert-div predmety__form__div-medium">
              <TextField
                name="metadata.restorationObject.creationPeriod.since"
                aria-label="Počateční rok"
                fieldPath="metadata.restorationObject.creationPeriod.since"
                placeholder="Počateční rok"
                label={
                  <FieldLabel
                    htmlFor="metadata.restorationObject.creationPeriod.since"
                    className="predmety__form__div__label"
                    label="Počateční rok"
                  ></FieldLabel>
                }
              />
            </div>
            <div className="vert-div predmety__form__div-medium">
              <TextField
                name="metadata.restorationObject.creationPeriod.until"
                aria-label="Končící rok"
                fieldPath="metadata.restorationObject.creationPeriod.until"
                placeholder="Končící rok"
                label={
                  <FieldLabel
                    htmlFor="metadata.restorationObject.creationPeriod.until"
                    className="predmety__form__div__label"
                    label="Končící rok"
                  ></FieldLabel>
                }
              />
            </div>
          </div>
        </div>
        <div className="vert-div predmety__form__div-dimensions">
          <ArrayField
            addButtonLabel="Přidat rozměr"
            fieldPath="metadata.restorationObject.dimensions"
            defaultNewValue={{}}
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
                  <div className="horiz-div predmety__form__div-small">
                    <div className="vert-div predmety__form__div-small__div">
                      <LocalVocabularySelectField
                        optionsListName="Dimensions"
                        placeholder="Rozměr"
                        fieldPath={`${fieldPathPrefix}.dimension`}
                        clearable
                        label={
                          <FieldLabel
                            htmlFor={`${fieldPathPrefix}.dimension.title`}
                            label="Rozměr"
                            className="predmety__form__div__label"
                          />
                        }
                      />
                    </div>

                    <div className="vert-div predmety__form__div-small__div">
                      <TextField
                        name={`${fieldPathPrefix}.value`}
                        aria-label="Value"
                        fieldPath={`${fieldPathPrefix}.value`}
                        placeholder="Napište hodnotu"
                        label={
                          <FieldLabel
                            htmlFor={`${fieldPathPrefix}.value`}
                            className="predmety__form__div__label"
                            label="Hodnota"
                          ></FieldLabel>
                        }
                      />
                    </div>

                    <div className="vert-div predmety__form__div-small__div predmety__form__div-unit">
                      <SelectField
                        name={`${fieldPathPrefix}.unit`}
                        aria-label="Unit"
                        fieldPath={`${fieldPathPrefix}.unit`}
                        options={units}
                        placeholder="Jednotka"
                        label={
                          <FieldLabel
                            htmlFor={`${fieldPathPrefix}.unit`}
                            className="predmety__form__div__label"
                            label="Jednotka"
                          ></FieldLabel>
                        }
                      />
                    </div>
                  </div>
                </ArrayFieldItem>
              );
            }}
          </ArrayField>
        </div>
        <div className="vert-div predmety__form__div predmety__form__div-checkbox">
          <Form.Field>
            <BooleanField
              optimized="false"
              name="metadata.restorationObject.archeologic"
              aria-label="Archeologický nález"
              fieldPath="metadata.restorationObject.archeologic"
              label={
                <FieldLabel
                  htmlFor="metadata.restorationObject.archeologic"
                  className="predmety__form__div__label"
                  label="Archeologický nález"
                ></FieldLabel>
              }
            />
          </Form.Field>
        </div>
        <div className="vert-div predmety__form__div">
          <LocalVocabularySelectField
            fieldPath="metadata.restorationObject.restorationRequestor"
            multiple={false}
            optionsListName="Requestors"
            placeholder="Vyberte zadavatele"
            clearable
            label={
              <FieldLabel
                htmlFor={"metadata.restorationObject.restorationRequestor"}
                label="Zadavatel"
                className="predmety__form__div__label"
              />
            }
          />
        </div>

        <div className="vert-div predmety__form__div">
          <FileStat apiUrl={record?.links?.files} record={record} />
        </div>
      </div>
    </AccordionField>
  );
};
