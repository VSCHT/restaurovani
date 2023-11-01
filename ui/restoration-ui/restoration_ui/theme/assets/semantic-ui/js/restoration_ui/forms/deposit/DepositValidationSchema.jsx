// https://github.com/jquense/yup

import * as Yup from "yup";

const requiredMessage = "Pole je povinné";

export const DepositValidationSchemaDraft = Yup.object().shape({
  metadata: Yup.object().shape({
    restorationObject: Yup.object().shape({
      title:  Yup.string().required(requiredMessage)
        ,
      category: Yup.string().oneOf(["sklo", "keramika", "kovy", "textil"]).required(),
    }),
    restorationWork: Yup.object().shape({
      restorer: Yup.string().required(requiredMessage),
    }),
  }),
});

export const DepositValidationSchemaEdit = Yup.object().shape({
  metadata: Yup.object().shape({
    restorationObject: Yup.object().shape({
      title:  Yup.string().required(requiredMessage)
      ,
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
          value: Yup.number().typeError("Musí byt číslo"),
          dimension: Yup.object().shape({
            title: Yup.object().shape({
              cs: Yup.string(),
            }),
            id: Yup.string().typeError("Musí byt číslo"),
          }),
        })
      ),
      stylePeriod: Yup.object().shape({
        startYear: Yup.number().typeError("Musí byt číslo"),
        endYear: Yup.number().typeError("Musí byt číslo"),
      }),
      keywords: Yup.array(),
      restorationRequestor: Yup.object().shape({
        title: Yup.object().shape({
          cs: Yup.string(),
        }),
        id: Yup.string(),
      }),

      creationPeriod: Yup.object().shape({
        until: Yup.number().typeError("Musí byt číslo"),
        since: Yup.number().typeError("Musí byt číslo"),
      }),
    }),
    restorationWork: Yup.object().shape({
      restorer: Yup.string().required(requiredMessage),
      supervisors: Yup.array().of(
        Yup.object().shape({
          fullName: Yup.string(),
          comment: Yup.string(),
          institution: Yup.string(),
        })),
        restorationPeriod: Yup.object().shape({
          until: Yup.number().typeError("Musí byt číslo"),
          since: Yup.number().typeError("Musí byt číslo"),
        }),
    }),

  }),
});
