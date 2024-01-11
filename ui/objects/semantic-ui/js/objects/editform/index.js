

import { createFormAppInit } from "@js/oarepo_ui";
import { EditObjectForm } from "./EditObjectForm"


export const overriddenComponents = {
    "FormApp.layout": EditObjectForm,
};

createFormAppInit(overriddenComponents);