// https://github.com/jquense/yup

import * as Yup from "yup";
import { i18next } from "@translations/restoration_ui/i18next";

const requiredMessage = "This field is required";
const edtfRegEx = /^(\d{4})(-(\d{2})(-(\d{2}))?)?(\/\d{4}(-\d{2}(-\d{2})?)?)?$/;

export const DepositValidationSchema = Yup.object().shape({
  metadata: Yup.object().shape({
    title: Yup.string().required(requiredMessage),
    category: Yup.string().required(requiredMessage),
    description: Yup.string().required(requiredMessage),
    archeologic: Yup.boolean(),
    dimensions: Yup.array().of(
      Yup.object().shape({
        unit: Yup.string().required(requiredMessage),
        value: Yup.number().required(requiredMessage),
        dimension: Yup.string().required(requiredMessage),
        
      })
    ),
    restorationRequestor: Yup.string().required(requiredMessage),

    creationPeriod: Yup.object().shape({
      until: Yup.number().required(requiredMessage),
      since: Yup.number().required(requiredMessage),
    }),
    // colors: Yup.array().of({

    // }).required(requiredMessage),
    // itemTypes: Yup.array().of({

    // }).required(requiredMessage),

    stylePeriod: Yup.object().shape({
      period: Yup.string().required(requiredMessage),
      startYear: Yup.number().required(requiredMessage),
      endYear: Yup.number().required(requiredMessage),
    }),
    materialType: Yup.string().required(requiredMessage),
    // secondaryMaterialTypes: Yup.array().of(
    //   // id: Yup.string().required(requiredMessage),
    // )
  }),
});
