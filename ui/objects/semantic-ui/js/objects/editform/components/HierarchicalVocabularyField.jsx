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
  Grid,
  Icon,
  Checkbox,
  Label,
} from "semantic-ui-react";

const serializedVocabularyItems = (vocabularyItems) =>
  vocabularyItems.map((vocabularyItem) => {
    const {
      hierarchy: { title: titlesArray },
      text,
    } = vocabularyItem;
    const sections = [
      ...titlesArray.map((title, index) => {
        if (index === 0) {
          return {
            content: <span>{title}</span>,
            key: crypto.randomUUID(),
          };
        } else {
          return {
            content: (
              <span style={{ opacity: "0.5", fontSize: "0.8rem" }}>
                {title}
              </span>
            ),
            key: crypto.randomUUID(),
          };
        }
      }),
    ];
    return {
      ...vocabularyItem,
      text:
        titlesArray.length === 1 ? (
          <span>{text}</span>
        ) : (
          <Breadcrumb icon="left angle" sections={sections} />
        ),
    };
  });

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

  const handleClick = () => {
    setOpenState(true);
  };

  const handleChange = ({ e, data, formikProps }) => {
    if (multiple) {
      let vocabularyItems = allOptions.filter((o) =>
        data.value.includes(o.value)
      );
      vocabularyItems = vocabularyItems.map((vocabularyItem) => {
        return { ...vocabularyItem, id: vocabularyItem.value };
      });
      formikProps.form.setFieldValue(fieldPath, [...vocabularyItems]);
    } else {
      let vocabularyItem = allOptions.find((o) => o.value === data.value);
      vocabularyItem = { ...vocabularyItem, id: vocabularyItem?.value };
      formikProps.form.setFieldValue(fieldPath, vocabularyItem);
    }
  };

  const { values, setFieldTouched } = useFormikContext();
  const value = getIn(values, fieldPath, multiple ? [] : {});

  const [parentsState, setParentsState] = useState(["kovy"]);
  const [selectedState, setselectedState] = useState([]);

  const updateHierarchy = (parent, index) => () => {
    let updatedParents = [...parentsState];
    updatedParents.splice(index );
    updatedParents[index] = parent;

    setParentsState(updatedParents);
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
              option.hierarchy.ancestors[0] === parentsState[index - 1])
          ) {
            return (
              <Grid.Row
                key={option.hierarchy.title[index]}
                className={option.value == parentsState[index] ? "open" : ""}
              >
                <Checkbox
                  checked={String(option.value) === String(parentsState[index])}
                />
                {option.text}
                <Button
                  className="transparent"
                  onClick={updateHierarchy(option.value, index)}
                >
                  {index !== amount - 1 ? <Icon name="angle right" /> : null}
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
  }, [parentsState]);

  console.log(value);

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
        onChange={handleChange}
        onClick={handleClick}
        value={multiple ? value.map((o) => o?.id) : value?.id}
        {...uiProps}
      />
      <label className="helptext">{helpText}</label>

      {openState && (
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={<Button>Show Modal</Button>}
        >
          <ModalHeader>Choose Items</ModalHeader>

          <ModalContent>
            <Grid>
              <Grid columns={1}>
                {/* count the path length */}
                {/* repeate this amount of time */}
                {/* function -> map excluding 2 */}

                <Grid columns={amount} className="gapped">
                  {Array.from({ length: amount }, (_, index) => (
                    <React.Fragment key={index}>
                      {renderColumns(index)}
                    </React.Fragment>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </ModalContent>
          <ModalActions>
            <Grid.Row>
              {value.map((i) => {
                return <Label>{i.title.cs}</Label>;
              })}
              <Button
                content="Confirm"
                labelPosition="right"
                floated="right"
                icon="checkmark"
                onClick={() => setOpenState(false)}
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
