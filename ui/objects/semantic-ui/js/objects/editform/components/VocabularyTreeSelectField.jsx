import React, { useMemo, useState, useEffect } from "react";
import { SelectField } from "react-invenio-forms";
import { useFormConfig } from "@js/oarepo_ui";
import { useFormikContext, getIn } from "formik";
import PropTypes from "prop-types";
import {
  Breadcrumb,
  ModalHeader,
  ModalActions,
  ModalContent,
  Button,
  Modal,
  Header,
  Grid,
  Input,
  Icon,
  Checkbox,
  Label,
} from "semantic-ui-react";
import {
  serializedVocabularyItems,
  serializeVocabularyItem,
} from "@js/oarepo_vocabularies";

const SearchComponent = ({ vocab }) => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    const apiUrl = `${window.location.origin}/api/vocabularies/${vocab}?q=${query}`;

    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(apiUrl, {
          headers: {
            Accept: "application/vnd.inveniordm.v1+json",
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSearchResults(data.hits.hits);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <Grid.Column>
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      {loading && <Label>Loading...</Label>}
      {searchResults?.length > 0 && (
        <Grid columns={1}>
          {searchResults.map((i, index) => (
            <Label
              key={index}
              onClick={(e) => {
                handleSelect(i, i.id, e);
              }}
            >
              {" "}
              <Breadcrumb icon="left angle" sections={i.hierarchy.title} />
            </Label>
          ))}
        </Grid>
      )}
    </Grid.Column>
  );
};

export const VocabularyTreeSelectField = ({
  fieldPath,
  multiple,
  optionsListName,
  usedOptions = [],
  helpText,
  placeholder,
  optimized,
  ...uiProps
}) => {
  const { formConfig } = useFormConfig();
  const { vocabularies } = formConfig;
  const formik = useFormikContext();
  const { values, setFieldTouched } = useFormikContext();
  const value = getIn(values, fieldPath, multiple ? [] : {});

  const { all: allOptions, featured: featuredOptions } =
    vocabularies[optionsListName];

  if (!allOptions) {
    console.error(
      `Do not have options for ${optionsListName} inside:`,
      vocabularies
    );
  }

  const [openState, setOpenState] = useState(false);
  const [parentsState, setParentsState] = useState([]);
  const [keybState, setKeybState] = useState([]);
  const [selectedState, setSelectedState] = useState([]);

  const serializedOptions = useMemo(
    () => serializedVocabularyItems(allOptions),
    [allOptions]
  );

  const handleOpen = () => {
    setOpenState(true);
  };

  const hierarchicalData = useMemo(() => {
    let data = [];
    let currentColumn = [];
    let currentLevel = 0;

    serializedOptions.forEach((option, index) => {
      if (option.hierarchy.ancestors.length === currentLevel) {
        currentColumn.push(option);
      } else {
        data.push(currentColumn);
        currentColumn = [option];
        currentLevel++;
      }
    });

    if (currentColumn.length > 0) {
      data.push(currentColumn);
    }

    return data;
  }, [serializedOptions]);

  const columnsCount = hierarchicalData.length;

  const openHierarchyNode = (parent, level) => () => {
    let updatedParents = [...parentsState];
    updatedParents.splice(level + 1);
    updatedParents[level] = parent;

    let updatedKeybState = [...keybState];

    const columnOptions = hierarchicalData[level];
    const nextColumnIndex = columnOptions.findIndex((o) => o.value === parent);
    updatedKeybState.splice(level + 1);
    updatedKeybState[level] = nextColumnIndex;

    setParentsState(updatedParents);
    setKeybState(updatedKeybState);
  };

  const handleSelect = (option, val, e) => {
    e.preventDefault();
    const existingIndex = selectedState.findIndex(
      (i) => i.value === option.value
    );

    if (existingIndex !== -1) {
      setSelectedState((prevState) => {
        const newState = [...prevState];
        newState.splice(existingIndex, 1);
        return newState;
      });
    } else {
      if (multiple && selectedState.length != 0) {
        setSelectedState((prevState) => [...prevState, option]);
      } else {
        setSelectedState([option]);
      }
    }
  };

  
  const handleSubmit = () => {
    let prepSelect;
    if (multiple) {
      prepSelect = selectedState.map((i) => serializeVocabularyItem(i.value));
      const existingValues = getIn(formik.values, fieldPath, []);

      const existingIds = existingValues.map((item) => item.id);

      prepSelect = prepSelect.filter((item) => !existingIds.includes(item.id));

      prepSelect = [...existingValues, ...prepSelect];
    } else {
      prepSelect = selectedState.map((i) =>
        serializeVocabularyItem(i.value)
      )[0];
    }

    formik.setFieldValue(fieldPath, prepSelect);
    setOpenState(false);
    setSelectedState([]);
    setParentsState([]);
  };

  
  const handleKey = (e, option, index) => {
    e.preventDefault();
    let newIndex = 0;

    index = keybState.length - 1 > index ? keybState.length - 1 : index;
    let data = hierarchicalData[index];

    const moveKey = (index, newIndex, back = false) => {
      setKeybState((prev) => {
        const newState = [...prev];
        back ? newState.splice(index, 1) : (newState[index] = newIndex);
        return newState;
      });
    };
    if (e.key === "ArrowUp") {
      newIndex = keybState[index] - 1;
      if (newIndex >= 0) {
        openHierarchyNode(data[newIndex].value, index)();
        moveKey(index, newIndex, false);
      }
    } else if (e.key === "ArrowDown") {
      newIndex = keybState[index] + 1;

      if (newIndex < data.length) {
        openHierarchyNode(data[newIndex].value, index)();
        moveKey(index, newIndex, false);
      }
    } else if (e.key === "ArrowLeft") {
      if (index > 0) {
        setParentsState((prev) => {
          const newState = [...prev];
          newState.splice(index, 1);
          return newState;
        });
        moveKey(index, null, true);
      }
    } else if (e.key === "ArrowRight") {
      if (index < columnsCount - 1) {
        const nextColumnOptions = hierarchicalData[index + 1];
        if (nextColumnOptions) {
          const nextColumnIndex = nextColumnOptions.findIndex(
            (o) => o.hierarchy.ancestors[0] === parentsState[index]
          );
          if (nextColumnIndex !== -1) {
            newIndex = nextColumnIndex;
            openHierarchyNode(
              nextColumnOptions[nextColumnIndex].value,
              index + 1
            )();
            moveKey(index + 1, newIndex, false);
          }
        }
      }
    } else if (e.key === "Enter") {
      handleSelect(data[keybState[index]], index, e);
    } else if ((e.key = " ")) {
      handleSelect(data[keybState[index]], index, e);
    }
  };

  const renderColumn = (column, index) => {
    return (
      <Grid.Column>
        {column.map((option, i) => {
          if (
            option.hierarchy.ancestors.length == index &&
            (index == 0 ||
              option.hierarchy.ancestors[0] == parentsState[index - 1])
          ) {
            return (
              <Grid.Row
                key={option.value}
                className={
                  option.value == parentsState[index] ? "open spaced" : "spaced"
                }
              >
                {multiple && (
                  <Checkbox
                    checked={
                      selectedState.findIndex(
                        (item) => item.value === option.value
                      ) !== -1
                    }
                    indeterminate={
                      selectedState.some((item) =>
                        item.hierarchy.ancestors.includes(option.value)
                      )
                        ? true
                        : false
                    }
                    onChange={(e) => {
                      handleSelect(option, option.value, e);
                    }}
                  />
                )}
                <Button
                  basic
                  color="black"
                  onClick={openHierarchyNode(option.value, index)}
                  onDoubleClick={(e) => {
                    handleSelect(option, option.value, e);
                  }}
                  onKeyDown={(e) => {
                    handleKey(e, option, index);
                  }}
                  tabIndex={0}
                >
                  {option.text}
                </Button>
                {option.element_type == "parent" && (
                  <Button onClick={openHierarchyNode(option.value, index)}>
                    {index !== columnsCount - 1 && (
                      <Icon name="angle right black " />
                    )}
                  </Button>
                )}
              </Grid.Row>
            );
          }
        })}
      </Grid.Column>
    );
  };

  return (
    <React.Fragment>
      <SelectField
        selectOnBlur={false}
        optimized={optimized}
        onBlur={() => setFieldTouched(fieldPath)}
        deburr
        search
        fieldPath={fieldPath}
        multiple={multiple}
        featured={featuredOptions}
        options={serializedOptions}
        usedOptions={usedOptions}
        onClick={handleOpen}
        value={multiple ? value.map((o) => o?.id) : value?.id}
        {...uiProps}
      />
      <label className="helptext">{helpText}</label>

      {openState && (
        <Modal
          onClose={() => setOpenState(false)}
          onOpen={() => setOpenState(true)}
          open={open}
          className="tree-field"
        >
          <ModalHeader>
            <Grid.Row>
              <Header as="h3">
                {placeholder ? placeholder : "Choose Items"}
              </Header>
              <SearchComponent vocab={optionsListName} />
            </Grid.Row>
          </ModalHeader>

          <ModalContent>
            <Grid>
              <Grid columns={1}>
                <Grid columns={columnsCount} className="gapped">
                  {hierarchicalData.map((column, level) => (
                    <React.Fragment key={level}>
                      {renderColumn(column, level)}
                    </React.Fragment>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </ModalContent>
          <ModalActions>
            <Grid.Row>
              <Grid.Row>
                {selectedState.map((i, index) => (
                  <Label key={index}>
                    {" "}
                    <Breadcrumb
                      icon="left angle"
                      sections={i.hierarchy.title}
                    />
                    {multiple && (
                      <Button
                        className="small transparent"
                        onClick={(e) => {
                          handleSelect(i, i.item, e);
                        }}
                      >
                        <Icon name="delete" />
                      </Button>
                    )}
                  </Label>
                ))}
              </Grid.Row>
              <Button
                content="Confirm"
                labelPosition="right"
                floated="right"
                icon="checkmark"
                onClick={handleSubmit}
                secondary
              />
            </Grid.Row>
          </ModalActions>
        </Modal>
      )}
    </React.Fragment>
  );
};

VocabularyTreeSelectField.propTypes = {
  fieldPath: PropTypes.string.isRequired,
  multiple: PropTypes.bool,
  optionsListName: PropTypes.string.isRequired,
  helpText: PropTypes.string,
  noResultsMessage: PropTypes.string,
  usedOptions: PropTypes.array,
  optimized: PropTypes.bool,
};

VocabularyTreeSelectField.defaultProps = {
  noResultsMessage: "No results found.",
  optimized: false,
};
