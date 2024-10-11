import React from "react";

import { Container, Grid, Header } from "semantic-ui-react";
import { DepositValidationSchemaEdit } from "../forms/deposit/DepositValidationSchema";
import { useFormConfig } from "@js/oarepo_ui";
import { Formik } from "formik";
import _get from "lodash/get";
import Overridable from "react-overridable";
import { SaveButton } from "../forms/components/";
import { BasicInfo } from "./components/BasicInfo";
import { RestorationWork } from "./components/RestorationWork";
import { MoreInfo } from "./components/MoreInfo";
import { ScrollableFormFeedback } from "./components/ScrollableFormFeedback";

export const EditObjectForm = () => {
  const { record } = useFormConfig();
  const category = record.metadata.restorationObject.category;

  const [activeIndex, setActiveIndex] = React.useState(0);
  const handleActive = (x) => {
    setActiveIndex(x);
  };
  
  const initialValues = {
    ...record,
    metadata: {
      ...record.metadata,
      restorationObject: {
        ...record.metadata.restorationObject,
        creationPeriod: {
          since: _get(
            record,
            "metadata.restorationObject.creationPeriod.since",
            ""
          ),
          until: _get(
            record,
            "metadata.restorationObject.creationPeriod.until",
            ""
          ),
        },
      },
    },
  };

  return (
    <Container>
      <Formik
        initialValues={initialValues}
        onSubmit={() => {}}
        enableReinitialize
        validationSchema={DepositValidationSchemaEdit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ values, errors, setFieldValue, setFieldTouched }) => (
          <Grid columns={1} className="gapped grid-form">
            <Header as="h3">
              Editace předmětu {values.metadata.restorationObject.title}
            </Header>

            <Overridable id="Deposit.AccordionFieldBasicInformation.container">
              <BasicInfo
                activeIndex={activeIndex}
                handleActive={handleActive}
                record={record}
                values={values}
                category={category}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
              />
            </Overridable>

            <Overridable id="Deposit.AccordionFieldBasicInformation.container">
              <RestorationWork
                activeIndex={activeIndex}
                handleActive={handleActive}
                values={values}
                category={category}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
              />
            </Overridable>

            <Overridable id="Deposit.AccordionFieldBasicInformation.container">
              <MoreInfo
                activeIndex={activeIndex}
                handleActive={handleActive}
                values={values}
                errors={errors}
                category={category}
              />
            </Overridable>

            <ScrollableFormFeedback />

            <SaveButton />
          </Grid>
        )}
      </Formik>
    </Container>
  );
};
