import React from "react";
import { Button } from "semantic-ui-react";
import { useDepositApiClient } from "@js/oarepo_ui";
import _isEmpty from "lodash/isEmpty";

export const SaveButton = ({ title = "VYTVOŘIT", edit = false }) => {
  const { isSubmitting, save, formik } = useDepositApiClient();

  return (
    <Button
      primary
      name="save"
      aria-label="tlacitko vytvoreni predmetu"
      disabled={isSubmitting}
      loading={isSubmitting}
      data-testid="submit-button"
      onClick={async () => {
        const err = await formik.validateForm();
        if (!formik.isValid) {
          return;
        }
        if (!_isEmpty(err)) {
          return;
        }

        const res = await save();
        if (!res) {
          console.error("BEvalidationErrors", formik.values["BEvalidationErrors"]);
          console.error("httpErrors", formik.values["httpErrors"]);
          return;
        }
        
        edit
          ? (window.location.href = res.links.edit_html)
          : (window.location.href = res.links.self_html);
      }}
      content={title}
      type="submit"
    />
  );
};
