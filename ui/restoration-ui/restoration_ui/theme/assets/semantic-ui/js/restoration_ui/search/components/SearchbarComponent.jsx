import React from "react";
import { SearchBar } from "@js/invenio_search_ui/components";
import { buildUID, withState } from "react-searchkit";
import { Input, Button } from "semantic-ui-react";

export const CustomSearchBar = withState(
  ({
    onBtnSearchClick,
    onInputChange,
    placeholder,
    uiProps,
    onKeyPress,
    queryString,
    ...actionProps
  }) => {
    const handleReset = () => {
      onInputChange("");
      onBtnSearchClick();
    };

    
    return (
      <div>
        <Input
          className="predmety__input-search"
        //   action={{
        //     // content: "Search",
        //     onClick: onBtnSearchClick,
        //     ...actionProps,
        //   }}
          {...uiProps}
          placeholder={placeholder || "Hledat..."}
          onChange={(_, { value }) => {
            onInputChange(value);
          }}
          value={queryString}
          // icon={
          //   <Button
          //     onClick={handleReset}
          //     style={{ backgroundColor: colors.base }}
          //   >
          //     <Icon name="delete" />
          //   </Button>
          // }
          onKeyPress={onKeyPress}
        ></Input>
      </div>
    );
  }
);
