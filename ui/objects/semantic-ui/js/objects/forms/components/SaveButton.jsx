import React from "react";
import { Button } from "semantic-ui-react";
import { useDepositApiClient } from "@js/oarepo_ui";
import _isEmpty from "lodash/isEmpty";

export const SaveButton = ({ title = "VYTVOŘIT", edit = false }) => {
  const { isSubmitting, preview, formik } = useDepositApiClient();

  const previewRecord = async () => {
    const err = await formik.validateForm();
    if (!formik.isValid || !_isEmpty(err)) {
      return;
    }

    const res = await preview();

    if (!res) {
      console.error("BEvalidationErrors", formik.values["BEvalidationErrors"]);
      console.error("httpErrors", formik.values["httpErrors"]);
    }
  }

  return (
    <Button
      primary
      name="save"
      aria-label="tlacitko vytvoreni predmetu"
      disabled={isSubmitting}
      loading={isSubmitting}
      data-testid="submit-button"
      onClick={previewRecord}
      content={title}
      type="submit"
    />
  );
};
