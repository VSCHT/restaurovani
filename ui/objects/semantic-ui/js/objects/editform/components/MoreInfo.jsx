import React from "react";
import _isEmpty from "lodash/isEmpty";
import _cloneDeep from "lodash/cloneDeep";
import { AccordionField, FieldLabel } from "react-invenio-forms";

import { Grid } from "semantic-ui-react";
import { VocabularyTreeSelectField } from "./VocabularyTreeSelectField";
import _get from "lodash/get";

export const MoreInfo = ({ activeIndex, handleActive, category }) => {
  return (
    <AccordionField
      includesPaths={["metadata.restorationObject"]}
      label="Další údaje"
      active={activeIndex === 2}
      styled
      onClick={() => handleActive(2)}
    >
      <Grid columns={1}>
        {category == "sklo" && (
          <Grid.Column>
            <VocabularyTreeSelectField
              optionsListName="Colors"
              fieldPath={`metadata.restorationObject.colors`}
              multiple={true}
              clearable
              label={
                <FieldLabel
                  htmlFor={`metadata.restorationObject.colors`}
                  label="Barva"
                />
              }
              placeholder="Vyberte barvu"
            />
          </Grid.Column>
        )}
        <Grid.Column>
          <VocabularyTreeSelectField
            optionsListName="FabricationTechnologies"
            fieldPath={`metadata.restorationObject.fabricationTechnologies`}
            placeholder="Vyberte technologie výroby"
            multiple={true}
            clearable
            label={
              <FieldLabel
                htmlFor={`metadata.restorationObject.fabricationTechnologies`}
                label="Technologie výroby"
              />
            }
          />
        </Grid.Column>{" "}
        <Grid.Column>
          <VocabularyTreeSelectField
            optionsListName="MaterialTypes"
            fieldPath={`metadata.restorationObject.materialType`}
            multiple={false}
            clearable
            placeholder="Vyberte typy materiálů"
            label={
              <FieldLabel
                htmlFor={`metadata.restorationObject.materialType`}
                label="Typ materiálů"
              />
            }
          />
        </Grid.Column>{" "}
        <Grid.Column>
          <VocabularyTreeSelectField
            optionsListName="MaterialTypes"
            fieldPath={`metadata.restorationObject..secondaryMaterialTypes`}
            multiple={true}
            clearable
            placeholder="Vyberte vedlejší typy materiálů"
            label={
              <FieldLabel
                htmlFor={`metadata.restorationObject.secondaryMaterialTypes`}
                label="Vedlejší typy materiálů"
              />
            }
          />
        </Grid.Column>
      </Grid>
    </AccordionField>
  );
};
