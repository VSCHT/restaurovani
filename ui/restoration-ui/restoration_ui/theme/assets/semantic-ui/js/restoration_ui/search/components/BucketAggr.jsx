import {
  List,
  Checkbox,
  Label,
  Menu,
  Button,
  Accordion,
  Image,
  Icon,
} from "semantic-ui-react";
import { withState } from "react-searchkit";
import React from "react";

export const MyBucketAggregationValues = withState(
  ({ bucket, onFilterClicked, isSelected, childAggCmps }) => {
    return (
      <>
        <List.Item key={bucket.key}>
          <Checkbox
            style={{ float: "left" }}
            label={bucket.label}
            value={bucket.key}
            onClick={() => onFilterClicked(bucket.key)}
            checked={isSelected}
          />{" "}
          <Label>{bucket.doc_count}</Label>
          {childAggCmps}
        </List.Item>
      </>
    );
  }
);

export const MyBucketAggregation = withState(({ title, containerCmp }) => {
  const [dropdownVisible, setDropdownVisible] = React.useState("");

  const showDropDown = (value) => {
    setDropdownVisible(value);
    console.log("visible" + dropdownVisible);
  };

  const [activeIndex, setActiveIndex] = React.useState("");

  const handleClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  return (
    <>
      <Accordion>
        <Accordion.Title
          active={activeIndex === title}
          index={title}
          onClick={() => handleClick(title)}
        >
          <Icon name="dropdown" />
          {title}
        </Accordion.Title>
        <Accordion.Content active={activeIndex === title}>
            {containerCmp}
        </Accordion.Content>
      </Accordion>
      {/* <Button
        className="btn predmety__aside__dropdown-btn"
        aria-label={`Filter podle ${title}`}
        onClick={() => showDropDown(title)}
      >
        {title} */}
        {/* <Image
      src="/static/images/chevron-down.png"
      className="predmety__aside__dropdown-icon"
      alt="dropdown icon"
    /> */}
      {/* </Button> */}
      {/* {dropdownVisible == title && (
    <>
                        {{containerCmp}}
                        </>
                    )} */}
    </>
  );
});
