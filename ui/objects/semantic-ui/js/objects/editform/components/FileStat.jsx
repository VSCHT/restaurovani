import React, { useState, useEffect, useCallback } from "react";
import {
  Icon,
  Button,
  Table,
  Tab,
  Confirm,
  Modal,
  Image,
  Pagination,
  Grid,
} from "semantic-ui-react";
import {
  PDFUploader,
  ImageUploader,
  FileMetadataEditor,
  PDFImageExtractor,
} from "./Uploader";

export const FileStat = ({ apiUrl, record }) => {
  const [data, setData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activePage, setActivePage] = useState(1);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data");
    }
  }, [apiUrl]);

  // fetching data
  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
        console.error("Error deleting data");
      } finally {
        setConfirmOpen(false);
        fetchData();
      }
    };

    return (
      <>
        <Button
          className="small transparent"
          onClick={() => setConfirmOpen(true)}
          title="Smazat"
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

  // table's body

  const itemsPerPage = 5;

  const changePage = (e, { activePage }) => {
    setActivePage(activePage);
  };

  const renderTableBody = (fileTypeFilter) => {
    const fileName = (d, conc = false) => {
      if (d.metadata && d.metadata?.caption) {
        if (
          d.metadata.caption === "default_image_name" ||
          d.metadata.caption === "default_pdf_name" ||
          Object.values(d.metadata.caption).length === 0
        ) {
          return d.key.length > 15 && conc
            ? d.key.substring(0, 15) + "..."
            : d.key;
        } else {
          return d.metadata.caption.length > 15 && conc
            ? d.metadata.caption.substring(0, 15) + "..."
            : d.metadata.caption;
        }
      } else {
        return d.key.length > 15 && conc
          ? d.key.substring(0, 15) + "..."
          : d.key;
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
                title={fileName(d)}
                onClick={() => {
                  setSelectedImage(index);
                  setModalOpen(true);
                }}
              >
                {fileName(d)}{" "}
              </Table.Cell>
            )}
            {d.metadata.fileType === "document" && (
              <Table.Cell title={fileName(d)}>{fileName(d, true)}</Table.Cell>
            )}
            <Table.Cell>{formatBytes(d.size)}</Table.Cell>
            <Table.Cell>{d.metadata.fileType}</Table.Cell>
            <Table.Cell>
              <Grid.Row>
                <DeleteButton apiUrl={d.links.self} />

                <FileMetadataEditor
                  fetchData={fetchData}
                  record={record}
                  fileKey={d.key}
                />

                {d.metadata.fileType === "document" &&
                  <PDFImageExtractor
                    fetchData={fetchData}
                    record={record}
                    fileKey={d.key}
                  />
                }
              </Grid.Row>
            </Table.Cell>
          </Table.Row>
        ))}
        <Table.Row>
          <Table.Cell colSpan="5">
            {data?.entries?.length > itemsPerPage && (
              <Pagination
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

              <ImageUploader
                fetchData={fetchData}
                record={record}
              />
            </Tab.Pane>
          ),
        },
        {
          menuItem: "Dokumenty",
          render: () => (
            <Tab.Pane>
              <Table>{renderTableBody("document")}</Table>

              <PDFUploader
                fetchData={fetchData}
                record={record}
              />
            </Tab.Pane>
          ),
        },
      ]}
    />
  );

  return (
    <>
      {renderTabs([
        {
          menuItem: "Obrazky",
          render: () => (
            <Tab.Pane>
              <Table>{renderTableBody()}</Table>

              <ImageUploader
                fetchData={fetchData}
                record={record}
              />
            </Tab.Pane>
          ),
        },
        {
          menuItem: "Dokumenty",
          render: () => (
            <Tab.Pane>
              <Table>{renderTableBody()}</Table>

              <PDFUploader
                fetchData={fetchData}
                record={record}
              />
            </Tab.Pane>
          ),
        },
      ])}

      {/* modal for full screen image */}
      <div>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <Modal.Content image>
            <Image src={data?.entries?.[selectedImage]?.links?.content} />
            {data?.entries?.[selectedImage]?.metadata?.caption}

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
