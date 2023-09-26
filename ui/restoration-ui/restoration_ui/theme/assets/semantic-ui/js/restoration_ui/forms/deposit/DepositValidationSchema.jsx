// https://github.com/jquense/yup


import * as Yup from "yup";
import { i18next } from "@translations/restoration_ui/i18next";


const requiredMessage = "This field is required";
const edtfRegEx = /^(\d{4})(-(\d{2})(-(\d{2}))?)?(\/\d{4}(-\d{2}(-\d{2})?)?)?$/;


export const DepositValidationSchemaDraft = Yup.object().shape({
 metadata: Yup.object().shape({
   restorationObject: Yup.object().shape({
   title: Yup.array().of(
     Yup.object().shape({
       lang: 'cs',
       value: Yup.string().required(requiredMessage),
     })),
   category: Yup.string().required(requiredMessage),


 
 }),
 restorationWork: Yup.object().shape({
   restorer: Yup.string().required(requiredMessage),
 })
})
});


export const DepositValidationSchemaEdit = Yup.object().shape({
 metadata: Yup.object().shape({
   restorationObject: Yup.object().shape({
   category: Yup.string(),
   description: Yup.array().of(
     Yup.object().shape({
       lang: 'cs',
       value: Yup.string()
     })
   ),
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
     until: Yup.number(),
     since: Yup.number(),
   }),
   keywords: Yup.string(),
 
 }),
 restorationWork: Yup.object().shape({
   restorer: Yup.string().required(requiredMessage),
 })


})
});
