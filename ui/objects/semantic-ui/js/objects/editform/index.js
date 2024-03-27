import { EditObjectForm } from "./EditObjectForm.jsx";
import { createFormAppInit, parseFormAppConfig } from "@js/oarepo_ui";

const { formConfig } = parseFormAppConfig();
const { overridableIdPrefix } = formConfig;

export const componentOverrides = {
  [`${overridableIdPrefix}.FormApp.layout`]: EditObjectForm,
};

createFormAppInit({ componentOverrides });
