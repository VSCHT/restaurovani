import React from "react";
import { Label, Grid, Icon } from "semantic-ui-react";
import { getCaption } from "./index";

export const FilesSection = ({ filesCollection }) => {
  return (
    <Grid columns={2}>
      <Grid.Column>
        <Label className="bold">Dokumenty</Label>
      </Grid.Column>
      <Grid.Column data-tesid='document-section'>
        {filesCollection?.map((file, index) => (
          <Grid.Row key={index}>
            <Icon name="file alternate outline" />
            <a href={file.links.content}>{getCaption(file)}</a>
          </Grid.Row>
        ))}
      </Grid.Column>
    </Grid>
  );
};
