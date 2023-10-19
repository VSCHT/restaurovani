import React from "react";
import _isEmpty from "lodash/isEmpty";
import { useFormConfig } from "@js/oarepo_ui";
import _get from "lodash/get";
import _has from "lodash/has";
import { EditObjectForm } from "../components/EditObjectForm";
import { CreateObjectForm } from "../components/CreateObjectForm";



document.getElementsByClassName("mt-20")[0].style.display = "none";

export const DepositForm = () => {
  const { record, formConfig } = useFormConfig();
  const metadata = _get(formConfig, "metadata", "no metadata");
  console.log(metadata);

  const edit = _has(formConfig, "updateUrl");

  return edit ? (
    <EditObjectForm edit={edit} />
  ) : (
    <CreateObjectForm edit={edit} />
  );
};
