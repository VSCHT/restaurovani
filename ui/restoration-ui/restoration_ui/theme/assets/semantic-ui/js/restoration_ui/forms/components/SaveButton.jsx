import React from "react";
import { Button } from "semantic-ui-react";
import { useDepositApiClient } from "@js/oarepo_ui";
import _isEmpty from "lodash/isEmpty";

export const SaveButton = ({ title = "VYTVOŘIT" }) => {
  const { isSubmitting, save, formik } = useDepositApiClient();

 
  return (
   
      <Button
        name="save"
        className="form main-page__btn__addPredmety"
        aria-label="tlacitko vytvoreni predmetu"
        disabled={isSubmitting}
        // disabled={edit ? isSubmitting : !formik.dirty}
        loading={isSubmitting}
        onClick={async () => {
          const err = await formik.validateForm();
          if (!formik.isValid) {
            return;
          }
          if (!_isEmpty(err)) {
            console.log(err);
            return;
          }

          console.log(formik);
          save();
        }}
        content={title}
        type="submit"
      />
   
  );
};
