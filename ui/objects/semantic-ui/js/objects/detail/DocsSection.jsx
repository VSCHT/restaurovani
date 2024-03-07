import React from "react";
import {
  Image,
  Label,
  Grid,
} from "semantic-ui-react";


export const FilesSection = ({ filesCollection, fileName }) => {
  return (
    <Grid columns={2}>
      <Grid.Column>
        <Label className="bold">Dokumenty</Label>
      </Grid.Column>
      <Grid.Column>
        {filesCollection?.map((file, index) => (
          <Grid.Row key={index}>
            <Image src="/static/images/file-icon.png" alt="file icon" />

            <a href={file.links.content}>{fileName(file)}</a>
          </Grid.Row>
        ))}
      </Grid.Column>
    </Grid>
  );
};
