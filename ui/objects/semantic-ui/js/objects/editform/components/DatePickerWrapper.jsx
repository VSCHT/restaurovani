import React from "react";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";

export const DatePickerWrapper = ({
  placeholder,
  clearButtonClassName,
  handleChange,
  datePickerProps,
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
      isClearable
      showYearPicker={
        dateFormat == "yyyy" || dateFormat.indexOf("GGG") > -1 ? true : false
      }
      placeholderText={placeholder}
      {...datePickerProps}
    />
  );
};

DatePickerWrapper.propTypes = {
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
};
