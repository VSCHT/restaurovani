import React from "react";
import _isEmpty from "lodash/isEmpty";
import _cloneDeep from "lodash/cloneDeep";
import {
  AccordionField,
  TextField,
  FieldLabel,
  ArrayField,
  RichInputField,
} from "react-invenio-forms";
import { Header, Grid } from "semantic-ui-react";
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
        "metadata.restorationWork.restorationPeriod",
        "metadata.restorationWork.supervisors",
      ]}
      label="Práce"
      styled
      active={activeIndex === 1}
      defaultActiveIndex={1}
      onClick={() => handleActive(1, values)}
    >
      <Grid columns={1}>
        <Grid.Column>
          <TextField
            name="metadata.restorationWork.restorer"
            aria-label="Restauroval(a)"
            fieldPath="metadata.restorationWork.restorer"
            label={
              <FieldLabel
                htmlFor="metadata.restorationWork.restorer"
                label="Restauroval(a)"
              />
            }
          />
        </Grid.Column>
        <Grid.Column>
          <RichInputField
            name="metadata.restorationWork.abstract"
            aria-label="Popis restaurování"
            fieldPath="metadata.restorationWork.abstract"
            label={
              <FieldLabel
                htmlFor="metadata.restorationWork.abstract"
                label="Popis restaurování"
              ></FieldLabel>
            }
          ></RichInputField>
        </Grid.Column>
        <ArrayField
          addButtonLabel="Přidat vedoucího"
          fieldPath="metadata.restorationWork.supervisors"
          defaultNewValue={{ fullName: "", comment: "", institution: "" }}
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
                <Header as="h4" className="form__input__title-small">
                  Vedoucí &nbsp;
                  {values.metadata?.restorationWork?.supervisors?.[indexPath]
                    ?.fullName == null
                    ? indexPath + 1
                    : values.metadata.restorationWork.supervisors[indexPath]
                        .fullName}
                </Header>
                <Grid columns={3}  className="gapped">
                  <Grid.Column>
                    <TextField
                      name={`${fieldPathPrefix}.fullName`}
                      aria-label="Celé jméno"
                      fieldPath={`${fieldPathPrefix}.fullName`}
                      placeholder="Napište celé jméno"
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
                    <TextField
                      name={`${fieldPathPrefix}.institution`}
                      aria-label="Institut"
                      fieldPath={`${fieldPathPrefix}.institution`}
                      placeholder="Institut"
                      label={
                        <FieldLabel
                          htmlFor={`${fieldPathPrefix}.institution`}
                          label="Institut"
                        ></FieldLabel>
                      }
                    />
                  </Grid.Column>
                </Grid>
              </ArrayFieldItem>
            );
          }}
        </ArrayField>

        <Grid columns={2} className="gapped">
          <Grid.Column>
            <TextField
              name="metadata.restorationWork.restorationPeriod.since"
              aria-label="Od"
              placeholder="rrrr-mm-dd"
              fieldPath="metadata.restorationWork.restorationPeriod.since"
              label={
                <FieldLabel
                  htmlFor="metadata.restorationWork.restorationPeriod.since"
                  label="Období restaurování od"
                ></FieldLabel>
              }
            />
          </Grid.Column>
          <Grid.Column>
            <TextField
              name="metadata.restorationWork.restorationPeriod.until"
              aria-label="Do"
              fieldPath="metadata.restorationWork.restorationPeriod.until"
              placeholder="rrrr-mm-dd"
              label={
                <FieldLabel
                  htmlFor="metadata.restorationWork.restorationPeriod.until"
                  label="Období restaurování do"
                ></FieldLabel>
              }
            />
          </Grid.Column>
        </Grid>
        <Grid.Column>
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
              />
            }
          />
        </Grid.Column>
        <Grid.Column>
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
              />
            }
          />
        </Grid.Column>
      </Grid>
    </AccordionField>
  );
};
