import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Overridable from "react-overridable";
import _get from "lodash/get";

import {
  Item,
  Button,
  ItemContent,
  ItemDescription,
  ItemExtra,
  Label,
  ItemImage,
} from "semantic-ui-react";
import { withState, buildUID } from "react-searchkit";
import { SearchConfigurationContext } from "@js/invenio_search_ui/components";
import { getCaption } from "../../detail";

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
    <Item.Header>
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
    <Button primary floated="right" aria-label="Zobrazit detail předmětu">
      <a href={viewLink}>DETAIL</a>
    </Button>
  );
};

export const ResultsListItemComponent = ({ result, appName }) => {
  const [objectImages, setObjectImages] = useState([]);

  useEffect(() => {
    fetch(result?.links?.files)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
      })
      .then(async (res) => {
        const imageEntries = res?.entries?.filter(
          (item) => item.metadata.fileType === "photo"
        );

        const fImg = imageEntries.filter(
          (item) => item.metadata.featured == true
        );
        const rImg = imageEntries?.[0];
        fImg.length == 1 ? setObjectImages(fImg[0]) : setObjectImages(rImg);
      })

      .catch(() => {
        setObjectImages([]);
      });
  }, [result]);

  const searchAppConfig = useContext(SearchConfigurationContext);

  const title = _get(result, "metadata.restorationObject.title", "<no title>");

  const restorer = _get(
    result,
    "metadata.restorationWork.restorer",
    "<no data>"
  );

  const created = _get(result, "created", "<no data>");
  const creationDate= new Date(created).toISOString().slice(0, 10);
  

  return (
    <Overridable
      id={buildUID("RecordsResultsListItem.layout", "", appName)}
      result={result}
      title={title}
    >
      <Item key={result.id}>
        <ItemImage
          size="tiny"
          src={
            objectImages?.links?.content ?? "/static/images/image-noimage.png"
          }
          alt={getCaption(objectImages)}
        />
        {/* url */}
        <ItemContent>
          <ItemHeader
            title={title}
            searchUrl={searchAppConfig.ui_endpoint}
            selfLink={`${result.id}`}
          />
          <ItemDescription>{restorer}</ItemDescription>
          <ItemExtra>
            <Label size="large">
              Vloženo:{" "}
              {creationDate}{" "}
            </Label>
            <DetailsButton
              searchUrl={searchAppConfig.ui_endpoint}
              selfLink={`${result.id}`}
            />
          </ItemExtra>
        </ItemContent>
      </Item>
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
