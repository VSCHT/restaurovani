import React, { useState, useEffect } from "react";
import { useField, useFormikContext } from "formik";
import PropTypes from "prop-types";
import { FieldLabel, GroupField } from "react-invenio-forms";
import { Form } from "semantic-ui-react";
import { DatePickerWrapper } from "./DatePickerWrapper";

export const DaterangePicker = ({
  fieldPath,
  label,
  dateFormat,
  required,
  clearButtonClassName,
  startDateInputPlaceholder,
  endDateInputPlaceholder,
}) => {
  const [field] = useField(fieldPath);
  const { setFieldValue } = useFormikContext();

  const [dates, setDates] = useState([null, null]);

  useEffect(() => {
    if (field?.value) {
      const { since, until } = field.value;
      const startDate = new Date(since);
      const endDate = new Date(until);
      setDates([startDate, endDate]);
    } else {
      setDates([null, null]);
    }
  }, [field?.value]);

  const handleChange = (newDates) => {
    const [startDate, endDate] = newDates.map(date => {
      if (date) {
        return dateFormat === "yyyy" ? date.toISOString().slice(0, 4) : date.toISOString().slice(0, 10);
      }
      return null;
    });
    setFieldValue(fieldPath, { since: startDate, until: endDate });
  };

  const handleStartDateChange = (date) => {
    const newDates = [date, dates[1]];
    setDates(newDates);
    handleChange(newDates);
  };

  const handleEndDateChange = (date) => {
    const newDates = [dates[0], date];
    setDates(newDates);
    handleChange(newDates);
  };

  const handleClearStartDate = () => {
    const newDates = [null, dates[1]];
    setDates(newDates);
    handleChange(newDates);
  };

  const handleClearEndDate = () => {
    const newDates = [dates[0], null];
    setDates(newDates);
    handleChange(newDates);
  };

  return (
    <Form.Field className="ui datepicker" required={required}>
      <FieldLabel htmlFor={fieldPath} label={label} />
      <GroupField>
        <DatePickerWrapper
          fieldPath={`${fieldPath}.since`}
          handleChange={handleStartDateChange}
          handleClear={handleClearStartDate}
          placeholder={startDateInputPlaceholder}
          clearButtonClassName={clearButtonClassName}
          dateFormat={dateFormat}
          datePickerProps={{
            selected: dates[0],
            startDate: dates[0],
            endDate: dates[1],
            selectsStart: true,
            maxDate: dates[1] ?? undefined,
          }}
          customInputProps={{ label: { startDateInputPlaceholder } }}
        />
        <DatePickerWrapper
          fieldPath={`${fieldPath}.until`}
          handleChange={handleEndDateChange}
          handleClear={handleClearEndDate}
          placeholder={endDateInputPlaceholder}
          dateFormat={dateFormat}
          clearButtonClassName={clearButtonClassName}
          datePickerProps={{
            selected: dates[1],
            startDate: dates[0],
            endDate: dates[1],
            selectsEnd: true,
            minDate: dates[0],
          }}
          customInputProps={{ label: { endDateInputPlaceholder } }}
        />
      </GroupField>
    </Form.Field>
  );
};

DaterangePicker.propTypes = {
  fieldPath: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  dateFormat: PropTypes.string.isRequired,
  required: PropTypes.bool,
  clearButtonClassName: PropTypes.string,
  startDateInputPlaceholder: PropTypes.string,
  endDateInputPlaceholder: PropTypes.string,
};

DaterangePicker.defaultProps = {
  required: false,
  clearButtonClassName: "clear-icon",
};