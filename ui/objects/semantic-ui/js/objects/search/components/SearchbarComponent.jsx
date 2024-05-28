import React from "react";
import { Input, Button, Icon } from "semantic-ui-react";

export const CustomSB = ({
  onBtnSearchClick,
  onInputChange,
  placeholder,
  uiProps,
  onKeyPress,
  queryString,
  resetQuery,
}) => {
  const handleReset = () => {
    resetQuery(onBtnSearchClick);
  };

  return (
    <Input
      {...uiProps}
      placeholder={placeholder || "Hledat..."}
      onChange={(_, { value }) => {
        onInputChange(value);
      }}
      value={queryString}
      icon={
        queryString !== "" && (
          <Button.Group>
            <Button onClick={handleReset} className="small transparent">
              <Icon color="black" name="delete" />
            </Button>
            <Button onClick={onBtnSearchClick} className="small transparent">
              <Icon color="black" name="search" data-testid="search-button"/>
            </Button>
          </Button.Group>
        )
      }
      onKeyPress={onKeyPress}
    ></Input>
  );
};
