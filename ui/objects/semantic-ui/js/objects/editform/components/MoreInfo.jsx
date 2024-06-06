import React from "react";
import _isEmpty from "lodash/isEmpty";
import _cloneDeep from "lodash/cloneDeep";
import { AccordionField, FieldLabel } from "react-invenio-forms";

import { Grid } from "semantic-ui-react";
import { VocabularyTreeSelectField } from "@js/oarepo_vocabularies";
import _get from "lodash/get";

export const MoreInfo = ({ activeIndex, handleActive, category }) => {
  const fieldPath = "metadata.restorationObject";
  return (
    <AccordionField
      includesPaths={[
        `${fieldPath}.colors`,
        `${fieldPath}.fabricationTechnologies`,
        `${fieldPath}.materialType`,
        `${fieldPath}.secondaryMaterialTypes`,
      ]}
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
              fieldPath={`${fieldPath}.colors`}
              multiple={true}
              clearable
              root={category}
              label={
                <FieldLabel
                  htmlFor={`${fieldPath}.colors`}
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
            fieldPath={`${fieldPath}.fabricationTechnologies`}
            placeholder="Vyberte technologie výroby"
            multiple={true}
            root={category}
            clearable
            label={
              <FieldLabel
                htmlFor={`${fieldPath}.fabricationTechnologies`}
                label="Technologie výroby"
              />
            }
          />
        </Grid.Column>{" "}
        <Grid.Column>
          <VocabularyTreeSelectField
            optionsListName="MaterialTypes"
            fieldPath={`${fieldPath}.secondaryMaterialTypes`}
            multiple={true}
            clearable
            placeholder="Vyberte vedlejší typy materiálů"
            label={
              <FieldLabel
                htmlFor={`${fieldPath}.secondaryMaterialTypes`}
                label="Vedlejší typy materiálů"
              />
            }
          />
        </Grid.Column>
      </Grid>
    </AccordionField>
  );
};
