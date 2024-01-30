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
    <Container className="search-container">
      <Grid columns={2} className="double gapped">
        {/* first column-  main content */}
        <Grid.Column width={12}>

          {/* header and searchbar */}
          <Container>
            <Grid columns={2}>

              <Grid.Column width={11}>
              <Header as="h2">
                Restaurované předměty
              </Header>
            </Grid.Column>

            <Grid.Column width={4}>
              <Grid.Row className="grid-searchbar">
                <SearchBar />
                {/* <Button
                  transparent
                  className=""
                  aria-label="Toggle Filter Menu"
                  onClick={toggleModal}
                >
                  <Image
                    rel="icon"
                    src="/static/images/filter-icon.png"
                    alt="filter button"
                  />
                </Button> */}
              </Grid.Row>
              </Grid.Column>

            </Grid>
          </Container>


          {/* search results */}
          <Grid.Column className="predmety__cards">
            <SearchAppResultsPane
              layoutOptions={searchAppConfig.layoutOptions}
              appName={appName}
              buildUID={buildUID}
            />
          </Grid.Column>
        </Grid.Column>

        {/* second column - facets */}
        {sidebarVisible && (
          <Grid.Column
            width={5}
            className="predmety__aside"
            id="predmety__aside"
          >
            <Image
              className="vsht-logo"
              src="/static/images/logoVSCHT_zakl.png"
              alt="vsht logo"
            />

            {/* <Button
              className="btn predmety__input-search__searchbar-burger btn-close"
              aria-label="Toggle Filter Menu"
              onClick={(e) => toggleSidebar(e)}
            >
              <Image
                rel="icon"
                src="/static/images/close-icon.png"
                alt="burger filter button"
              />
            </Button> */}
            <Grid.Column
              className="predmety__aside__filter"
              aria-label="Filter Options"
            >
              <Button
                secondary
                aria-label="Tlacitko dodat novy predmet"
                onClick={createNewHandler}
              >
                Nový předmět
                <Image
                  src="/static/images/plus-square.png"
                  alt="add new icon"
                />
              </Button>

              <SearchAppFacets aggs={searchAppConfig.aggs} appName={appName} />
            </Grid.Column>
          </Grid.Column>
        )}

        <Modal
          as={Grid.Column}
          animation="overlay"
          icon="labeled"
          open={modalOpen}
          onClose={toggleModal}
        >
          <Grid className="predmety__aside" id="predmety__aside">
            <Grid.Column
              className="vert-div predmety__aside__filter"
              aria-label="Filter Options"
            >
              <h2>Filtrování výsledků</h2>
              <SearchAppFacets aggs={searchAppConfig.aggs} appName={appName} />
            </Grid.Column>
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
          </Grid>
        </Modal>
      </Grid>
      </Container>
  );
};
