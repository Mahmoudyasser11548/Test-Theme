import React from "react";
import { useField } from "formik";
import { Calendar } from "primereact/calendar";
import classNames from "classnames";
import { FormFeedback } from "reactstrap";

const DatePickerField = ({
  label,
  placeholder,
  enableTime = false,
  callBack = () => {},
  ...props
}) => {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;

  return (
    <div className="p-field d-flex flex-column">
      <label htmlFor={field.name}>{label}</label>
      <Calendar
        id={props.id || props.name}
        className={classNames({ "p-invalid": error && touched })}
        placeholder={placeholder}
        showTime={enableTime}
        value={field.value}
        showIcon
        onChange={(e) => {
          helpers.setValue(e.value);
          callBack({ name: field.name, value: e.value });
        }}
        {...props}
      />
      {touched && error && (
        <FormFeedback className="p-error">{error}</FormFeedback>
      )}
    </div>
  );
};

export default DatePickerField;
