import React from "react";
import { Button } from "semantic-ui-react";
import { i18next } from "@translations/restoration_ui/i18next";
import { useDepositApiClient } from "@js/oarepo_ui";

export const SaveButton = ({ ...uiProps }) => {
  const { isSubmitting, save, formik } = useDepositApiClient();

  console.log(useDepositApiClient);

  return (
    <Button
      name="save"
      className="form main-page__btn__addPredmety"
      aria-label="tlacitko vytvoreni predmetu"
      disabled={isSubmitting}
      loading={isSubmitting}
      onClick={() => {
        formik.validateForm().then(()=>save());
      }}
      content="VYTVOŘIT PŘEDMĚT"
      type="submit"
    />
  );
};
