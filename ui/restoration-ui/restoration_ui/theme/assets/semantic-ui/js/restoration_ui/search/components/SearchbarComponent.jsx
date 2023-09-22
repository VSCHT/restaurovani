import React from "react";
import { SearchBar } from "@js/invenio_search_ui/components";
import { buildUID, withState } from "react-searchkit";
import { Input, Button, Icon } from "semantic-ui-react";

export const CustomSearchBar = withState(
  ({
    onBtnSearchClick,
    onInputChange,
    placeholder,
    uiProps,
    onKeyPress,
    queryString,
    executeSearch,
    ...actionProps
  }) => {
    const handleReset = (q) => {
      onInputChange(q);
      onBtnSearchClick();
      executeSearch();
    };

    return (
      <Input
        className="predmety__input-search"
        {...uiProps}
        placeholder={placeholder || "Hledat..."}
        onChange={(_, { value }) => {
          onInputChange(value);
        }}
        value={queryString}
        icon={
          queryString !== "" ? (
            <Button
              onClick={() => handleReset("")}
              className="predmety__btn-reset"
            >
              <Icon name="delete" />
            </Button>
          ) : (
            "none"
          )
        }
        onKeyPress={onKeyPress}
      ></Input>
    );
  }
);
