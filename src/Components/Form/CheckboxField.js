import React from "react";
import { Checkbox } from "primereact/checkbox";
import { useField } from "formik";
import { FormFeedback } from "reactstrap";

const CheckboxField = ({ options, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;

  const handleCheckboxChange = (e, option) => {
    const isChecked = e.checked;
    const selectedValues = field.value || [];

    let updatedValues;
    if (isChecked) {
      updatedValues = [...selectedValues, option.value];
    } else {
      updatedValues = selectedValues.filter((value) => value !== option.value);
    }

    helpers.setValue(updatedValues);
  };

  return (
    <div className="p-formgroup-inline">
      {options.map((option) => (
        <div key={option.value} className="p-field-checkbox">
          <Checkbox
            id={`${field.name}_${option.value}`} // Unique id for each checkbox
            {...field}
            value={option.value}
            onChange={(e) => handleCheckboxChange(e, option)}
            checked={field.value && field.value.includes(option.value)}
          />
          <label htmlFor={`${field.name}_${option.value}`} className="ms-1">
            {option.label}
          </label>
        </div>
      ))}
      {touched && error && (
        <FormFeedback className="p-error">{error}</FormFeedback>
      )}
    </div>
  );
};

export default CheckboxField;
