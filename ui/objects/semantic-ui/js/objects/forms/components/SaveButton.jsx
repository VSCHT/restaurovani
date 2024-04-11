import React from "react";
import { Button } from "semantic-ui-react";
import { useDepositApiClient } from "@js/oarepo_ui";
import _isEmpty from "lodash/isEmpty";
import DOMPurify from "dompurify";

export const SaveButton = ({ title = "VYTVOŘIT", edit = false }) => {
  const { isSubmitting, save, formik } = useDepositApiClient();

  const sanitizeContent = (content) => {
    const sanitizedContent = DOMPurify.sanitize(content);
    return sanitizedContent;
  };

  return (
    <Button
      primary
      name="save"
      aria-label="tlacitko vytvoreni predmetu"
      disabled={isSubmitting}
      loading={isSubmitting}
      onClick={async () => {
        const err = await formik.validateForm();
        if (!formik.isValid) {
          return;
        }
        if (!_isEmpty(err)) {
          return;
        }

        const sanitizedValue = sanitizeContent(
          formik.values.metadata.restorationWork.abstract
        );
        formik.setFieldValue(
          formik.values.metadata.restorationWork.abstract,
          sanitizedValue
        );
        const res = await save();

        edit
          ? (window.location.href = window.location.href.substring(
              0,
              window.location.href.lastIndexOf("/")
            ))
          : (window.location.href = `/objekty/${res.id}/edit`);
      }}
      content={title}
      type="submit"
    />
  );
};
