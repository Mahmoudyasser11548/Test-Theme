import React, { Fragment } from "react";
import { useField } from "formik";
import { RadioButton } from "primereact/radiobutton";

const RadioField = ({ options, ...props }) => {
  const [field, , helpers] = useField(props);

  return (
    <Fragment>
      {options.map((option) => (
        <div key={option.value} className="p-col">
          <div className="p-field-radiobutton">
            <RadioButton
              id={field.name}
              {...field}
              {...props}
              value={option.value}
              checked={field.value === option.value}
              onChange={() => helpers.setValue(option.value)}
            />
            <label htmlFor={field.name} className="ms-1">
              {option.label}
            </label>
          </div>
        </div>
      ))}
    </Fragment>
  );
};

export default RadioField;
