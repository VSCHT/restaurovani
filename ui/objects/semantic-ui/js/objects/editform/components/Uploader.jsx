import React from "react";
import { Button, Icon } from "semantic-ui-react";
import FileManagementDialog from "@oarepo/file-manager";

export const PDFUploader = ({ fetchData, record }) => {
  const TriggerComponent = ({ onClick, ...props }) => (
    <Button onClick={onClick} {...props}>
      Nahrát Dokumenty
    </Button>
  );

  return (
    <FileManagementDialog 
      TriggerComponent={TriggerComponent}
      config={{ record: record }}
      locale="cs_CZ"
      autoExtractImagesFromPDFs={false}
      allowedFileTypes={["application/pdf"]}
      allowedMetaFields={[
        {
          id: "caption",
          defaultValue: "default_pdf_name",
          isUserInput: true,
        },
        { id: "featured", defaultValue: false, isUserInput: true },
      ]}
      startEvent={{ event: "upload-file-without-edit" }}
      onCompletedUpload={(result) => {
        if (result?.successful.length > 0) {
          fetchData();
        }
      }}
    />
  );
};

export const ImageUploader = ({ fetchData, record }) => {
  const TriggerComponent = ({ onClick, ...props }) => (
    <Button onClick={onClick} {...props}>
      Nahrát Obrázky
    </Button>
  );

  return (
    <FileManagementDialog 
      TriggerComponent={TriggerComponent}
      config={{ record: record }}
      autoExtractImagesFromPDFs={true}
      locale="cs_CZ"
      allowedFileTypes={["image/*", "application/pdf"]}
      allowedMetaFields={[
        {
          id: "caption",
          defaultValue: "default_image_name",
          isUserInput: true,
        },
        { id: "featured", defaultValue: false, isUserInput: true },
      ]}
      onCompletedUpload={(result) => {
        if (result?.successful.length > 0) {
          fetchData();
        }
      }}
    />
  );
};

export const FileMetadataEditor = ({ fetchData, record, fileKey }) => {
  const TriggerComponent = ({ onClick, ...props }) => (
    <Button onClick={onClick} icon size="small" className="transparent" title="Editovat" {...props}>
      <Icon name="pencil" link aria-label="Ikona tužky" />
    </Button>
  );

  return (
    <FileManagementDialog 
      TriggerComponent={TriggerComponent}
      config={{ record: record }}
      autoExtractImagesFromPDFs={false}
      locale="cs_CZ"
      startEvent={{ event: "edit-file", data: { file_key: fileKey } }}
      allowedMetaFields={[
        {
          id: "caption",
          defaultValue: "default_image_name",
          isUserInput: true,
        },
        { 
          id: "featured", 
          defaultValue: false, 
          isUserInput: true 
        },
      ]}
      onCompletedUpload={(result) => {
        if (result?.successful.length > 0) {
          fetchData();
        }
      }}
    />
  );
};

export const PDFImageExtractor = ({ fetchData, record, fileKey }) => {
  const TriggerComponent = ({ onClick, ...props }) => (
    <Button onClick={onClick} size="small" className="transparent" title="Extrahovat obrázky" {...props}>
      <Icon name="images" link aria-label="Ikona obrázku" />
    </Button>
  );

  return (
    <FileManagementDialog
      TriggerComponent={TriggerComponent}
      config={{ record: record }}
      autoExtractImagesFromPDFs={true}
      locale="cs_CZ"
      startEvent={{
        event: "upload-images-from-pdf",
        data: { file_key: fileKey },
      }}
      allowedMetaFields={[
        {
          id: "caption",
          defaultValue: "default_image_name",
          isUserInput: true,
        },
        { id: "featured", defaultValue: false, isUserInput: true },
      ]}
      onCompletedUpload={(result) => {
        if (result?.successful.length > 0) {
          fetchData();
        }
      }}
    />
  );
};
