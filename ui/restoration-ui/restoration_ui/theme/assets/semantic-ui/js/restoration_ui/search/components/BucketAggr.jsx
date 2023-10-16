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
            value={bucket.key}
            onClick={() => onFilterClicked(bucket.key)}
            checked={isSelected}
          />
          {bucket.label} ( {bucket.doc_count} ){childAggCmps}
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
          className="btn predmety__aside__dropdown-btn parag"
          active={activeIndex === title}
          index={title}
          onClick={() => handleClick(title)}
        >
          {
            (title =
              title.startsWith("metadata/restorationWork/") ||
              title.startsWith("metadata/restorationObject/")
                ? title
                    .replace(
                      /^(metadata\/restorationObject\/|metadata\/restorationWork\/)|[\/]+|\.label$/g,
                      " "
                    )
                    .trim()
                    .toLowerCase()
                    .replace(/^\w/, (c) => c.toUpperCase())
                : title)
          }

          <Image
            src="/static/images/chevron-down.png"
            className={`predmety__aside__dropdown-icon ${activeIndex === title ? 'rotate-icon' : ''}`}
            alt="dropdown icon"
          />
        </Accordion.Title>
        <Accordion.Content
          active={activeIndex === title}
          className="predmety__aside__dropdown-container"
        >
          {containerCmp}
        </Accordion.Content>
      </Accordion>
    </>
  );
});
