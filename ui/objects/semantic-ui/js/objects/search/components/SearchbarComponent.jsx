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
      className="predmety__input-search"
      {...uiProps}
      placeholder={placeholder || "Hledat..."}
      onChange={(_, { value }) => {
        onInputChange(value);
      }}
      value={queryString}
      icon={
        queryString !== "" && (
          <Button.Group>
            <Button onClick={handleReset}>
              <Icon color="black" name="delete" />
            </Button>
            <Button onClick={onBtnSearchClick}>
              <Icon color="black" name="search"/>
            </Button>
          </Button.Group>
        )
      }
      onKeyPress={onKeyPress}
    ></Input>
  );
};
