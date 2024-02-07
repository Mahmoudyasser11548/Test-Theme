import React from "react";
import { useField } from "formik";
import { ColorPicker } from "primereact/colorpicker";
import { Message } from "primereact/message";

const ColorPickerField = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;

  const handleChange = (e) => {
    helpers.setValue(e.value); // Update Formik field value
  };

  return (
    <div className="p-field">
      <label htmlFor={field.name} className="me-1">
        {label}
      </label>
      <ColorPicker
        {...field}
        {...props}
        id={field.name}
        onChange={handleChange}
      />
      {touched && error && (
        <Message severity="error" text={error} className="mt-1" />
      )}
    </div>
  );
};

export default ColorPickerField;
