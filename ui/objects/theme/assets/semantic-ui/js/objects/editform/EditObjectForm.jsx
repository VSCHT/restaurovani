import React from "react";
import _isEmpty from "lodash/isEmpty";
import _cloneDeep from "lodash/cloneDeep";

import { Container, Grid } from "semantic-ui-react";
import { DepositValidationSchemaEdit } from "../forms/deposit/DepositValidationSchema";
import { useFormConfig } from "@js/oarepo_ui";
import { Formik } from "formik";
import _get from "lodash/get";
import _has from "lodash/has";
import Overridable from "react-overridable";
import { SaveButton } from "../forms/components/";
import { BasicInfo } from "./components/BasicInfo";
import { RestorationWork } from "./components/RestorationWork";
import { PartsInfo } from "./components/PartsInfo";

export const EditObjectForm = () => {
  let { record } = useFormConfig();

  const [activeIndex, setActiveIndex] = React.useState(0);
  const handleActive = (x) => {
    setActiveIndex(x);
  };
  const edit = _has(record, "updated");


  return (
    <Container>
      <Formik
        initialValues={record}
        onSubmit={() => {}}
        enableReinitialize
        validationSchema={DepositValidationSchemaEdit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ values , errors}) => (
          <Grid className="vert-div predmety__form">
            <div>
              <h3 className="predmety__form__h">
                Editace předmětu &nbsp;
                {values.metadata.restorationObject.title}
              </h3>
            </div>

            <div className="vert-div predmety__form-main">
              <div className="vert-div predmety__form__div-fields">
                <Overridable id="Deposit.AccordionFieldBasicInformation.container">
                  <BasicInfo
                    activeIndex={activeIndex}
                    handleActive={handleActive}
                    record={record}
                  />
                </Overridable>
              </div>
            </div>

            <div className="vert-div predmety__form-main">
              <div className="vert-div predmety__form__div-fields">
                <Overridable id="Deposit.AccordionFieldBasicInformation.container">
                  <RestorationWork
                    activeIndex={activeIndex}
                    handleActive={handleActive}
                    values={values}
                  />
                </Overridable>
              </div>
            </div>

            <div className="vert-div predmety__form-main">
              <div className="vert-div predmety__form__div-fields">
                <Overridable id="Deposit.AccordionFieldBasicInformation.container">
                  <PartsInfo
                    activeIndex={activeIndex}
                    handleActive={handleActive}
                    values={values}
                    errors={errors}
                  />
                </Overridable>
              </div>
            </div>

            <SaveButton title="ULOŽIT" edit={edit} />
          </Grid>
        )}
      </Formik>
    </Container>
  );
};
