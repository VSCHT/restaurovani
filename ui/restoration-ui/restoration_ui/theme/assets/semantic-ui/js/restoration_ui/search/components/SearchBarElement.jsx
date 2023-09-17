import React from "react";
import { SearchBar as ReactSearchKitSearchBar } from "react-searchkit";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Overridable from "react-overridable";
import { Input } from "semantic-ui-react";


export const SearchBarCustom = ({ elementId, buildUID, appName }) => {
  const domElement = document.getElementById(elementId);
  if (domElement) {
    domElement.innerHTML = "";
    return ReactDOM.createPortal(<ReactSearchKitSearchBar />, domElement);
  }
  return (
    <Overridable id={buildUID("SearchApp.searchbarCustom", "", appName)}>
      <ReactSearchKitSearchBar />
    </Overridable>

  );
};

// SearchBar.propTypes = {
//   elementId: PropTypes.string,
// };

// SearchBar.defaultProps = {
//   elementId: "header-search-bar",
// };