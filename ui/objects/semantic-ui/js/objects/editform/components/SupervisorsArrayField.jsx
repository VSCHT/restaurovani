import React, { useState, useEffect } from "react";
import {
  FieldLabel,
  ArrayField,
} from "react-invenio-forms";
import { Header, Grid } from "semantic-ui-react";
import { getIn, useFormikContext } from "formik";
import { ArrayFieldItem } from "@js/oarepo_ui";
import {
  VocabularySelectField,
} from "@js/oarepo_vocabularies";
import _get from "lodash/get";
import axios from "axios";

const serializeNamesSuggestions = (suggestions) =>
  suggestions.map((item) => {
    console.log("item", item);
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
  const [supervisors, setSupervisors] = useState(_get(values, `${fieldPath}.supervisors`));
  const { values } = useFormikContext();

  // const initialSupervisors = getIn(values, `${fieldPath}.supervisors`);

  // useEffect(() => {
  //   console.log("initialSupervisors", initialSupervisors);
  //   Promise.all(initialSupervisors.map((supervisor) => axios.get(`/api/vocabularies/names/${supervisor.id}`)))
  //     .then((names) => {
  //       console.log("response", names);
  //       setSupervisors(names);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching supervisors", error);
  //     });
  // }, [initialSupervisors]);

  return (
    <ArrayField
      addButtonLabel="Přidat vedoucího"
      fieldPath={`${fieldPath}.supervisors`}
      defaultNewValue=""
    >
      {({ arrayHelpers, indexPath }) => {
        const fieldPathPrefix = `${fieldPath}.supervisors[${indexPath}]`;
        const existingName = _get(values, `${fieldPathPrefix}.data.name`, _get(supervisors?.[indexPath], "name"));
        const existingAffiliation = _get(values, `${fieldPathPrefix}.data.affiliations[0].name`, _get(supervisors?.[indexPath], "affiliations[0].name"));
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
                    // serializeSelectedItem={
                    //   ({ id }) => ({ id })
                    // }
                  // onValueChange={({ e, data, formikProps }, selectedSuggestions) => {
                  //   let vocabularyItem = selectedSuggestions.find(
                  //     (o) => o.value === data.value
                  //   );
                  //   if (vocabularyItem) {
                  //     const { id, title, data: { affiliations } } = vocabularyItem;
                  //     formikProps.form.setFieldValue(
                  //       fieldPath,
                  //       { id, title, institution: affiliations?.[0].name }
                  //     );
                  //   } else {
                  //     formikProps.form.setFieldValue(fieldPath, null);
                  //   }
                  // }}
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
                {/* <Grid.Column>
                      <LocalVocabularySelectField
                        name={`${fieldPathPrefix}.institution`}
                        aria-label="Instituce"
                        fieldPath={`${fieldPathPrefix}.institution`}
                        placeholder="Instituce"
                        optionsListName="Institutions"
                        clearable
                        label={
                          <FieldLabel
                            htmlFor={`${fieldPathPrefix}.institution`}
                            label="Instituce"
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