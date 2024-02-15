import React, { useMemo, useState, useEffect } from "react";
import { SelectField } from "react-invenio-forms";
import { useFormConfig } from "@js/oarepo_ui";
import { useFormikContext, getIn } from "formik";
import PropTypes from "prop-types";
import {
  Dropdown,
  Divider,
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
import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import { serializedVocabularyItems } from "@js/oarepo_vocabularies";
import { LocalVocabularySelectField } from "@js/oarepo_vocabularies";
import axios from "axios";

export const SearchComponent = ({ vocab, parent }) => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { formConfig } = useFormConfig();
  const { vocabularies } = formConfig;

  useEffect(() => {
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    const apiUrl = `${window.location.origin}/api/vocabularies/${vocab}?q=${query}&sort=title&page=1&size=10`;

    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const response = await axios.get(apiUrl);
        console.log(response);
        setSearchResults(response.data.hits.hits);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [, query]);

  return (
    <div>
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      {loading && <p>Loading...</p>}
      {searchResults?.length > 0 && (
        <ul>
          {searchResults.map((result, index) => (
            <li key={index}>{result.title.cs}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

const InnerDropdown = ({
  options,
  featured,
  usedOptions = [],
  value,
  ...rest
}) => {
  const _filterUsed = (opts) =>
    opts.filter((o) => !usedOptions.includes(o.value) || o.value === value);
  const allOptions = _filterUsed([
    ...(featured.length
      ? [
          ...featured.sort((a, b) => a.text.localeCompare(b.text)),
          {
            content: <Divider fitted />,
            disabled: true,
            key: "featured-divider",
          },
        ]
      : []),
    ...options.filter((o) => !featured.map((o) => o.value).includes(o.value)),
  ]);
  console.log(allOptions);
  return <Dropdown options={allOptions} value={value} {...rest} />;
};

InnerDropdown.propTypes = {
  options: PropTypes.array.isRequired,
  featured: PropTypes.array,
  usedOptions: PropTypes.array,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

export const HierarchicalVocabularyField = ({
  fieldPath,
  multiple,
  optionsListName,
  usedOptions = [],
  helpText,
  showLeafsOnly,
  optimized,
  ...uiProps
}) => {
  const { formConfig } = useFormConfig();
  const { vocabularies } = formConfig;

  const { all: allOptions, featured: featuredOptions } =
    vocabularies[optionsListName];

  if (!allOptions) {
    console.error(
      `Do not have options for ${optionsListName} inside:`,
      vocabularies
    );
  }

  const [openState, setOpenState] = useState(false);
  const serializedOptions = useMemo(
    () =>
      showLeafsOnly
        ? serializedVocabularyItems(allOptions).filter(
            (o) => o.element_type === "leaf"
          )
        : serializedVocabularyItems(allOptions),
    [allOptions, showLeafsOnly]
  );

  const handleOpen = () => {
    setOpenState(true);
  };

  const { values, setFieldTouched } = useFormikContext();
  const value = getIn(values, fieldPath, multiple ? [] : {});

  const [parentsState, setParentsState] = useState([]);
  const [selectedState, setSelectedState] = useState([]);

  const updateHierarchy = (parent, index) => () => {
    let updatedParents = [...parentsState];
    updatedParents.splice(index + 1);
    updatedParents[index] = parent;
    setParentsState(updatedParents);
  };

  const handleSelect = (option) => {
    const existingIndex = selectedState.findIndex(
      (item) => item.value === option.value
    );

    if (existingIndex !== -1) {
      setSelectedState((prevState) => {
        const newState = [...prevState];
        newState.splice(existingIndex, 1);
        console.log("option 1");
        return newState;
      });
    } else {
    if (multiple || selectedState.length === 0) {
      setSelectedState((prevState) => [
        ...prevState,
        { value: option.value, hierarchy: option.hierarchy },
      ]);
      console.log("option 2");
    } else {
      setSelectedState([{ value: option.value, hierarchy: option.hierarchy }]);
      console.log("option 3");
    }
    }
  };

  const handleClick = (e) => {
    switch (e.detail) {
      case 1: {
        updateHierarchy(option.value, index);
        break;
      }
      case 2: {
        handleSelect(option);
        break;
      }
      default: {
        break;
      }
    }
  };

  const amount =
    allOptions[allOptions.length - 1].hierarchy.ancestors.length + 1;

  const renderColumns = (index) => {
    return (
      <Grid.Column>
        {allOptions.map((option) => {
          if (
            option.hierarchy.ancestors.length == index &&
            (index == 0 ||
              option.hierarchy.ancestors[0] == parentsState[index - 1])
          ) {
            return (
              <Grid.Row
                key={option.hierarchy.title[0]}
                className={
                  option.value == parentsState[index] ? "open spaced" : "spaced"
                }
              >
                <Checkbox
                  checked={
                    String(option.value) === String(selectedState[index])
                  }
                  onChange={(e) => handleSelect(option)}
                />
                <Button basic color="black" onClick={handleClick(option)}>
                  {option.text}
                </Button>

                <Button onClick={updateHierarchy(option.value, index)}>
                  {index !== amount - 1 ? (
                    <Icon name="angle right black " />
                  ) : null}
                </Button>
              </Grid.Row>
            );
          }
        })}
      </Grid.Column>
    );
  };

  useEffect(() => {
    console.log(parentsState);
    console.log(selectedState);
  }, [parentsState, selectedState]);

  return (
    <React.Fragment>
      <SelectField
        selectOnBlur={false}
        optimized={optimized}
        onBlur={() => setFieldTouched(fieldPath)}
        deburr
        search
        control={InnerDropdown}
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
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          className="three-field"
        >
          <ModalHeader>
            <Header as="h3">Choose Items</Header>
            <SearchComponent vocab={optionsListName} parents={parentsState} />
          </ModalHeader>

          <ModalContent>
            <Grid>
              <Grid columns={1}>
                <Grid columns={amount} className="gapped">
                  {Array.from(
                    { length: parentsState.length + 1 },
                    (_, index) => (
                      <React.Fragment key={index}>
                        {renderColumns(index)}
                      </React.Fragment>
                    )
                  )}
                </Grid>
              </Grid>
            </Grid>
          </ModalContent>
          <ModalActions>
            <Grid.Row>
              {selectedState.map((item) => (
                <Label key={item.value}>
                  {" "}
                  <Breadcrumb
                    icon="left angle"
                    sections={item.hierarchy.title}
                  />
                  <Button
                    className="small transparent"
                    // onClick={handleSelect(item)}
                    onClick={handleSelect(item)}
                  >
                    <Icon name="delete" />
                  </Button>
                </Label>
              ))}
              <Button
                content="Confirm"
                labelPosition="right"
                floated="right"
                icon="checkmark"
                onClick={() => setOpenState(false)}
                secondary
              />
              {/* click confirm=> setfield */}
            </Grid.Row>
          </ModalActions>
        </Modal>
      )}
    </React.Fragment>
  );
};

HierarchicalVocabularyField.propTypes = {
  fieldPath: PropTypes.string.isRequired,
  multiple: PropTypes.bool,
  optionsListName: PropTypes.string.isRequired,
  helpText: PropTypes.string,
  noResultsMessage: PropTypes.string,
  usedOptions: PropTypes.array,
  showLeafsOnly: PropTypes.bool,
  optimized: PropTypes.bool,
};

HierarchicalVocabularyField.defaultProps = {
  noResultsMessage: "No results found.",
  showLeafsOnly: false,
  optimized: false,
};
