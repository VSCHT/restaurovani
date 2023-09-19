import React, { useContext, useEffect, useLocation } from "react";
import PropTypes from "prop-types";
import _isEmpty from "lodash/isEmpty";
import Overridable from "react-overridable";
import { withState, ActiveFilters } from "react-searchkit";
import { GridResponsiveSidebarColumn } from "react-invenio-forms";
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
  SearchBar,
  SearchConfigurationContext,
  
} from "@js/invenio_search_ui/components";
import { ResultOptions } from "@js/invenio_search_ui/components/Results";

const ResultOptionsWithState = withState(ResultOptions);

export const SearchAppLayout = ({ hasButtonSidebar }) => {
  const [sidebarVisible, setSidebarVisible] = React.useState(false);
  const [dropdownVisible, setDropdownVisible] = React.useState("");

  const showDropDown = (value) => {
    setDropdownVisible(value);
  };

  

  const { appName, buildUID } = useContext(SearchConfigurationContext);


  const searchAppConfig = useContext(SearchConfigurationContext);

  console.log(searchAppConfig)
const facetsAvailable = !_isEmpty(searchAppConfig.aggs);

  return (
    <Container className="predmety__body-bg">
      <Container className="pages__predmety">
        <Grid className="horiz-div">
          <Container className="horiz-div predmety__title-search-fixed">
            <Header className="predmety__title">Restaurovane predmety</Header>
            <Grid className="horiz-div predmety__title-search__searchbar">
              <SearchBar buildUID={buildUID} appName={appName} />
            </Grid>
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

              <Button
                className="predmety__aside__dropdown-btn"
                aria-label="Filter podle obdobi vzniku"
                onClick={() => showDropDown("obdobivzniku")}
              >
                Obdobi vzniku
                <Image
                  src="/static/images/chevron-down.png"
                  className="predmety__aside__dropdown-icon"
                  alt="dropdown icon"
                />
              </Button>
              {dropdownVisible === "obdobivzniku" && (
                <Grid className="predmety__aside__dropdown-container">
                  <Checkbox
                    value="filtrA"
                    name="Filtr A"
                    aria-label="Filter A"
                    label="Filtr A"
                  />

                  <Checkbox
                    value="filtrB"
                    name="Filtr B"
                    aria-label="Filter B"
                    label="Filtr B"
                  />

                  <Checkbox
                    value="filtrC"
                    name="Filtr C"
                    aria-label="Filter C"
                    label="Filtr C"
                  />
                </Grid>
              )}

              <Button
                className="predmety__aside__dropdown-btn"
                aria-label="Filter podle typu predmetu"
                onClick={() => showDropDown("typpredmetu")}
              >
                Typ predmetu
                <Image
                  src="/static/images/chevron-down.png"
                  className="predmety__aside__dropdown-icon"
                  alt="dropdown icon"
                />
              </Button>
              {dropdownVisible === "typpredmetu" && (
                <Grid className="predmety__aside__dropdown-container">
                  <Checkbox
                    value="filtrA"
                    name="Filtr A"
                    aria-label="Filter A"
                    label="Filtr A"
                  />

                  <Checkbox
                    value="filtrB"
                    name="Filtr B"
                    aria-label="Filter B"
                    label="Filtr B"
                  />

                  <Checkbox
                    value="filtrC"
                    name="Filtr C"
                    aria-label="Filter C"
                    label="Filtr C"
                  />
                </Grid>
              )}

              <Button
                className="predmety__aside__dropdown-btn"
                aria-label="Filter podle archeologickeho nalezu"
                onClick={() => showDropDown("archnalez")}
              >
                Archeologicky nalez
                <Image
                  src="/static/images/chevron-down.png"
                  className="predmety__aside__dropdown-icon"
                  alt="dropdown icon"
                />
              </Button>
              {dropdownVisible === "archnalez" && (
                <Grid className="predmety__aside__dropdown-container">
                  <Checkbox
                    value="filtrA"
                    name="Filtr A"
                    aria-label="Filter A"
                    label="Filtr A"
                  />

                  <Checkbox
                    value="filtrB"
                    name="Filtr B"
                    aria-label="Filter B"
                    label="Filtr B"
                  />

                  <Checkbox
                    value="filtrC"
                    name="Filtr C"
                    aria-label="Filter C"
                    label="Filtr C"
                  />
                </Grid>
              )}

              <Button
                className="predmety__aside__dropdown-btn"
                aria-label="Filter podle kategorie"
                onClick={() => showDropDown("kategorie")}
              >
                Kategorie
                <Image
                  src="/static/images/chevron-down.png"
                  className="predmety__aside__dropdown-icon"
                  alt="dropdown icon"
                />
              </Button>
              {dropdownVisible === "kategorie" && (
                <Grid className="predmety__aside__dropdown-container">
                  <Checkbox
                    value="filtrA"
                    name="Filtr A"
                    aria-label="Filter A"
                    label="Filtr A"
                  />

                  <Checkbox
                    value="filtrB"
                    name="Filtr B"
                    aria-label="Filter B"
                    label="Filtr B"
                  />

                  <Checkbox
                    value="filtrC"
                    name="Filtr C"
                    aria-label="Filter C"
                    label="Filtr C"
                  />
                </Grid>
              )}

              <Button
                className="btn predmety__aside__dropdown-btn"
                aria-label="Filter podle autoru zanamu"
                onClick={() => showDropDown("autorzaznamu")}
              >
                Autor zaznamu
                <Image
                  src="/static/images/chevron-down.png"
                  className="predmety__aside__dropdown-icon"
                  alt="dropdown icon"
                />
              </Button>
              {dropdownVisible === "autorzaznamu" && (
                <Grid className="predmety__aside__dropdown-container">
                  <Checkbox
                    value="filtrA"
                    name="Filtr A"
                    aria-label="Filter A"
                    label="Filtr A"
                  />

                  <Checkbox
                    value="filtrB"
                    name="Filtr B"
                    aria-label="Filter B"
                    label="Filtr B"
                  />

                  <Checkbox
                    value="filtrC"
                    name="Filtr C"
                    aria-label="Filter C"
                    label="Filtr C"
                  />
                </Grid>
              )}
              <Grid>
               <SearchAppFacets
                aggs={searchAppConfig.aggs}
                appName={appName}
                buildUID={buildUID}
              /></Grid>
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
