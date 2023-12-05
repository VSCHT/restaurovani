import React from "react";
import _isEmpty from "lodash/isEmpty";
import _cloneDeep from "lodash/cloneDeep";
import {
  AccordionField,
  TextField,
  FieldLabel,
  BooleanField,
  ArrayField,
} from "react-invenio-forms";

import { Form, Label } from "semantic-ui-react";
import { ArrayFieldItem } from "@js/oarepo_ui";
import { LocalVocabularySelectField } from "@js/oarepo_vocabularies";
import _get from "lodash/get";

export const PartsInfo = ({ activeIndex, handleActive, values, errors }) => {
 console.log(values)


  return (
    <AccordionField
      includesPaths={["metadata.restorationObject.parts"]}
      label="Součásti"
      active={activeIndex === 2}
      defaultActiveIndex={2}
      onClick={() => handleActive(2)}
    >
      <ArrayField
        fieldPath="metadata.restorationObject.parts"
        defaultNewValue={{
          name: "",
          main: values?.metadata?.restorationObject?.parts== null? true : false,
        }}
        addButtonLabel="Dodat součást"
      >
        {({ arrayHelpers, indexPath }) => {
          const fieldPathPrefix = `metadata.restorationObject.parts[${indexPath}]`;
          return (
            <ArrayFieldItem
              name="metadata.restorationObject.parts"
              fieldPath="metadata.restorationObject.parts"
              indexPath={indexPath}
              arrayHelpers={arrayHelpers}
            >
              <div className="vert-div predmety__form__div-fields__parts">
                <div className="vert-div predmety__form__div-fields">
                  <h3>
                    Součást &nbsp;
                    {values.metadata?.restorationObject?.parts?.[indexPath]
                      ?.name == ""
                      ? indexPath + 1
                      : values?.metadata?.restorationObject?.parts?.[indexPath]
                          ?.name}
                  </h3>
                  <div className="vert-div predmety__form__div">
                    <TextField
                      fieldPath={`${fieldPathPrefix}.name`}
                      className="form__input"
                      label={
                        <FieldLabel
                          htmlFor={`${fieldPathPrefix}.name`}
                          className="predmety__form__div__label"
                          label="Název"
                        />
                      }
                      required
                    />
                  </div>
                  <div className="vert-div predmety__form__div predmety__form__div-checkbox">
                    <Form.Field>
                      <BooleanField
                        name={`${fieldPathPrefix}.main`}
                        aria-label="Hlávní součást"
                        fieldPath={`${fieldPathPrefix}.main`}
                        optimized="false"
                        // checked={checkedF(indexPath)}
                        label={
                          <FieldLabel
                            htmlFor={`${fieldPathPrefix}.main`}
                            className="predmety__form__div__label"
                            label="Hlávní součást"
                          ></FieldLabel>
                        }
                      />
                      {errors?.metadata?.restorationObject?.parts ? (
                        <Label pointing="above" prompt>
                          Jedna součást může být hlavní
                        </Label>
                      ) : null}
                    </Form.Field>
                  </div>
                  <div className="vert-div predmety__form__div">
                    <LocalVocabularySelectField
                      optionsListName="Colors"
                      fieldPath={`${fieldPathPrefix}.colors`}
                      multiple={true}
                      clearable
                      label={
                        <FieldLabel
                          htmlFor={`${fieldPathPrefix}.colors`}
                          label="Barva"
                          className="predmety__form__div__label"
                        />
                      }
                      placeholder="Vyberte barvu"
                    />
                  </div>
                  <div className="vert-div predmety__form__div">
                    <LocalVocabularySelectField
                      optionsListName="FabricationTechnologies"
                      fieldPath={`${fieldPathPrefix}.fabricationTechnologies`}
                      placeholder="Vyberte technologie výroby"
                      multiple={true}
                      clearable
                      label={
                        <FieldLabel
                          htmlFor={`${fieldPathPrefix}.fabricationTechnologies`}
                          label="Technologie výroby"
                          className="predmety__form__div__label"
                        />
                      }
                    />
                  </div>

                  <div className="vert-div predmety__form__div">
                    <LocalVocabularySelectField
                      optionsListName="MaterialTypes"
                      fieldPath={`${fieldPathPrefix}.materialType`}
                      multiple={false}
                      clearable
                      placeholder="Vyberte typy materiálů"
                      label={
                        <FieldLabel
                          htmlFor={`${fieldPathPrefix}.materialType`}
                          label="Typ materiálů"
                          className="predmety__form__div__label"
                        />
                      }
                    />
                  </div>
                  <div className="vert-div predmety__form__div">
                    <LocalVocabularySelectField
                      optionsListName="MaterialTypes"
                      fieldPath={`${fieldPathPrefix}.secondaryMaterialTypes`}
                      multiple={true}
                      clearable
                      placeholder="Vyberte vedlejší typy materiálů"
                      label={
                        <FieldLabel
                          htmlFor={`${fieldPathPrefix}.secondaryMaterialTypes`}
                          label="Vedlejší typy materiálů"
                          className="predmety__form__div__label"
                        />
                      }
                    />
                  </div>
                  <div className="vert-div predmety__form__div">
                    <LocalVocabularySelectField
                      optionsListName="RestorationMethods"
                      fieldPath={`metadata.restorationWork.parts.${indexPath}.restorationMethods`}
                      multiple={true}
                      placeholder="Vyberte metody restaurování"
                      clearable
                      label={
                        <FieldLabel
                          htmlFor={`metadata.restorationWork.parts[${indexPath}].restorationMethods`}
                          label="Metody restaurování"
                          className="predmety__form__div__label"
                        />
                      }
                    />
                  </div>
                </div>
              </div>
            </ArrayFieldItem>
          );
        }}
      </ArrayField>
    </AccordionField>
  );
};
