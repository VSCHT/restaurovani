import React, { useContext, useEffect, useLocation } from "react";
import PropTypes from "prop-types";
import _isEmpty from "lodash/isEmpty";
import Overridable from "react-overridable";
import {
  withState,
  ActiveFilters,
  BucketAggregation,
  SearchBar,
} from "react-searchkit";
import { GridResponsiveSidebarColumn } from "react-invenio-forms";
import {
  Container,
  Grid,
  Button,
  Image,
  Checkbox,
  Label,
  Header,
  Sidebar
} from "semantic-ui-react";
import { i18next } from "@translations/oarepo_ui/i18next";
import {
  SearchAppFacets,
  SearchAppResultsPane,
  SearchConfigurationContext,
} from "@js/invenio_search_ui/components";
import { ResultOptions } from "@js/invenio_search_ui/components/Results";
import store from './store'
import { Provider } from 'react-redux'

const ResultOptionsWithState = withState(ResultOptions);

export const SearchAppLayout = ({ hasButtonSidebar }) => {
  const [sidebarVisible, setSidebarVisible] = React.useState(window.innerWidth >= 992);
  const [dropdownVisible, setDropdownVisible] = React.useState("");

  const showDropDown = (value) => {
    setDropdownVisible(value);
    console.log("visible" + dropdownVisible);
  };
  const toggleDropDown = (title) => {
    setDropdownVisible((prevState) => (prevState === title ? "" : title));
  };

  const toggleSidebar = (e) => {
    console.log('start')
    e.preventDefault()
    setSidebarVisible(!sidebarVisible);
    console.log(sidebarVisible)
  };
  const togglemenu = () => {
    const asideElement = document.getElementById('predmety__aside');
    console.log(asideElement)
    if (asideElement.classList.contains('hide-important')) {
      asideElement.classList.remove('hide-important');
    } else {
      asideElement.classList.add('hide-important');
    }
  };

  const { appName, buildUID } = useContext(SearchConfigurationContext);

  const searchAppConfig = useContext(SearchConfigurationContext);
console.log(searchAppConfig)

  return (
    
    <Container className="predmety__body-bg">
      <Container className=" predmety__body-bg pages__predmety">
        <Grid className="horiz-div">
          
          <Grid className="vert-div predmety_main-container">

          <Container className="horiz-div predmety__title-search-fixed">
            <Grid.Row  className="horiz-div predmety__title-search">
            <Header className="predmety__title">Restaurovane predmety</Header>

            <Grid className="horiz-div predmety__title-search__searchbar">
              <SearchBar />
              <Button
                  className="btn predmety__input-search__searchbar-burger"
                  aria-label="Toggle Filter Menu"
                  onClick={(e)=>toggleSidebar(e)}
                >
                  <Image
                    rel="icon"
                    src="/static/images/menu-icon-black.png"
                    alt="burger filter button"
                  />
                </Button>
            </Grid>
            </Grid.Row>
          </Container>


            <Grid className="vert-div predmety__cards">
              <SearchAppResultsPane
                layoutOptions={searchAppConfig.layoutOptions}
                appName={appName}
                buildUID={buildUID}
              />
            </Grid>
          </Grid>


          <Sidebar
        as={Grid.Column}
        animation="overlay"
        icon="labeled"
        
        onHide={() => setSidebarVisible(false)}
        visible={sidebarVisible}
        width="wide"
      >

      
          <Grid.Column className="vert-div predmety__aside" id='predmety__aside'>
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

            <Button
                  className="btn predmety__input-search__searchbar-burger btn-close"
                  aria-label="Toggle Filter Menu"
                  onClick={(e)=>toggleSidebar(e)}
                >
                  <Image
                    rel="icon"
                    src="/static/images/close-icon.png"
                    alt="burger filter button"
                  />
                </Button>
            <Grid
              className="vert-div predmety__aside__filter"
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

              
                  <SearchAppFacets
                    aggs={searchAppConfig.aggs}
                    appName={appName}
                  />
            </Grid>
          </Grid.Column>
          </Sidebar>
        </Grid>
      </Container>
    </Container>
    
  )
};
