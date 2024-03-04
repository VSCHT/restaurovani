import React from "react";
import {
  Grid,
  Header,
  Button,
  Icon,
  Segment,
  Divider,
} from "semantic-ui-react";

export const EmptyResultsElement = ({
  queryString,
  searchPath,
  resetQuery,
}) => {
  return (
    <Grid columns={1}>
      <Divider/>
      <Grid.Row centered>
        <Grid.Column width={12} textAlign="center">
          <Header as="h3">
            We couldn't find any matches for{" "}
            {(queryString && `'${queryString}'`) || "your search"}
          </Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column width={12} textAlign="center">
          <Button
            primary
            onClick={resetQuery}
          >
            <Icon name="search" />
            Start over
          </Button>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column width={12}>
          <Segment secondary padded size="large">
            <Header as="h3" size="small">
              ProTip!
            </Header>
            <p>
              <a
                href={`${searchPath}?q=metadata.publication_date:[2017-01-01 TO *]`}
              >
                metadata.publication_date:[2017-01-01 TO *]
              </a>
              will give you all the publications from 2017 until today.
            </p>
            <p>
              For more tips, check out our
              <a href="/help/search" title="Search guide">
                search guide
              </a>
              for defining advanced search queries.
            </p>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
