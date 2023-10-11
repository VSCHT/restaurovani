import React, {Component} from "react";
import { SearchBar } from "@js/invenio_search_ui/components";
import { buildUID, withState} from "react-searchkit";
import { Input, Button, Icon } from "semantic-ui-react";
import { connect } from "react-redux";


export const CustomSB = 
  ({
    onBtnSearchClick,
    onInputChange,
    placeholder,
    uiProps,
    onKeyPress,
    queryString,
    executeSearch,
    resetQuery,
    state,
    ...actionProps
  }) => {
    console.log(resetQuery)
    console.log(onKeyPress)
    console.log(state)


    const handleReset = (q) => {
      resetQuery(onBtnSearchClick)
      console.log(state)
      
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
              onClick={handleReset}
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
