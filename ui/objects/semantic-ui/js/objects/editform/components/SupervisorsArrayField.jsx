import React from "react";
import {
  FieldLabel,
  ArrayField,
} from "react-invenio-forms";
import { Header, Grid } from "semantic-ui-react";
import { useFormikContext } from "formik";
import { ArrayFieldItem } from "@js/oarepo_ui";
import {
  VocabularySelectField,
} from "@js/oarepo_vocabularies";
import _get from "lodash/get";

const serializeNamesSuggestions = (suggestions) =>
  suggestions.map((item) => {
    const affiliation = _get(item, "affiliations[0].name", _get(item, "data.affiliations[0].name"));
    return {
      text: affiliation ? `${item.name} (${affiliation})` : item.name,
      value: item.id,
      key: item.id,
      data: item,
      id: item.id,
      title: item.name,
      name: item.name,
    };
  });

export const SupervisorsArrayField = ({
  fieldPath
}) => {
  const { values } = useFormikContext();

  return (
    <ArrayField
      addButtonLabel="Přidat vedoucího"
      fieldPath={`${fieldPath}.supervisors`}
      defaultNewValue=""
    >
      {({ arrayHelpers, indexPath }) => {
        const fieldPathPrefix = `${fieldPath}.supervisors[${indexPath}]`;
        const supervisor = _get(values, fieldPathPrefix);
        const existingName = supervisor?.name ?? _get(supervisor, "data.name");
        const existingAffiliation = supervisor?.affiliations?.[0].name ?? _get(supervisor, "data.affiliations[0].name");
        return (
          <>
            <Header as="h4">
              Vedoucí: {existingName == null ? indexPath + 1 : existingName}
              <Header.Subheader content={existingAffiliation} />
            </Header>
            <ArrayFieldItem
              name={`${fieldPath}.supervisors`}
              fieldPathPrefix={`${fieldPath}.supervisors`}
              indexPath={indexPath}
              arrayHelpers={arrayHelpers}
            >
              <Grid columns={1}>
                <Grid.Column>
                  <VocabularySelectField
                    name={fieldPathPrefix}
                    aria-label="Celé jméno a instituce"
                    fieldPath={fieldPathPrefix}
                    placeholder="Vyberte jméno vedoucího a jeho/její instituci"
                    type="names"
                    clearable
                    label={
                      <FieldLabel
                        htmlFor={fieldPathPrefix}
                        label="Celé jméno a instituce"
                      ></FieldLabel>
                    }
                    serializeSuggestions={serializeNamesSuggestions}
                  />
                </Grid.Column>
                {/* <Grid.Column>
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
                </Grid.Column> */}
              </Grid>
            </ArrayFieldItem>
          </>
        );
      }}
    </ArrayField>
  );
}