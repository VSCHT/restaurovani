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
      className="searchbar-input"
      placeholder={placeholder || "Hledat..."}
      onChange={(_, { value }) => {
        onInputChange(value);
      }}
      value={queryString}
      icon={
        queryString !== "" && (
          <Button.Group>
            <Button onClick={handleReset} size="small" className="transparent" icon>
              <Icon color="black" name="delete" link data-testid="clear-button"/>
            </Button>
            <Button onClick={onBtnSearchClick} size="small" className="transparent" icon>
              <Icon color="black" name="search" link data-testid="search-button" />
            </Button>
          </Button.Group>
        )
      }
      onKeyPress={onKeyPress}
    ></Input>
  );
};
