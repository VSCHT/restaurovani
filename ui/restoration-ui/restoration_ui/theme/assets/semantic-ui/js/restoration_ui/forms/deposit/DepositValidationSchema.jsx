// https://github.com/jquense/yup

import * as Yup from "yup";

const requiredMessage = "Pole je povinné";
const numMessage = "Musí byt číslo";
const dateMessage = "Musí byt datum správného formatu";

export const DepositValidationSchemaDraft = Yup.object().shape({
  metadata: Yup.object().shape({
    restorationObject: Yup.object().shape({
      title: Yup.string().required(requiredMessage),
      category: Yup.string()
        .oneOf(["sklo", "keramika", "kovy", "textil"])
        .required(),
    }),
    restorationWork: Yup.object().shape({
      restorer: Yup.string().required(requiredMessage),
    }),
  }),
});

export const DepositValidationSchemaEdit = Yup.object().shape({
  metadata: Yup.object().shape({
    restorationObject: Yup.object().shape({
      title: Yup.string().required(requiredMessage),
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
          value: Yup.number().typeError(numMessage),
          dimension: Yup.object().shape({
            title: Yup.object().shape({
              cs: Yup.string(),
            }),
            id: Yup.string(),
          }),
        })
      ),

      keywords: Yup.array(),
      restorationRequestor: Yup.object().shape({
        title: Yup.object().shape({
          cs: Yup.string(),
        }),
        id: Yup.string(),
      }),

      creationPeriod: Yup.object().shape({
        until: Yup.number().typeError(numMessage),
        since: Yup.number().typeError(numMessage),
      }),

      parts: Yup.array()
        .of(
          Yup.object().shape({
            name: Yup.string().required(requiredMessage),
            main: Yup.boolean().required(),
          })
        )
        .test(
          "hasMainPart",
          "Maximalně jedna součást může být hlavní",
          function (value) {
            const mainCount = value?.filter((part) => part.main).length;
            return mainCount == 1 || mainCount == 0 || mainCount== undefined; 
          }
        )
    }),
    restorationWork: Yup.object().shape({
      restorer: Yup.string().required(requiredMessage),
      supervisors: Yup.array().of(
        Yup.object().shape({
          fullName: Yup.string(),
          comment: Yup.string(),
          institution: Yup.string(),
        })
      ),
      restorationPeriod: Yup.object().shape({
        until: Yup.date().typeError(dateMessage),
        since: Yup.date().typeError(dateMessage),
      }),
    }),
  }),
});
