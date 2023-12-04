import React, { useState, useEffect } from "react";
import {
  Icon,
  Button,
  Table,
  Tab,
  Confirm,
  Modal,
  Image,
  Pagination,
} from "semantic-ui-react";
import {
  ReactWrapperPdf,
  ReactWrapperImg,
  EditWrapper,
  ExtractWrapper,
} from "./Uploader";
import FileManagementDialog from "@oarepo/file-manager";

export const FileStat = ({ apiUrl, record }) => {
  const [data, setData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activePage, setActivePage] = useState(1);

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.log("Error fetching data");
    }
  };

  // fetching data
  useEffect(() => {
    fetchData();
  }, [apiUrl]);

  if (!data) {
    return <p>Loading...</p>;
  }

  // converting file size
  function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = [
      "Bytes",
      "KiB",
      "MiB",
      "GiB",
      "TiB",
      "PiB",
      "EiB",
      "ZiB",
      "YiB",
    ];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  // button for extracting images from pdf
  const extractImg = (key, record) => {
    return (
      <ExtractWrapper
        preactComponent={FileManagementDialog}
        props={{
          config: { record: record },
          autoExtractImagesFromPDFs: true,
          locale: "cs_CS",
          startEvent: {
            event: "upload-images-from-pdf",
            data: { file_key: key },
          },
          allowedMetaFields: [
            {
              id: "caption",
              defaultValue: "default_image_name",
              isUserInput: true,
            },
            { id: "featured", defaultValue: false, isUserInput: true },
          ],
        }}
      />
    );
  };

  // delete button

  const DeleteButton = ({ apiUrl }) => {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const handleDelete = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        console.log("Error deleting data");
      } finally {
        setConfirmOpen(false);
        fetchData()
      }
    };

    return (
      <>
        <Button
          className="form__stat__btn"
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name="delete" />
        </Button>
        <Confirm
          open={confirmOpen}
          content={"Chcete smazat?"}
          cancelButton={"Zrušit"}
          confirmButton={"Ano"}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={handleDelete}
        />
      </>
    );
  };

  // button for file edit
  const editFile = (key, record) => {
    return (
      <>
        <EditWrapper
          fetchData={fetchData}
          preactComponent={FileManagementDialog}
          props={{
            config: { record: record },
            autoExtractImagesFromPDFs: false,
            locale: "cs_CS",
            startEvent: { event: "edit-file", data: { file_key: key } },
            onSuccessfulUpload: () => fetchData(),
            onFailedUpload: () => fetchData(),
          }}
        />
      </>
    );
  };

  // table's body

  const itemsPerPage = 5;

  const changePage = (e, { activePage }) => {
    setActivePage(activePage);
  };

  const renderTableBody = (fileTypeFilter) => {
    const fileName = (d) => {
      if (d.metadata && d.metadata?.caption) {
        if (
          d.metadata.caption === "default_image_name" ||
          d.metadata.caption === "default_pdf_name" ||
          Object.values(d.metadata.caption).length === 0
        ) {
          return  d.key.length > 15 ?  d.key.substring(0, 15) + "..." :  d.key;
        } else {
          return  d.metadata.caption.length > 15  ?  d.metadata.caption.substring(0, 15) + "..." :  d.metadata.caption;
        }
      } else {
        return d.key.length > 15  ?  d.key.substring(0, 15) + "..." :  d.key;
      }
    };

    const typeAmount = data?.entries?.filter(
      (d) => d.metadata.fileType === fileTypeFilter
    );
    const slicedData = data?.entries
      ?.filter((d) => d.metadata.fileType === fileTypeFilter)
      .slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);

    if (!typeAmount || typeAmount.length === 0) {
      return null;
    }

    return (
      <Table.Body>
        {slicedData?.map((d, index) => (
          <Table.Row key={d.key}>
            {d.metadata.fileType === "photo" && (
              <Table.Cell
                className="form__attach__title"
                onClick={() => {
                  setSelectedImage(index);
                  setModalOpen(true);
                }}
              >
               
                {fileName(d)}{" "}
              </Table.Cell>
            )}
            {d.metadata.fileType === "document" && (
              <Table.Cell>{fileName(d)}</Table.Cell>
            )}
            <Table.Cell>{formatBytes(d.size)}</Table.Cell>
            <Table.Cell>{d.metadata.fileType}</Table.Cell>
            <Table.Cell>
              <span className="horiz-div">
                <DeleteButton apiUrl={d.links.self} />

                {editFile(d.key, record)}

                {d.metadata.fileType === "document" &&
                  extractImg(d.key, record)}
              </span>
            </Table.Cell>
          </Table.Row>
        ))}
        <Table.Row>
          <Table.Cell colSpan="5">
            {data?.entries?.length > itemsPerPage && (
              <Pagination
                className="form__attach__pagination"
                totalPages={Math.ceil(typeAmount?.length / itemsPerPage)}
                activePage={activePage}
                onPageChange={changePage}
              />
            )}
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    );
  };

  // separate tabs for images and docs
  const renderTabs = () => (
    <Tab
      panes={[
        {
          menuItem: "Obrázky",

          render: () => (
            <Tab.Pane>
              <Table>{renderTableBody("photo")}</Table>

              {uploaderImg(record)}
            </Tab.Pane>
          ),
        },
        {
          menuItem: "Dokumenty",
          render: () => (
            <Tab.Pane>
              <Table>{renderTableBody("document")}</Table>

              {uploaderPdf(record)}
            </Tab.Pane>
          ),
        },
      ]}
    />
  );

  // button for img upload
  const uploaderImg = (record) => {
    return (
      <ReactWrapperImg
        preactComponent={FileManagementDialog}
        props={{
          config: { record: record },
          autoExtractImagesFromPDFs: true,
          locale: "cs_CS",
          allowedFileTypes: ["image/*", "application/pdf"],
          allowedMetaFields: [
            {
              id: "caption",
              defaultValue: "default_image_name",
              isUserInput: true,
            },
            { id: "featured", defaultValue: false, isUserInput: true },
          ],
          onSuccessfulUpload: () => fetchData(),
          onFailedUpload: () => fetchData(),
        }}
      />
    );
  };

  // button for docs upload
  const uploaderPdf = (record) => {
    return (
      <ReactWrapperPdf
        preactComponent={FileManagementDialog}
        props={{
          config: { record: record },
          locale: "cs_CS",
          autoExtractImagesFromPDFs: false,
          allowedFileTypes: ["application/pdf"],
          allowedMetaFields: [
            {
              id: "caption",
              defaultValue: "default_pdf_name",
              isUserInput: true,
            },
            { id: "featured", defaultValue: false, isUserInput: true },
          ],
          startEvent: { event: "upload-file-without-edit" },
          onSuccessfulUpload: () => fetchData(),
          onFailedUpload: () => fetchData(),
        }}
      />
    );
  };

  return (
    <>
      {renderTabs([
        {
          menuItem: "Obrazky",
          render: () => (
            <Tab.Pane>
              <Table>{renderTableBody()}</Table>

              {uploaderImg(record)}
            </Tab.Pane>
          ),
        },
        {
          menuItem: "Dokumenty",
          render: () => (
            <Tab.Pane>
              <Table>{renderTableBody()}</Table>

              {uploaderPdf(record)}
            </Tab.Pane>
          ),
        },
      ])}

      {/* modal for full screen image */}
      <div>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          className="custom-modal"
        >
          <Modal.Content image className="modal-content">
            <div className="vert-div">
              <Image
                src={data?.entries?.[selectedImage]?.links?.content}
                className="modal-image"
              />
              <p>{data?.entries?.[selectedImage]?.metadata?.caption}</p>
            </div>
            <Button
              icon="close"
              onClick={() => setModalOpen(false)}
              className="close-button"
            />
          </Modal.Content>
        </Modal>
      </div>
    </>
  );
};
