import React from "react";
import { MultipleOptionsSearchBarRSK } from "@js/invenio_search_ui/components";
import { SearchBar } from "@js/invenio_search_ui/components";


import { i18next } from "@translations/restoration_ui/i18next";
import { withState, buildUID } from "react-searchkit";
import { SearchConfigurationContext } from "@js/invenio_search_ui/components";
import Overridable from "react-overridable";
import { Input } from "semantic-ui-react";



console.log(SearchBar)


export const MultipleSearchBarElement= ({ queryString, onInputChange, appName}) => {
 const headerSearchbar = document.getElementById("header-search-bar");
 const searchbarOptions = JSON.parse(headerSearchbar.dataset.options);
 console.log(headerSearchbar)
 console.log(searchbarOptions)


 return (
  
   <MultipleOptionsSearchBarRSK
     options={searchbarOptions}
     onInputChange={onInputChange}
     queryString={queryString}
     placeholder={`${i18next.t("Search")}...`}
   />
  // <SearchBar/>
  


 
 );
};
