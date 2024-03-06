import React, { useContext, useEffect, useState } from "react";
import _isEmpty from "lodash/isEmpty";
import { SearchBar } from "react-searchkit";
import {
  Container,
  Grid,
  Button,
  Image,
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
            <Grid columns={2} className="spaced">
              <Grid.Column width={11}>
                <Header as="h2">Restaurované předměty</Header>
              </Grid.Column>

              <Grid.Column width={4}>
                <Grid.Row className="grid-searchbar">
                  <SearchBar />
                  <Button
                    className="transparent filter"
                    aria-label="Toggle Filter Menu"
                    onClick={toggleModal}
                  >
                    <Image
                      rel="icon"
                      src="/static/images/filter-icon.png"
                      alt="filter button"
                    />
                  </Button>
                </Grid.Row>
              </Grid.Column>
            </Grid>
          </Container>

          {/* search results */}
          <Grid.Column>
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
            width={6}
            className="aside"
          >
            <Image
              className="vsht-logo"
              src="/static/images/logoVSCHT_zakl.png"
              alt="VŠCHT logo"
            />
            <Grid.Column aria-label="Filter Options">
              <Button
                secondary
                aria-label="Vložit nový předmět"
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
          <Grid className="aside">
            <Grid.Column aria-label="Filter Options">
              <Header as="h3">Filtrování výsledků</Header>
              <SearchAppFacets aggs={searchAppConfig.aggs} appName={appName} />
            </Grid.Column>
            <Button
              className="close"
              aria-label="Toggle Filter Menu"
              onClick={toggleModal}
            >
              <Image
                rel="icon"
                src="/static/images/close-icon.png"
                alt="close filter button"
              />
            </Button>
          </Grid>
        </Modal>
      </Grid>
    </Container>
  );
};
