import React from "react";
import { useField } from "formik";
import { InputText } from "primereact/inputtext";
import classNames from "classnames";
import { FormFeedback } from "reactstrap";

const InputField = ({ label, placeholder = "Enter value", ...props }) => {
  const [field, meta] = useField(props);
  const { touched, error } = meta;
  return (
    <div className="p-field d-flex flex-column mb-1">
      {label && <label htmlFor={field.name}>{label}</label>}

      <InputText
        className={classNames({ "p-invalid": error && touched })}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {touched && error ? <span className="p-error">{error}</span> : null}
    </div>
  );
};

export default InputField;
