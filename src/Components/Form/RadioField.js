import React, { Fragment } from "react";
import { useField } from "formik";
import { RadioButton } from "primereact/radiobutton";
import classNames from "classnames";

const RadioField = ({ options, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  return (
    <Fragment>
      {options.map((option) => (
        <div key={option.value} className="p-col">
          <div className="p-field-radiobutton">
            <RadioButton
              className={classNames({ "p-invalid": error && touched })}
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
