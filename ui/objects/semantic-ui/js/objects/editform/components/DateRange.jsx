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
  const [format, setFormat] = useState([dateFormat, dateFormat]);

  useEffect(() => {
    if (field?.value) {
      const { since, until } = field.value;
      let startDate;
      let endDate;
      if (String(since).length <= 4) {
        if (String(since).length < 4) {
          const yearLengthSince = String(since).length - 1;
          const formatStringSince = "y".repeat(yearLengthSince) + " GGG";
          setFormat((prevFormat) => ({
            ...prevFormat,
            [0]: formatStringSince,
          }));

          startDate = new Date(since + 1, 0);
        } else {
          startDate = new Date(since, 0);
        }

        if (String(until).length === 4) {
          endDate = new Date(until, 0);
        } else {
          const yearLengthUntil = String(until).length - 1;
          const formatStringUntil = "y".repeat(yearLengthUntil) + " GGG";
          setFormat((prevFormat) => ({
            ...prevFormat,
            [1]: formatStringUntil,
          }));
          endDate = new Date(until + 1, 0);
        }
      } else {
        startDate = new Date(since);
        endDate = new Date(until);
      }
      setDates([startDate, endDate]);
    }
  }, []);

  const handleChange = (newDates) => {
    const [startDate, endDate] = newDates.map((date) => {
      if (date) {
        return dateFormat === "yyyy"
          ? date.getFullYear()
          : date.toISOString().slice(0, 10);
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

  return (
    <Form.Field className="ui datepicker" required={required}>
      <FieldLabel htmlFor={fieldPath} label={label} />
      <GroupField>
        <DatePickerWrapper
          handleChange={handleStartDateChange}
          placeholder={startDateInputPlaceholder}
          clearButtonClassName={clearButtonClassName}
          dateFormat={format[0]}
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
          handleChange={handleEndDateChange}
          placeholder={endDateInputPlaceholder}
          dateFormat={format[1]}
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
