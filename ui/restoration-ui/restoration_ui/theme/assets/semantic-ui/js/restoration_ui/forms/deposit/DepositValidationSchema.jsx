// https://github.com/jquense/yup

import * as Yup from "yup";
import { i18next } from "@translations/restoration_ui/i18next";

const requiredMessage = "Pole je povinné";
const edtfRegEx = /^(\d{4})(-(\d{2})(-(\d{2}))?)?(\/\d{4}(-\d{2}(-\d{2})?)?)?$/;

export const DepositValidationSchemaDraft = Yup.object().shape({
  metadata: Yup.object().shape({
    restorationObject: Yup.object().shape({
      title: Yup.array().of(
        Yup.object().shape({
          value: Yup.string().required(requiredMessage),
        })
      ),
      category: Yup.string().required(requiredMessage),
    }),
    restorationWork: Yup.object().shape({
      restorer: Yup.string().required(requiredMessage),
    }),
  }),
});

export const DepositValidationSchemaEdit = Yup.object().shape({
  metadata: Yup.object().shape({
    restorationObject: Yup.object().shape({
      description: Yup.array()
        .of(
          Yup.object()
            .shape({
              value: Yup.string().nullable(true),
            })
            .nullable(true)
        )
        .nullable(true),
      archeologic: Yup.boolean(),
      dimensions: Yup.array().of(
        Yup.object().shape({
          unit: Yup.string(),
          value: Yup.number(),
          dimension: Yup.object().shape({
            title: Yup.object().shape({
              cs: Yup.string(),
            }),
            id: Yup.string(),
          }),
        })
      ),
      keywords: Yup.array(Yup.string()),
      restorationRequestor: Yup.object().shape({
        title: Yup.object().shape({
          cs: Yup.string(),
        }),
        id: Yup.string(),
      }),

      creationPeriod: Yup.object().shape({
        until: Yup.number(),
        since: Yup.number(),
      }),
    }),
  }),
});
