import { CreateObjectForm } from "./CreateObjectForm.jsx";
import { createFormAppInit, parseFormAppConfig } from "@js/oarepo_ui";

const { formConfig } = parseFormAppConfig();
const { overridableIdPrefix } = formConfig;

export const componentOverrides = {
  [`${overridableIdPrefix}.FormApp.layout`]: CreateObjectForm,
};

createFormAppInit({ componentOverrides });
