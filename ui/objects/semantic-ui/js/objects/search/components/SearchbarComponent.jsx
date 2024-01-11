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
          <>
            <Button onClick={handleReset} className="predmety__btn-reset">
              <Icon name="delete" className="predmety__btn-reset" />
            </Button>
            <Button onClick={onBtnSearchClick} className="predmety__btn-reset mobile-component">
              <Icon name="search" className="predmety__btn-reset" />
            </Button>
          </>
        )
      }
      onKeyPress={onKeyPress}
    ></Input>
  );
};
