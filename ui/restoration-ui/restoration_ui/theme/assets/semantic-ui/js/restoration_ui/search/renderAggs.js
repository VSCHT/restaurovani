import React from "react";
import ReactDOM from "react-dom";
import { createSearchAppInit } from "@js/invenio_search_ui";

import { MyFacets } from "./components";

const aggsComp = document.getElementById("aggsdiv");
console.log(aggsComp);
console.log(<MyFacets />);

createSearchAppInit(
  <MyFacets />,
  true,
  "invenio-search-config",
  true,
  aggsComp
);
export { MyFacets } from "./components";
