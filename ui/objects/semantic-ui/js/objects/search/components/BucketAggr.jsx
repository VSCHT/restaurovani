import {
  List,
  Checkbox,
  Accordion,
  Label,
  Icon,
} from "semantic-ui-react";
import { withState } from "react-searchkit";
import React from "react";

export const MyBucketAggregationValues = withState(
  ({
    bucket,
    onFilterClicked,
    isSelected,
    childAggCmps
  }) => {

    return (
      <>
        <List.Item key={bucket.key}>
          <Checkbox
            value={bucket.key}
            onClick={() => onFilterClicked(bucket.key)}
            checked={isSelected}
          />
          <Label size="large">{bucket.label}</Label>{" "}
          <Label size="large">{bucket.doc_count}</Label> {childAggCmps}
        </List.Item>
      </>
    );
  }
);

export const MyBucketAggregation = withState(
  ({ title, containerCmp }) => {
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
              {" "}
              {title}
              <Icon name="chevron down" />
            </Accordion.Title>
            <Accordion.Content active={activeIndex === title}>
              {containerCmp}
            </Accordion.Content>
          </Accordion>
      </>
    );
  }
);
