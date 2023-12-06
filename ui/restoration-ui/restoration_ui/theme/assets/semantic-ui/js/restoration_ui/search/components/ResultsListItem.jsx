import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import Overridable from "react-overridable";
import _get from "lodash/get";

import { Grid, Item, Button } from "semantic-ui-react";
import { withState, buildUID } from "react-searchkit";
import { SearchConfigurationContext } from "@js/invenio_search_ui/components";
import {ImageWithFallback} from "./imgFallback"

const ItemHeader = ({ title, searchUrl, selfLink }) => {
  const [smallScreen, setSmallScreen] = React.useState(
    window.innerWidth <= 730
  );

  useEffect(() => {
    function updateDescVisibility() {
      if (window.innerWidth >= 730) {
        setSmallScreen(false);
      } else {
        setSmallScreen(true);
      }
    }

    updateDescVisibility();

    window.addEventListener("resize", updateDescVisibility);

    return () => {
      window.removeEventListener("resize", updateDescVisibility);
    };
  }, []);

  const viewLink = new URL(
    selfLink,
    new URL(searchUrl, window.location.origin)
  );
  let truncatedTitle =
    title.length > 10 && smallScreen ? title.substring(0, 10) + "..." : title;
  return (
    <Item.Header className="predmety__card__title">
      <a href={viewLink}>{truncatedTitle}</a>
    </Item.Header>
  );
};

const DetailsButton = ({ searchUrl, selfLink }) => {
  const viewLink = new URL(
    selfLink,
    new URL(searchUrl, window.location.origin)
  );
  return (
    <Button
      className="predmety__card__btn"
      aria-label="Tlacitko tevrit detaily"
    >
      <a href={viewLink}>DETAIL</a>
    </Button>
  );
};

export const ResultsListItemComponent = ({ result, appName }) => {
  const [wideScreen, setWideScreen] = React.useState(window.innerWidth >= 1200);

  useEffect(() => {
    function updateDescVisibility() {
      if (window.innerWidth <= 992) {
        setWideScreen(false);
      } else {
        setWideScreen(true);
      }
    }

    updateDescVisibility();

    window.addEventListener("resize", updateDescVisibility);

    return () => {
      window.removeEventListener("resize", updateDescVisibility);
    };
  }, []);

  const searchAppConfig = useContext(SearchConfigurationContext);

  const title = _get(result, "metadata.restorationObject.title", "<no title>");

  const restorer = _get(
    result,
    "metadata.restorationWork.restorer",
    "<no data>"
  );
  const desc = _get(
    result,
    "metadata.restorationWork.abstract",
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
            
            <ImageWithFallback src="/static/images/image-noimage.png" fallbackSrc="/static/images/image-404.png"   result={result} classN=''/>
           
          </Grid>
          <Item.Content className="vert-div predmety__card__info">
            <Grid.Column className="vert-div predmety__card__main-info">
              <ItemHeader
                className="predmety__card__title"
                title={title}
                searchUrl={searchAppConfig.ui_endpoint}
                selfLink={`${result.id}`}
              />
              <Item.Description className="parag">{restorer}</Item.Description>
              {/*  {wideScreen && <Item.Description className="parag">{desc.substring(0,70)}...</Item.Description>
              } */}
            </Grid.Column>
            <Item.Group className="horiz-div predmety__card__extra-info">
              <Item.Extra className="horiz-div predmety__card__extra-info">
              <p className="parag">Vloženo: {created}</p>
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