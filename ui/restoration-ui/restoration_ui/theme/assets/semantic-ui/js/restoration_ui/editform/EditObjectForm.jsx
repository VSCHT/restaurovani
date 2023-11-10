import React from "react";
import _isEmpty from "lodash/isEmpty";
import _cloneDeep from "lodash/cloneDeep";

import { Container, Grid } from "semantic-ui-react";
import { DepositValidationSchemaEdit } from "../forms/deposit/DepositValidationSchema";
import { useFormConfig } from "@js/oarepo_ui";
import { Formik } from "formik";
import _get from "lodash/get";
import Overridable from "react-overridable";
import { SaveButton } from "../forms/components/";
import { BasicInfo } from "./components/BasicInfo";
import { RestorationWork } from "./components/RestorationWork";
import { PartsInfo } from "./components/PartsInfo";

export const EditObjectForm = ({ edit }) => {
  let { record } = useFormConfig();

  const [activeIndex, setActiveIndex] = React.useState(0);
  const handleActive = (x, values) => {
    setActiveIndex(x);
    console.log(values);
  };

  let initVal = {
    ...record,
    metadata: {
      restorationObject: {
        parts: record?.metadata?.restorationObject?.parts?.some(
          (part) => part.main === true
        )
          ? record.metadata.restorationObject.parts
          : [
              {
                id: "",
                name: "",
                main: true,
                fabricationTechnologies: [{ title: { cs: "" } }],
                materialType: { title: { cs: "" } },
                secondaryMaterialTypes: [{ title: { cs: "" } }],
                colors: [{ title: { cs: "" } }],
                main: true,
              },
            ],
        restorationRequestor: { title: { cs: "" } },
        creationPeriod: { until: "", since: "" },
        category: "",
        dimensions: [
          {
            unit: "",
            dimension: { title: { cs: "" } },
            value: undefined,
          },
        ],
        itemTypes: [
          {
            title: { cs: "" },
          },
        ],
        keywords: [],
        archeologic: false,
        description: "",

        ...(record?.metadata?.restorationObject
          ? record.metadata.restorationObject
          : {}),
      },

      restorationWork: {
        abstract: "",
        examinationMethods: [{ title: { cs: "" } }],
        restorationMethods: [{ title: { cs: "" } }],
        restorer: "",
        workType: { title: { cs: "" } },

        ...(record?.metadata?.restorationWork
          ? record.metadata.restorationWork
          : {}),

        supervisors: [
          {
            fullName:
              record?.metadata?.restorationWork?.supervisors?.fullName || "",
            comment:
              record?.metadata?.restorationWork?.supervisors?.comment || "",
            institution:
              record?.metadata?.restorationWork?.supervisors?.institution || "",
          },
        ],
        restorationPeriod: {
          since:
            record?.metadata?.restorationWork?.restorationMethods?.since ||
            undefined,
          until:
            record?.metadata?.restorationWork?.restorationMethods?.until ||
            undefined,
        },
        parts: [
          {
            restorationPeriod: {
              until:
                record?.metadata?.restorationWork?.restorationPeriod?.until ||
                "",
              since:
                record?.metadata?.restorationWork?.restorationPeriod?.since ||
                "",
            },
          },
        ],
      },
    },
  };

  let formValues = {
    ...record,
    metadata: {
      restorationObject: {
        restorationRequestor: { title: { cs: "" } },

        category: "",
        itemTypes: [
          {
            title: { cs: "" },
          },
        ],
        keywords: [],
        archeologic: false,
        description: "",

        //coping
        ...(record?.metadata?.restorationObject
          ? record.metadata.restorationObject
          : {}),

        // array keys
        creationPeriod: {
          since:
            record?.metadata?.restorationObject?.creationPeriod?.since || "",
          until:
            record?.metadata?.restorationObject?.creationPeriod?.until || "",
        },

        dimensions: [
          ...(record?.metadata?.restorationObject?.dimensions?.map((d) => ({
            unit: d?.unit || "",
            dimension: d?.dimension || { title: { cs: "" } },
            value: d?.value || undefined,
          })) || []),
        ],

        parts: record?.metadata?.restorationObject?.parts?.some(
          (part) => part.main === true
        )
          ? [...record.metadata.restorationObject.parts]
          : [
              {
                id: "",
                name: "",
                main: true,
                fabricationTechnologies: [{ title: { cs: "" } }],
                materialType: { title: { cs: "" } },
                secondaryMaterialTypes: [{ title: { cs: "" } }],
                colors: [{ title: { cs: "" } }],
                main: true,
              },
            ],
      },

      restorationWork: {
        abstract: "",
        examinationMethods: [{ title: { cs: "" } }],
        restorationMethods: [{ title: { cs: "" } }],
        restorer: "",
        workType: { title: { cs: "" } },

        // coping

        ...(record?.metadata?.restorationWork
          ? record.metadata.restorationWork
          : {}),

        // array keys
        supervisors: [
          ...(record?.metadata?.restorationWork?.supervisors?.map(
            (supervisor) => ({
              fullName: supervisor?.fullName || "",
              comment: supervisor?.comment || "",
              institution: supervisor?.institution || "",
            })
          ) || []),
        ],

        parts: [
          ...(record?.metadata?.restorationWork?.parts?.map((part) => ({
            retorationMethods: {
              until: part?.restorationMethods?.until || "",
              since: part?.restorationMethods?.since || "",
            },
          })) || []),
        ],

        restorationPeriod: {
          since:
            record?.metadata?.restorationWork?.restorationPeriod?.since || "",
          until:
            record?.metadata?.restorationWork?.restorationPeriod?.until || "",
        },
      },
    },
  };

  return (
    <Container>
      <Formik
        initialValues={formValues}
        onSubmit={() => {}}
        enableReinitialize
        validationSchema={DepositValidationSchemaEdit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ values }) => (
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
