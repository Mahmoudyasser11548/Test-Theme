import React from "react";
import { useField } from "formik";
import { InputText } from "primereact/inputtext";
import classNames from "classnames";
import { FormFeedback } from "reactstrap";

const InputField = ({ label, placeholder = "enter value", ...props }) => {
  const [field, meta] = useField(props);
  const { touched, error } = meta;
  return (
    <div className="p-field d-flex flex-column">
      {label && <label htmlFor={field.name}>{label}</label>}

      <InputText
        className={classNames({ "p-invalid": error && touched })}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {touched && error ? (
        <FormFeedback className="p-error">{error}</FormFeedback>
      ) : null}
    </div>
  );
};

export default InputField;
