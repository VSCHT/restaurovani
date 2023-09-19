import React, { useContext, useEffect, useLocation } from "react";
import PropTypes from "prop-types";
import _isEmpty from "lodash/isEmpty";
import Overridable from "react-overridable";
import { withState, ActiveFilters } from "react-searchkit";
import { GridResponsiveSidebarColumn } from "react-invenio-forms";
import { BucketAggregation , SearchBar} from "react-searchkit";
import {
  Container,
  Grid,
  Button,
  Image,
  Checkbox,
  Label,
  Header,
} from "semantic-ui-react";
import { i18next } from "@translations/oarepo_ui/i18next";
import {
  SearchAppFacets,
  SearchAppResultsPane,
//   SearchBar,
  SearchConfigurationContext,
} from "@js/invenio_search_ui/components";
import { ResultOptions } from "@js/invenio_search_ui/components/Results";

const ResultOptionsWithState = withState(ResultOptions);

export const SearchAppLayout = ({ hasButtonSidebar, config }) => {
  const [sidebarVisible, setSidebarVisible] = React.useState(false);
  const [dropdownVisible, setDropdownVisible] = React.useState("");

  const showDropDown = (value) => {
    if (dropdownVisible !== value) {
      setDropdownVisible(value);
    } else {
      setDropdownVisible("");
    }
  };

  const { appName, buildUID } = useContext(SearchConfigurationContext);

  const searchAppConfig = useContext(SearchConfigurationContext);

  return (
    <Container className="predmety__body-bg">
      <Container className="pages__predmety">
        <Grid className="horiz-div">
          <Container className="horiz-div predmety__title-search-fixed">
            {/* <SearchBar/> */}
            <Header className="predmety__title">Restaurovane predmety</Header>
            <SearchBar/>
            {/* <Grid className="horiz-div predmety__title-search__searchbar"> */}
              {/* <SearchBar buildUID={buildUID} appName={appName} /> */}
            {/* </Grid> */}
          </Container>
          <Grid className="vert-div predmety_main-container">
            <Grid className="vert-div predmety__cards">
              <SearchAppResultsPane
                layoutOptions={searchAppConfig.layoutOptions}
                appName={appName}
                buildUID={buildUID}
              />
            </Grid>
          </Grid>
          <Grid.Column className="vert-div predmety__aside">
            <Grid.Row className="vsht-logo div__vsht-logo predmety__div__vsht-logo">
              <Image
                className="vsht-logo image__vsht-logo predmety__image__vsht-logo"
                src="/static/images/logo_VSHT.png"
                alt="vsht logo"
              />
              <Label className="vsht-logo text__vsht-logo predmety__text__vsht-logo">
                VYSOKÁ ŠKOLA
                <br />
                CHEMICKO-TECHNOLOGICKÁ
                <br />V PRAZE
              </Label>
            </Grid.Row>
            <Grid
              class="vert-div predmety__aside__filter"
              aria-label="Filter Options"
            >
              <Button
                className="predmety__aside__btn"
                aria-label="Tlacitko dodat novy predmet"
              >
                Novy predmet
                <Image
                  src="/static/images/plus-square.png"
                  alt="add new icon"
                />
              </Button>

              {/* <div style={{ overflowY: "auto", maxHeight: "100%" }}> */}
                {searchAppConfig.aggs.map((agg) => {
                  return (
                    <>
                      <Button
                        className="btn predmety__aside__dropdown-btn"
                        aria-label="Filter podle autoru zanamu"
                        onClick={() => showDropDown(agg.title)}
                      >
                        {agg.title}
                        <Image
                          src="/static/images/chevron-down.png"
                          className="predmety__aside__dropdown-icon"
                          alt="dropdown icon"
                        />
                      </Button>
                      {dropdownVisible === agg.title && (
                        <BucketAggregation
                          key={agg.aggField}
                          title={agg.title}
                          agg={agg}
                        />
                      )}
                    </>
                  );
                })}
              {/* </div> */}
            </Grid>
          </Grid.Column>
        </Grid>
      </Container>
    </Container>
  );
};

// SearchAppLayout.propTypes = {
//   config: PropTypes.shape({
//     searchApi: PropTypes.object.isRequired, // same as ReactSearchKit.searchApi
//     initialQueryState: PropTypes.shape({
//       queryString: PropTypes.string,
//       sortBy: PropTypes.string,
//       sortOrder: PropTypes.string,
//       page: PropTypes.number,
//       size: PropTypes.number,
//       hiddenParams: PropTypes.array,
//       layout: PropTypes.oneOf(["list", "grid"]),
//     }),
//   }),
// };
