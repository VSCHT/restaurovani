import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import {
  Modal,
  Image,
  Button,
  Loader,
  Label,
  Grid,
  Header
} from "semantic-ui-react";


export const FilesSection = ({ files }) => {
    return files?.some((file) => file.metadata.fileType === "document") ? (
      <Grid columns={2}>
        <Grid.Column><Label className="bold">Dokumenty</Label></Grid.Column>
        <Grid.Column>
          {files?.map((file, index) => {
            if (
              file?.metadata?.fileType === "document" ||
              file?.mimetype?.startsWith("application")
            ) {
              return (
                <Grid.Row key={index}>
                  <Image src="/static/images/file-icon.png" alt="file icon" />
  
                  <a href={file.links.content}>{fileName(file)}</a>
                </Grid.Row>
              );
            }
          })}
        </Grid.Column>
      </Grid>
    ) : null;
  };
  