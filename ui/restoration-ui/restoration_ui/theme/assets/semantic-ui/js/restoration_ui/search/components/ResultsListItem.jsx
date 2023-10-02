import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import Overridable from "react-overridable";
import _get from "lodash/get";

import {
  Grid,
  Item,
  Label,
  List,
  Icon,
  Image,
  Button,
} from "semantic-ui-react";
import { withState, buildUID } from "react-searchkit";
import { SearchConfigurationContext } from "@js/invenio_search_ui/components";

import { i18next } from "@translations/restoration_ui/i18next";

const ItemHeader = ({ title, searchUrl, selfLink }) => {
  const viewLink = new URL(
    selfLink,
    new URL(searchUrl, window.location.origin)
  );
  return (
    <Item.Header className="predmety__card__title">
      <a href={viewLink}>{title}</a>
    </Item.Header>
  );
};

const DetailsButton = ({ title, searchUrl, selfLink }) => {
  const viewLink = new URL(selfLink, window.location.origin);

  return (
    <Button
      className="predmety__card__btn"
      aria-label="Tlacitko tevrit detaily"
    >
      <a className="predmety__card__btn" href={viewLink}>
        DETAIL
      </a>
    </Button>
  );
};

export const ResultsListItemComponent = ({
  currentQueryState,
  result,
  appName,
  ...rest
}) => {
  const [wideScreen, setWideScreen] = React.useState(
    window.innerWidth >= 1200
  );
  const handleResize = () => {
    setIsMobile(window.innerWidth < 992);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); 
  const searchAppConfig = useContext(SearchConfigurationContext);
console.log(searchAppConfig)
  const title = _get(
    result,
    "metadata.restorationObject.title",
    "<no title>"
  )[0].value;

  const restorer = _get(
    result,
    "metadata.restorationWork.restorer",
    "<no data>"
  );
  const desc = _get(
    result,
    "metadata.restorationWork.abstract[0].value",
    "<no data>"
  );

  const created = _get(result, "created", "<no data>");

  return (
    <Overridable
      id={buildUID("RecordsResultsListItem.layout", "", appName)}
      result={result}
      title={title}
    >
      <Grid className="predmety__card" key={result.id}>
        <Item className="horiz-div predmety__card-content">
          <Grid className="predmety__card__img-container">
            <Item.Image
              src="/static/images/img_placeholder.png"
              alt="foto predmetu"
            />
          </Grid>
          <Item.Content className="vert-div predmety__card__info">
            <Grid.Column className="vert-div predmety__card__main-info">
              <ItemHeader
                className="predmety__card__title"
                title={title}
                searchUrl={searchAppConfig.ui_endpoint}
                selfLink={`${result.id}/edit`}
              />
              <Item.Description className="parag">{restorer}</Item.Description>
              {/* {wideScreen && <Item.Description className="parag">{desc.substring(0,100)} ...</Item.Description>
              } */}
              
            </Grid.Column>
            <Item.Group className="horiz-div predmety__card__extra-info">
              <Item.Extra className="horiz-div predmety__card__extra-info">
                <p class="parag">Vlozeno: {created.slice(0, 12)}</p>
              </Item.Extra>
              <DetailsButton
                className="predmety__card__btn"
                searchUrl={searchAppConfig.ui_endpoint}
                selfLink={`${result.id}`}
              />
            </Item.Group>
          </Item.Content>
        </Item>
      </Grid>
    </Overridable>
  );
};

ResultsListItemComponent.propTypes = {
  currentQueryState: PropTypes.object,
  result: PropTypes.object.isRequired,
  appName: PropTypes.string,
};

ResultsListItemComponent.defaultProps = {
  currentQueryState: null,
  appName: "",
};

export const ResultsListItem = (props) => {
  return (
    <Overridable id={buildUID("ResultsListItem", "", props.appName)} {...props}>
      <ResultsListItemComponent {...props} />
    </Overridable>
  );
};

ResultsListItem.propTypes = {
  currentQueryState: PropTypes.object,
  result: PropTypes.object.isRequired,
  appName: PropTypes.string,
};

ResultsListItem.defaultProps = {
  currentQueryState: null,
  appName: "",
};

export const ResultsListItemWithState = withState(
  ({ currentQueryState, updateQueryState, result, appName }) => (
    <ResultsListItem
      currentQueryState={currentQueryState}
      updateQueryState={updateQueryState}
      result={result}
      appName={appName}
    />
  )
);

ResultsListItemWithState.propTypes = {
  currentQueryState: PropTypes.object,
  result: PropTypes.object.isRequired,
};

ResultsListItemWithState.defaultProps = {
  currentQueryState: null,
};
