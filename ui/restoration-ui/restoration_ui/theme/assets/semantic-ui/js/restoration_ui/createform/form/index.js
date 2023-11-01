import { createFormAppInit } from "@js/oarepo_ui";
import{ CreateObjectForm }from "./CreateObjectForm.jsx";

export const overriddenComponents = {
  "FormApp.layout": CreateObjectForm,
};

createFormAppInit(overriddenComponents);



console.log(CreateObjectForm);
