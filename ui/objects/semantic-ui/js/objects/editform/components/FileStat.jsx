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
import _truncate from "lodash/truncate";
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
    return <p>Načítání...</p>;
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

  const DeleteButton = ({ fileCaption, apiUrl }) => {
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
          size="small"
          className="transparent"
          icon
          onClick={() => setConfirmOpen(true)}
          title="Smazat"
        >
          <Icon name="delete" aria-label="Ikona zavření" />
        </Button>

        <Confirm
          open={confirmOpen}
          header={`Smazat soubor${fileCaption ? ` "${fileCaption}"` : ""}`}
          content={"Jste si jistý? (tato akce je nezvratná)"}
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

  const renderTable = (fileTypeFilter) => {
    const fileName = (d, truncate = false) => {
      if (d.metadata && d.metadata?.caption) {
        if (
          d.metadata.caption === "default_image_name" ||
          d.metadata.caption === "default_pdf_name" ||
          Object.values(d.metadata.caption).length === 0
        ) {
          return truncate ? _truncate(d.key, { length: 35, omission: "…" }) : d.key;
        } else {
          return truncate ? _truncate(d.metadata.caption, { length: 35, omission: "…" }) : d.metadata.caption;
        }
      } else {
        return truncate ? _truncate(d.key, { length: 35, omission: "…" }) : d.key;
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
      <Table className="file-stat-table">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Název</Table.HeaderCell>
            <Table.HeaderCell>Velikost</Table.HeaderCell>
            <Table.HeaderCell>Akce</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {slicedData?.map((d, index) => (
            <Table.Row key={d.key}>
              {d.metadata.fileType === "photo" && (
                <Table.Cell
                  className="clickable-text overflow-wrap-anywhere"
                  title={fileName(d)}
                  onClick={() => {
                    setSelectedImage(index);
                    setModalOpen(true);
                  }}
                >
                  {fileName(d, true)}
                </Table.Cell>
              )}
              {d.metadata.fileType === "document" && (
                <Table.Cell
                  className="clickable-text"
                  title={fileName(d)}
                >
                  <a href={d.links?.content} className="overflow-wrap-anywhere">
                    {fileName(d, true)}
                  </a>
                </Table.Cell>
              )}
              <Table.Cell>{formatBytes(d.size)}</Table.Cell>
              <Table.Cell>
                <Grid.Row centered verticalAlign="middle" columns={d.metadata.fileType === "document" ? 3 : 2}>
                  <DeleteButton
                    fileCaption={d.metadata?.caption}
                    apiUrl={d.links.self}
                  />

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
        </Table.Body>

        {data?.entries?.length > itemsPerPage && (
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan={3} verticalAlign="middle">
                <Pagination
                  totalPages={Math.ceil(typeAmount?.length / itemsPerPage)}
                  activePage={activePage}
                  onPageChange={changePage}
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        )}
      </Table>
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
              {renderTable("photo")}

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
              {renderTable("document")}

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
      {renderTabs()}

      {/* modal for full screen image */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} centered closeIcon>
        <Modal.Content as={Grid}>
          <Grid.Column textAlign="center" verticalAlign="top">
            <Image
              as="a"
              size="huge"
              src={data?.entries?.[selectedImage]?.links?.content}
              href={data?.entries?.[selectedImage]?.links?.content}
              target="_blank"
              inline
              className="zoomable"
            />
            <p>
              {data?.entries?.[selectedImage]?.metadata?.caption}
            </p>
          </Grid.Column>
        </Modal.Content>
      </Modal>
    </>
  );
};
