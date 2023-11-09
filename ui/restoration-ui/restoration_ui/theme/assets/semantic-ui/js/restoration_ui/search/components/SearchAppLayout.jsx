import React, { useContext, useEffect, useState } from "react";
import _isEmpty from "lodash/isEmpty";
import { SearchBar } from "react-searchkit";
import {
  Container,
  Grid,
  Button,
  Image,
  Label,
  Header,
  Modal,
} from "semantic-ui-react";
import {
  SearchAppFacets,
  SearchAppResultsPane,
  SearchConfigurationContext,
} from "@js/invenio_search_ui/components";

export const SearchAppLayout = () => {
  const [sidebarVisible, setSidebarVisible] = React.useState(
    window.innerWidth >= 992
  );

  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const toggleSidebar = (e) => {
    e.preventDefault();
    setSidebarVisible(!sidebarVisible);
  };

  useEffect(() => {
    function updateSidebarVisibility() {
      if (window.innerWidth <= 992) {
        setSidebarVisible(false);
      } else {
        setSidebarVisible(true);
        setModalOpen(false);
      }
    }

    updateSidebarVisibility();

    window.addEventListener("resize", updateSidebarVisibility);

    return () => {
      window.removeEventListener("resize", updateSidebarVisibility);
    };
  }, []);

  const { appName, buildUID } = useContext(SearchConfigurationContext);

  const searchAppConfig = useContext(SearchConfigurationContext);

  const createNewHandler = () => {
    window.location.href = new URL(searchAppConfig.ui_links.create);
  };
  return (
    <Container className="predmety__body-bg">
      <Container className=" predmety__body-bg pages__predmety">
        <Grid className="horiz-div">
          <Grid className="vert-div predmety_main-container">
            <Container className="horiz-div predmety__title-search-fixed">
              <Grid.Row className="horiz-div predmety__title-search">
                <Header className="predmety__title">
                  Restaurované předměty
                </Header>

                <Grid className="horiz-div predmety__title-search__searchbar">
                  <SearchBar />
                  <Button
                    className="btn predmety__input-search__searchbar-burger"
                    aria-label="Toggle Filter Menu"
                    onClick={toggleModal}
                  >
                    <Image
                      rel="icon"
                      src="/static/images/filter-icon.png"
                      alt="filter button"
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

          {sidebarVisible && (
            <Grid.Column
              className="vert-div predmety__aside"
              id="predmety__aside"
            >
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
                onClick={(e) => toggleSidebar(e)}
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
                  onClick={createNewHandler}
                >
                  Nový předmět
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
          )}

          <Modal
            as={Grid.Column}
            animation="overlay"
            icon="labeled"
            open={modalOpen}
            onClose={toggleModal}
          >
            <Grid.Column
              className="vert-div predmety__aside"
              id="predmety__aside"
            >
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
                onClick={toggleModal}
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
                <h2>Filtrování výsledků</h2>
                <SearchAppFacets
                  aggs={searchAppConfig.aggs}
                  appName={appName}
                />
              </Grid>
            </Grid.Column>
          </Modal>
        </Grid>
      </Container>
    </Container>
  );
};
