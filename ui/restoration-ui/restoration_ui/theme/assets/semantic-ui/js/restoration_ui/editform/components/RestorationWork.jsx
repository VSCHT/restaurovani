import React from "react";
import _isEmpty from "lodash/isEmpty";
import _cloneDeep from "lodash/cloneDeep";
import {
  AccordionField,
  TextField,
  FieldLabel,
  ArrayField,
  TextAreaField,
  RichInputField,
} from "react-invenio-forms";
import { ArrayFieldItem } from "@js/oarepo_ui";
import { LocalVocabularySelectField } from "@js/oarepo_vocabularies";
import _get from "lodash/get";

export const RestorationWork = ({ activeIndex, handleActive, values }) => {
  return (
    <AccordionField
      includesPaths={[
        "metadata.restorationObject.restorationMethods",
        "metadata.restorationWork.workType",
        "metadata.restorationWork.examinationMethods",
        "metadata.restorationWork.restorer",
        "metadata.restorationWork.abstract",
        "metadata.restorationWork.literature[0].value",
        "metadata.restorationWork.restorationPeriod",
        "metadata.restorationWork.supervisors",
      ]}
      label="Práce"
      active={activeIndex === 1}
      defaultActiveIndex={1}
      onClick={() => handleActive(1, values)}
    >
      <div className="vert-div predmety__form__div-fields">
        <div className="vert-div predmety__form__div">
          <TextField
            name="metadata.restorationWork.restorer"
            aria-label="Restauroval(a)"
            fieldPath="metadata.restorationWork.restorer"
            className="form__input"
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
          <RichInputField
            name="metadata.restorationWork.abstract"
            aria-label="Popis restaurování"
            fieldPath="metadata.restorationWork.abstract"
            label={
              <FieldLabel
                htmlFor="metadata.restorationWork.abstract"
                className="predmety__form__div__label"
                label="Popis restaurování"
              ></FieldLabel>
            }
          ></RichInputField>
        </div>
        <div className="vert-div predmety__form__div">
          <TextAreaField
            name="metadata.restorationWork.literature[0].value"
            aria-label="Použitá literatura"
            fieldPath="metadata.restorationWork.literature[0].value"
            label={
              <FieldLabel
                htmlFor="metadata.restorationWork.literature[0].value"
                className="predmety__form__div__label"
                label="Použitá literatura"
              ></FieldLabel>
            }
          />
        </div>
        <div className="vert-div predmety__form__div">
          <ArrayField
            addButtonLabel="Přidat vedoucího"
            fieldPath="metadata.restorationWork.supervisors"
            defaultNewValue={{}}
          >
            {({ arrayHelpers, indexPath }) => {
              const fieldPathPrefix = `${"metadata.restorationWork.supervisors"}[${indexPath}]`;
              return (
                <ArrayFieldItem
                  name="metadata.restorationWork.supervisors"
                  fieldPath="metadata.restorationWork.supervisors"
                  indexPath={indexPath}
                  arrayHelpers={arrayHelpers}
                >
                  <div className="vert-div predmety__form__div-fields__parts">
                    <h3 className="form__input__title-small">
                      Vedoucí &nbsp;
                      {values.metadata?.restorationWork?.supervisors?.[
                        indexPath
                      ]?.fullName == null
                        ? indexPath + 1
                        : values.metadata.restorationWork.supervisors[indexPath]
                            .fullName}
                    </h3>

                    <div className="vert-div form__input-supervisor">
                      <TextField
                        name={`${fieldPathPrefix}.fullName`}
                        aria-label="Celé jméno"
                        fieldPath={`${fieldPathPrefix}.fullName`}
                        placeholder="Napište celé jméno"
                        label={
                          <FieldLabel
                            htmlFor={`${fieldPathPrefix}.fullName`}
                            className="predmety__form__div__label"
                            label="Celé jméno"
                          ></FieldLabel>
                        }
                      />

                      <div className="horiz-div predmety__form__div-small">
                        <div className="vert-div predmety__form__div-medium">
                          <TextField
                            name={`${fieldPathPrefix}.comment`}
                            aria-label="Komentář"
                            fieldPath={`${fieldPathPrefix}.comment`}
                            placeholder="Komentář"
                            label={
                              <FieldLabel
                                htmlFor={`${fieldPathPrefix}.comment`}
                                className="predmety__form__div__label"
                                label="Komentář"
                              ></FieldLabel>
                            }
                          />
                        </div>
                        <div className="vert-div predmety__form__div-medium">
                          <TextField
                            name={`${fieldPathPrefix}.institution`}
                            aria-label="Institut"
                            fieldPath={`${fieldPathPrefix}.institution`}
                            placeholder="Institut"
                            label={
                              <FieldLabel
                                htmlFor={`${fieldPathPrefix}.institution`}
                                className="predmety__form__div__label"
                                label="Institut"
                              ></FieldLabel>
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </ArrayFieldItem>
              );
            }}
          </ArrayField>
        </div>

        <div className="horiz-div predmety__form__div-small">
          <div className="vert-div predmety__form__div-medium">
            <TextField
              name="metadata.restorationWork.restorationPeriod.since"
              aria-label="Od"
              placeholder="rrrr-mm-dd"
              fieldPath="metadata.restorationWork.restorationPeriod.since"
              label={
                <FieldLabel
                  htmlFor="metadata.restorationWork.restorationPeriod.since"
                  className="predmety__form__div__label-small"
                  label="Období restaurování od"
                ></FieldLabel>
              }
            />
          </div>

          <div className="vert-div predmety__form__div-medium">
            <TextField
              name="metadata.restorationWork.restorationPeriod.until"
              aria-label="Do"
              fieldPath="metadata.restorationWork.restorationPeriod.until"
              placeholder="rrrr-mm-dd"
              label={
                <FieldLabel
                  htmlFor="metadata.restorationWork.restorationPeriod.until"
                  className="predmety__form__div__label-small"
                  label="Období restaurování do"
                ></FieldLabel>
              }
            />
          </div>
        </div>

        <div className="vert-div predmety__form__div">
          <LocalVocabularySelectField
            fieldPath="metadata.restorationWork.workType"
            multiple={false}
            optionsListName="WorkTypes"
            placeholder="Vyberte typ práce"
            clearable
            label={
              <FieldLabel
                htmlFor={"metadata.restorationWork.workType"}
                label="Typ práce"
                className="predmety__form__div__label"
              />
            }
          />
        </div>
        <div className="vert-div predmety__form__div">
          <LocalVocabularySelectField
            fieldPath="metadata.restorationWork.examinationMethods"
            multiple={true}
            optionsListName="ExaminationMethods"
            placeholder="Vyberte metody zkoumání"
            clearable
            label={
              <FieldLabel
                htmlFor={"metadata.restorationWork.examinationMethods"}
                label="Metody zkoumání"
                className="predmety__form__div__label"
              />
            }
          />
        </div>
      </div>
    </AccordionField>
  );
};
