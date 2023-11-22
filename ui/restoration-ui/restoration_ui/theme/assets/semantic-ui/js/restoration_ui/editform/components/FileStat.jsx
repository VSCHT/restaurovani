import React, { useState, useEffect } from "react";
import {
  Icon,
  Button,
  Table,
  Tab,
  Confirm,
  Modal,
  Image,
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
  // const [bigScreen, setBigScreen] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // useEffect(() => {
  //   function updateSlidesToShow() {
  //     if (window.innerWidth <= 992 && window.innerWidth >= 350 ) {
  //       setBigScreen(true);
  //     } else {
  //       setBigScreen(false);
  //     }
  //   }
  //   updateSlidesToShow();

  //   const handleResize = () => {
  //     updateSlidesToShow();
  //   };

  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);


  // fetching data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

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
            data: { key: key },
          },
        }}
      />
    );
  };

  // delete button

  const DeleteButton = ({ apiUrl}) => {
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
        console.log("Error deleting data:", error);
      } finally {
        setConfirmOpen(false);
        location.reload();
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
      <EditWrapper
        preactComponent={FileManagementDialog}
        props={{
          config: { record: record },
          autoExtractImagesFromPDFs: true,
          locale: "cs_CS",
          startEvent: { event: "edit-file", data: { key: key } },
        }}
      />
    );
  };

  // const renderTableHeader = () =>
  //   bigScreen && (
  //     <Table.Header>
  //       <Table.Row>
  //         <Table.HeaderCell>Název</Table.HeaderCell>
  //         <Table.HeaderCell>Velikost</Table.HeaderCell>
  //         <Table.HeaderCell>Typ</Table.HeaderCell>
  //         <Table.HeaderCell>Akce</Table.HeaderCell>
  //       </Table.Row>
  //     </Table.Header>
  //   );

    // table's body
  const renderTableBody = (fileTypeFilter) => (
    <Table.Body>
      {data?.entries
        ?.filter((d) => d.metadata.fileType === fileTypeFilter)
        ?.map((d, index) => (
          <Table.Row key={d.key}>

            {d.metadata.fileType === "photo" && (
              <Table.Cell
                className="form__attach__title"
                onClick={() => {
                  setSelectedImage(index);
                  setModalOpen(true);
                }}
              >
                {d.metadata.caption}
              </Table.Cell>
            )}
            {d.metadata.fileType === "document" && (
              <Table.Cell>{d.metadata.caption}</Table.Cell>
            )}
            <Table.Cell>{formatBytes(d.metadata.size)}</Table.Cell>
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
    </Table.Body>
  );

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
          allowedFileTypes: ["image/*"],
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
          autoExtractImagesFromPDFs: true,
          locale: "cs_CS",
          allowedFileTypes: ["*/pdf"],
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
