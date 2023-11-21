import React, { useState, useEffect } from "react";
import { Icon, Button, Table, Tab, Confirm } from "semantic-ui-react";
import { ReactWrapperPdf, ReactWrapperImg } from "./Uploader";
import FileManagementDialog from "@oarepo/file-manager";

// const uploaderImg = ({ record }) => {
//   return (
//     <ReactWrapperImg
//       preactComponent={FileManagementDialog}
//       props={{
//         config: { record: record },
//         autoExtractImagesFromPDFs: true,
//         locale: "cs_CS",
//         allowedFileTypes: ["image/*"],
//       }}
//     />
//   );
// };

// const uploaderPdf = ({ record }) => {
//   return (
//     <ReactWrapperPdf
//       preactComponent={FileManagementDialog}
//       props={{
//         config: { record: record },
//         autoExtractImagesFromPDFs: true,
//         locale: "cs_CS",
//         allowedFileTypes: ["*/pdf"],
//       }}
//     />
//   );
// };
export const FileStat1 = ({ apiUrl, record }) => {
  const [data, setData] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [bigScreen, setBigScreen] = useState(null);

  useEffect(() => {
    function updateSlidesToShow() {
      if (window.innerWidth >= 992) {
        setBigScreen(true);
      } else {
        setBigScreen(false);
      }
    }
    updateSlidesToShow();

    window.addEventListener("resize", updateSlidesToShow);

    return () => {
      window.removeEventListener("resize", updateSlidesToShow);
    };
  }, []);

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
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [apiUrl]);

  if (!data) {
    return <p>Loading...</p>;
  }

  const openDeleteConfirm = (item) => {
    setDeleteItem(item);
    setConfirmOpen(true);
  };

  const handleDelete = () => {
    setData((prevData) => ({
      ...prevData,
      entries: prevData.entries.filter((item) => item.key !== deleteItem.key),
    }));
    setConfirmOpen(false);
  };

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

  const itemsPerPage = 5;
  const totalPages = Math.ceil(data?.entries?.length / itemsPerPage);

  const panesImg = Array.from({ length: totalPages }, (_, index) => {
    const start = index * itemsPerPage;
    const end = start + itemsPerPage;
    const slicedData = data.entries.slice(start, end);

    return {
      menuItem: `${index + 1}`,
      render: () => (
        <>
          <Tab.Pane>
            <Table>
              {bigScreen && (
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Název</Table.HeaderCell>
                    <Table.HeaderCell>Velikost</Table.HeaderCell>
                    <Table.HeaderCell>Typ</Table.HeaderCell>
                    <Table.HeaderCell>Akce</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
              )}
              <Table.Body>
                {slicedData.map((d) => (
                  <Table.Row key={d.key}>
                    <Table.Cell>{d.metadata.caption}</Table.Cell>
                    <Table.Cell>{formatBytes(d.metadata.size)} </Table.Cell>
                    <Table.Cell>{d.metadata.fileType}</Table.Cell>
                    <Table.Cell>
                      <span className="horiz-div">
                        <Button
                          className="form__stat__btn"
                          onClick={() => openDeleteConfirm(d)}
                        >
                          <Icon name="delete" />
                        </Button>
                        <Button className="form__stat__btn" onClick={() => {}}>
                          <Icon name="edit" />
                        </Button>
                        {d.metadata.fileType == "document" && (
                          <Button
                            className="form__stat__btn"
                            onClick={() => {}}
                          >
                            <Icon name="file image outline" />
                          </Button>
                        )}
                      </span>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            <Confirm
              open={confirmOpen}
              content={"Chcete smazat?"}
              cancelButton={"Zrušit"}
              confirmButton={"Ano"}
              onCancel={() => {
                setConfirmOpen(false);
                setDeleteItem(null);
              }}
              onConfirm={handleDelete}
            />
            <ReactWrapperImg
              preactComponent={FileManagementDialog}
              props={{
                config: { record: record },
                autoExtractImagesFromPDFs: true,
                locale: "cs_CS",
                allowedFileTypes: ["image/*"],
              }}
            />
          </Tab.Pane>
        </>
      ),
    };
  });

  const panesPdf = Array.from({ length: totalPages }, (_, index) => {
    const start = index * itemsPerPage;
    const end = start + itemsPerPage;
    const slicedData = data.entries.slice(start, end);

    return {
      menuItem: `${index + 1}`,
      render: () => (
        <>
          <Tab.Pane>
            <Table>
              {bigScreen && (
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Název</Table.HeaderCell>
                    <Table.HeaderCell>Velikost</Table.HeaderCell>
                    <Table.HeaderCell>Typ</Table.HeaderCell>
                    <Table.HeaderCell>Akce</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
              )}

              <Table.Body>
                {slicedData.map((d) => (
                  <Table.Row key={d.key}>
                    <Table.Cell>{d.metadata.caption}</Table.Cell>
                    <Table.Cell>{formatBytes(d.metadata.size)} </Table.Cell>
                    <Table.Cell>{d.metadata.fileType}</Table.Cell>
                    <Table.Cell>
                      <span className="horiz-div">
                        <Button
                          className="form__stat__btn"
                          onClick={() => openDeleteConfirm(d)}
                        >
                          <Icon name="delete" />
                        </Button>
                        <Button className="form__stat__btn" onClick={() => {}}>
                          <Icon name="edit" />
                        </Button>
                        {d.metadata.fileType == "document" && (
                          <Button
                            className="form__stat__btn"
                            onClick={() => {}}
                          >
                            <Icon name="file image outline" />
                          </Button>
                        )}
                      </span>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            <Confirm
              open={confirmOpen}
              content={"Chcete smazat?"}
              cancelButton={"Zrušit"}
              confirmButton={"Ano"}
              onCancel={() => {
                setConfirmOpen(false);
                setDeleteItem(null);
              }}
              onConfirm={handleDelete}
            />
            <ReactWrapperPdf
              preactComponent={FileManagementDialog}
              props={{
                config: { record: record },
                autoExtractImagesFromPDFs: true,
                locale: "cs_CS",
                allowedFileTypes: ["*/pdf"],
              }}
            />
          </Tab.Pane>
        </>
      ),
    };
  });
  return (
    <>
      {data?.entries?.some((file) => file.metadata.fileType === "document") ? (
        <div className="vert-div predmety__form__div">
          <Tab panes={panesPdf} />
        </div>
      ) : (
        <div className="vert-div predmety__form__div">
          <ReactWrapperPdf
            preactComponent={FileManagementDialog}
            props={{
              config: { record: record },
              autoExtractImagesFromPDFs: true,
              locale: "cs_CS",
              allowedFileTypes: ["image/*"],
            }}
          />
        </div>
      )}
      {data?.entries?.some((file) => file.metadata.fileType === "photo") ? (
        <div className="vert-div predmety__form__div">
          <Tab panes={panesImg} />
        </div>
      ) : (
        <div className="vert-div predmety__form__div">
          {" "}
          <ReactWrapperPdf
            preactComponent={FileManagementDialog}
            props={{
              config: { record: record },
              autoExtractImagesFromPDFs: true,
              locale: "cs_CS",
              allowedFileTypes: ["*/pdf"],
            }}
          />
        </div>
      )}
    </>
  );
};

export const FileStat = ({ apiUrl, record }) => {
  const [data, setData] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [bigScreen, setBigScreen] = useState(null);

  useEffect(() => {
    function updateSlidesToShow() {
      if (window.innerWidth >= 992) {
        setBigScreen(true);
      } else {
        setBigScreen(false);
      }
    }
    updateSlidesToShow();

    const handleResize = () => {
      updateSlidesToShow();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [apiUrl]);

  if (!data) {
    return <p>Loading...</p>;
  }

  const openDeleteConfirm = (item) => {
    setDeleteItem(item);
    setConfirmOpen(true);
  };

  const handleDelete = () => {
    setData((prevData) => ({
      ...prevData,
      entries: prevData.entries.filter((item) => item.key !== deleteItem.key),
    }));
    setConfirmOpen(false);
  };

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

  const renderTableHeader = () =>
    bigScreen && (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Název</Table.HeaderCell>
          <Table.HeaderCell>Velikost</Table.HeaderCell>
          <Table.HeaderCell>Typ</Table.HeaderCell>
          <Table.HeaderCell>Akce</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    );

  const renderTableBody = (fileTypeFilter) => (
    <Table.Body>
      {data.entries
        .filter((d) => d.metadata.fileType === fileTypeFilter)
        .map((d) => (
          <Table.Row key={d.key}>
            <Table.Cell>{d.metadata.caption}</Table.Cell>
            <Table.Cell>{formatBytes(d.metadata.size)}</Table.Cell>
            <Table.Cell>{d.metadata.fileType}</Table.Cell>
            <Table.Cell>
              <span className="horiz-div">
                <Button
                  className="form__stat__btn"
                  onClick={() => openDeleteConfirm(d)}
                >
                  <Icon name="delete" />
                </Button>
                <Button className="form__stat__btn" onClick={() => {}}>
                  <Icon name="edit" />
                </Button>
                {d.metadata.fileType === "document" && (
                  <Button className="form__stat__btn" onClick={() => {}}>
                    <Icon name="file image outline" />
                  </Button>
                )}
              </span>
            </Table.Cell>
          </Table.Row>
        ))}
    </Table.Body>
  );

  const renderTabs = (record) => (
    <Tab
      panes={[
        {
          menuItem: "Images",
          render: () => (
            <Tab.Pane>
              <Table>
                {renderTableHeader()}
                {renderTableBody("photo")}
              </Table>
              {renderConfirmDialog()}
              {uploaderImg(record)}
            </Tab.Pane>
          ),
        },
        {
          menuItem: "PDFs",
          render: () => (
            <Tab.Pane>
              <Table>
                {renderTableHeader()}
                {renderTableBody("document")}
              </Table>
              {renderConfirmDialog()}
              {uploaderPdf(record)}
            </Tab.Pane>
          ),
        },
      ]}
    />
  );

  const renderConfirmDialog = () => (
    <Confirm
      open={confirmOpen}
      content={"Chcete smazat?"}
      cancelButton={"Zrušit"}
      confirmButton={"Ano"}
      onCancel={() => {
        setConfirmOpen(false);
        setDeleteItem(null);
      }}
      onConfirm={handleDelete}
    />
  );

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
              <Table>
                {renderTableHeader()}
                {renderTableBody()}
              </Table>
              {renderConfirmDialog()}
              {uploaderImg(record)}
            </Tab.Pane>
          ),
        },
        {
          menuItem: "Dokumenty",
          render: () => (
            <Tab.Pane>
              <Table>
                {renderTableHeader()}
                {renderTableBody()}
              </Table>
              {renderConfirmDialog()}
              {uploaderPdf(record)}
            </Tab.Pane>
          ),
        },
      ])}
    </>
  );
};
