import React from "react";
import { Input, Button, Icon } from "semantic-ui-react";


export const CustomSB = 
  ({
    onBtnSearchClick,
    onInputChange,
    placeholder,
    uiProps,
    onKeyPress,
    queryString,
    resetQuery,
    state
  }) => {
    console.log(resetQuery)
    console.log(onKeyPress)
    console.log(state)


    const handleReset = () => {
      resetQuery(onBtnSearchClick)
      
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
