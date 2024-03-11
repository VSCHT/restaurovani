import React from "react";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";
import { InputElement } from "./InputElement";

export const DatePickerWrapper = ({
  fieldPath,
  placeholder,
  clearButtonClassName,
  handleChange,
  handleClear,
  datePickerProps,
  customInputProps,
  dateFormat,
}) => {
  return (
    <DatePicker
      onChange={(date) => {
        handleChange(date);
      }}
      autoComplete="off"
      clearButtonClassName={clearButtonClassName}
      dateFormat={dateFormat}
      showYearPicker={dateFormat == "yyyy" ? true : false}
      customInput={
        <InputElement
          handleClear={handleClear}
          fieldPath={fieldPath}
          clearButtonClassName={clearButtonClassName}
          {...customInputProps}
        />
      }
      placeholderText={placeholder}
      {...datePickerProps}
    />
  );
};

DatePickerWrapper.propTypes = {
  fieldPath: PropTypes.string.isRequired,
  datePickerProps: PropTypes.object,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  clearButtonClassName: PropTypes.string,
  handleChange: PropTypes.func,
  handleClear: PropTypes.func,
  customInputProps: PropTypes.object,
  dateFormat: PropTypes.string,
};

DatePickerWrapper.defaultProps = {
  required: false,
  placeholder: "Choose a date.",
  clearButtonClassName: "clear-icon",
};
