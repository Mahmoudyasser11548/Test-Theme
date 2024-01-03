import React from "react";
import { ErrorMessage, useField } from "formik";
import { InputText } from "primereact/inputtext";

const InputField = ({ label, placeholder = "enter value", ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="p-field d-flex flex-column">
      <label htmlFor={field.name}>{label}</label>
      <InputText placeholder={placeholder} {...field} {...props} />
      {meta.touched && meta.error ? (
        <ErrorMessage className="p-error">{meta.error}</ErrorMessage>
      ) : null}
    </div>
  );
};

export default InputField;
