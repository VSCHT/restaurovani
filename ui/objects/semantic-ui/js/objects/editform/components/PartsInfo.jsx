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

import { Form, Label, Header, Grid } from "semantic-ui-react";
import { ArrayFieldItem } from "@js/oarepo_ui";
import { LocalVocabularySelectField } from "@js/oarepo_vocabularies";
import _get from "lodash/get";

export const PartsInfo = ({ activeIndex, handleActive, values, errors }) => {
  return (
    <AccordionField
      includesPaths={["metadata.restorationObject.parts"]}
      label="Součásti"
      active={activeIndex === 2}
      defaultActiveIndex={2}
      styled
      onClick={() => handleActive(2)}
    >
      <ArrayField
        fieldPath="metadata.restorationObject.parts"
        defaultNewValue={{
          name: "",
          main:
            values?.metadata?.restorationObject?.parts == null ? true : false,
        }}
        addButtonLabel="Dodat součást"
      >
        {({ arrayHelpers, indexPath }) => {
          const fieldPathPrefix = `metadata.restorationObject.parts[${indexPath}]`;
          return (
            <Grid columns={1} className="gapped">
            <ArrayFieldItem
              name="metadata.restorationObject.parts"
              fieldPath="metadata.restorationObject.parts"
              indexPath={indexPath}
              arrayHelpers={arrayHelpers}
            >
               <Grid columns={1}>
                <Header as="h4">
                  Součást &nbsp;
                  {values.metadata?.restorationObject?.parts?.[indexPath]
                    ?.name == ""
                    ? indexPath + 1
                    : values?.metadata?.restorationObject?.parts?.[indexPath]
                        ?.name}
                </Header>

               
                <Grid.Column>
                  <TextField
                    fieldPath={`${fieldPathPrefix}.name`}
                    label={
                      <FieldLabel
                        htmlFor={`${fieldPathPrefix}.name`}
                        label="Název"
                      />
                    }
                    required
                  />
                </Grid.Column>
                <Grid.Column>
                  <BooleanField
                    name={`${fieldPathPrefix}.main`}
                    aria-label="Hlávní součást"
                    fieldPath={`${fieldPathPrefix}.main`}
                    optimized="false"
                    label={
                      <FieldLabel
                        htmlFor={`${fieldPathPrefix}.main`}
                        label="Hlávní součást"
                      ></FieldLabel>
                    }
                  />
                  {errors?.metadata?.restorationObject?.parts ? (
                    <Label pointing="above" prompt>
                      Jedna součást může být hlavní
                    </Label>
                  ) : null}
                </Grid.Column>
                <Grid.Column>
                  <LocalVocabularySelectField
                    optionsListName="Colors"
                    fieldPath={`${fieldPathPrefix}.colors`}
                    multiple={true}
                    clearable
                    label={
                      <FieldLabel
                        htmlFor={`${fieldPathPrefix}.colors`}
                        label="Barva"
                      />
                    }
                    placeholder="Vyberte barvu"
                  />
                </Grid.Column>
                <Grid.Column>
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
                      />
                    }
                  />
                </Grid.Column>{" "}
                <Grid.Column>
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
                      />
                    }
                  />
                </Grid.Column>{" "}
                <Grid.Column>
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
                      />
                    }
                  />
                </Grid.Column>
                <Grid.Column>
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
                      />
                    }
                  />
                </Grid.Column>
              </Grid>
            </ArrayFieldItem>
            </Grid>
          );
        }}
      </ArrayField>
    </AccordionField>
  );
};
