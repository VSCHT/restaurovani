import React from "react";
import { Image, Label, Grid } from "semantic-ui-react";

export const FilesSection = ({ filesCollection }) => {
  return (
    <Grid columns={2}>
      <Grid.Column>
        <Label className="bold">Dokumenty</Label>
      </Grid.Column>
      <Grid.Column>
        {filesCollection?.map((file, index) => (
          <Grid.Row key={index}>
            <Image src="/static/images/file-icon.png" alt="file icon" />

            <a href={file.links.content}>
              {file?.metadata.caption === "default_image_name" ||
              file?.metadata.caption == 0
                ? file?.key
                : file?.metadata.caption}
            </a>
          </Grid.Row>
        ))}
      </Grid.Column>
    </Grid>
  );
};
