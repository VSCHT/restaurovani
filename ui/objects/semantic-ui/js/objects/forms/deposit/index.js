import { createFormAppInit } from "@js/oarepo_ui";
import { DepositForm } from "./DepositForm"
import { CreateObjectForm } from "../../createform/form/CreateObjectForm";


export const overriddenComponents = {
    "FormApp.layout": DepositForm,
};

createFormAppInit(overriddenComponents);
