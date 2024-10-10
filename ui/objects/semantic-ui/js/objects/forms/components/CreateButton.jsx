import React from "react";
import { Button } from "semantic-ui-react";
import _isEmpty from "lodash/isEmpty";
import {
  useDepositApiClient,
} from "@js/oarepo_ui";

export const CreateButton = () => {
  const { isSubmitting, save, formik } = useDepositApiClient();

  const createRecord = async () => {
    formik.setSubmitting(true);
    try {
      const saveResult = await save();

      if (!saveResult) {
        formik.setFieldError(
          "BEvalidationErrors.errorMessage",
          "Záznam byl uložen. Chcete-li jej upravit, opravte následující validační chyby a klikněte znovu na VYTVOŘIT:"
        );
        return;
      } else {
        const url = saveResult.links.edit_html;
        formik.setFieldError(
          "successMessage",
          "Záznam byl uložen. Přesměrovávám na stránku s jeho editací..."
        );
        setTimeout(() => {
          formik.setFieldError("successMessage", "");
          window.location.href = url;
        }, 1000);
      }
      return saveResult;
    } catch (error) {
      formik.setFieldError(
        "httpErrors",
        error?.response?.data?.message ?? error.message
      );
      return false;
    } finally {
      formik.setSubmitting(false);
    }
  }

  const handleSubmit = async () => {
    const err = await formik.validateForm();
    if (!formik.isValid || !_isEmpty(err)) {
      return;
    }

    const res = await createRecord();

    if (!res) {
      console.error("BEvalidationErrors", formik.errors["BEvalidationErrors"]?.errorMessage);
      console.error("httpErrors", formik.errors["httpErrors"]);
    }
  }

  return (
    <Button
      primary
      name="save"
      aria-label="Tlačítko pro vytvoření předmětu"
      disabled={isSubmitting}
      loading={isSubmitting}
      data-testid="submit-button"
      onClick={handleSubmit}
      content="VYTVOŘIT"
      type="submit"
    />
  );
};
