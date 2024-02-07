import React from "react";
import { useField } from "formik";
import { Calendar } from "primereact/calendar";
import classNames from "classnames";
import { Message } from "primereact/message";

const DatePickerField = ({
  label,
  placeholder = "Enter date",
  enableTime = false,
  callBack = () => {},
  ...props
}) => {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;

  return (
    <div className="p-field d-flex flex-column mb-1">
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
        <Message severity="error" text={error} className="mt-1" />
      )}
    </div>
  );
};

export default DatePickerField;
