import React, { useMemo, useState, useEffect } from "react";
import { SelectField } from "react-invenio-forms";
import { useFormConfig } from "@js/oarepo_ui";
import { useFormikContext, getIn, setIn } from "formik";
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
  BreadcrumbDivider,
  BreadcrumbSection,
  Label,
} from "semantic-ui-react";
import { serializedVocabularyItems } from "@js/oarepo_vocabularies";
import axios from "axios";

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
  const formik = useFormikContext();
  console.log(formik.values);

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
  console.log(serializedVocabularyItems);
  console.log(serializedOptions);
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

  const handleSelect = (option, val, e) => {
    e?.preventDefault();
    const existingIndex = selectedState.findIndex((item) => item.value === val);

    if (existingIndex !== -1) {
      setSelectedState((prevState) => {
        const newState = [...prevState];
        newState.splice(existingIndex, 1);
        return newState;
      });
    } else {
      if (multiple || selectedState.length === 0) {
        setSelectedState((prevState) => [
          ...prevState,
          {
            value: val,
            hierarchy:
              typeof option.hierarchy.title[0] === "string"
                ? option.hierarchy
                : {
                    ...option.hierarchy,
                    title: option.hierarchy.title.map((i) => i.cs),
                  },
          },
        ]);
      } else {
        setSelectedState([
          {
            value: val,
            hierarchy:
              typeof option.hierarchy.title[0] === "string"
                ? option.hierarchy
                : {
                    ...option.hierarchy,
                    title: option.hierarchy.title.map((i) => i.cs),
                  },
          },
        ]);
      }
    }
  };

  const handleSubmit = () => {
    const prepSelect = [
      ...selectedState.map((item, index) => {
        return {
          key: crypto.randomUUID(),
          id: item.value,
          title: [
            ...item.hierarchy.title.map((i) => {
              return { cs: i };
            }),
          ],
        };
      }),
    ];

    const updatedValues = setIn(formik.values, fieldPath, prepSelect);

    formik.setValues(updatedValues);
    setOpenState(false);
    setSelectedState([]);
    setParentsState([]);
  };

  const amount =
    serializedOptions[serializedOptions.length - 1].hierarchy.ancestors.length +
    1;

  const renderColumns = (index) => {
    return (
      <Grid.Column>
        {serializedOptions.map((option) => {
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
                {multiple && (
                  <Checkbox
                    checked={
                      selectedState.findIndex(
                        (item) => item.value === option.value
                      ) != -1
                        ? true
                        : false
                    }
                    className={
                      selectedState.findIndex(
                        (item) => item.hierarchy.ancestors.includes(option.value)
                      ) != -1
                        ? "indeterminate"
                        : ""
                    }
                    onChange={(e) => {
                      handleSelect(option, option.value, e);
                    }}
                  />
                )}
                <Button
                  basic
                  color="black"
                  onClick={updateHierarchy(option.value, index)}
                  onDoubleClick={(e) => {
                    handleSelect(option, option.value, e);
                  }}
                  onKeyPress={(e) => {
                    handleSelect(option, option.value, e);
                  }}
                  onKeyDown={(e)=> { e.preventDefault(); updateHierarchy(serializedOptions[index+1]?.value, index)}}
                  onKeyUp={(e)=>{  e.preventDefault(); updateHierarchy(serializedOptions[index-1]?.value, index)}}
                >
                  {option.text}
                </Button>
                {option.element_type == "parent" && (
                  <Button onClick={updateHierarchy(option.value, index)}>
                    {index !== amount - 1 ? (
                      <Icon name="angle right black " />
                    ) : null}
                  </Button>
                )}
              </Grid.Row>
            );
          }
        })}
      </Grid.Column>
    );
  };
  useEffect(()=>{
    console.log(parentsState)
    console.log(selectedState)
  }, [parentsState, selectedState])

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
          const response = await axios.get(apiUrl);
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
            {searchResults.map((result, index) => (
              <Label
                key={index}
                onClick={(e) => {
                  handleSelect(result, result.id, e);
                }}
              >
                {" "}
                <Breadcrumb>
                  {result.hierarchy.title.map((item, i) => (
                    <>
                      <BreadcrumbSection key={i}>{item.cs}</BreadcrumbSection>
                      <BreadcrumbDivider icon="left angle" />
                    </>
                  ))}
                </Breadcrumb>
              </Label>
            ))}
          </Grid>
        )}
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
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          className="tree-field"
        >
          <ModalHeader>
            <Grid.Row>
              <Header as="h3">Choose Items</Header>
              <SearchComponent vocab={optionsListName} />
            </Grid.Row>
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
              <Grid.Row style={{ width: "80%", flexWrap: "wrap" }}>
                {selectedState.map((item) => (
                  <Label key={item.value}>
                    {" "}
                    <Breadcrumb
                      icon="left angle"
                      sections={item.hierarchy.title}
                    />
                    <Button
                      className="small transparent"
                      onClick={(e) => {
                        handleSelect(item, item.value, e);
                      }}
                    >
                      <Icon name="delete" />
                    </Button>
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
