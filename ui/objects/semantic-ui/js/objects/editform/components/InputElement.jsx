import React, { forwardRef } from "react";
import { Form, Icon } from "semantic-ui-react";
import { useFormikContext, getIn, useField } from "formik";
import PropTypes from "prop-types";

export const InputElement = forwardRef(
  (
    {
      fieldPath,
      onClick,
      label,
      placeholder,
      className,
      clearButtonClassName,
      handleClear,
      onKeyDown,
    },
    ref
  ) => {
    
    const { errors } = useFormikContext();
    const inputError = getIn(errors, fieldPath, undefined);
    const [value] = useField(fieldPath);

    return (
      <Form.Input
        error={inputError}
        onClick={onClick}
        onKeyDown={onKeyDown}
        label={label}
        value={value.value}
        placeholder={placeholder}
        className={className}
        icon={
          value ? (
            <Icon
              className={clearButtonClassName}
              name="close"
              onClick={handleClear}
            />
          ) : null
        }
      />
    );
  }
);

InputElement.propTypes = {
  onClick: PropTypes.func,
  clearButtonClassName: PropTypes.string,
  handleClear: PropTypes.func,
  fieldPath: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  onKeyDown: PropTypes.func,
};

InputElement.defaultProps = {
  clearButtonClassName: "clear-icon",
};
