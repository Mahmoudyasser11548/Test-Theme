/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
import React from "react";
import { useField } from "formik";
import { MultiSelect } from "primereact/multiselect";
import classNames from "classnames";
import { FormFeedback } from "reactstrap";

function MultiSelectField({ label, options, keyValue, title, ...props }) {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;

  const handleGetLabel = (option) => {
    if (typeof option[title] === "object") {
      return option[title][locale.code];
    }
    return option[title];
  };

  const selectedValues = options?.filter((option) =>
    keyValue
      ? field.value.includes(option[keyValue])
      : field.value.includes(option.value),
  );

  return (
    <div className="p-field d-flex flex-column">
      {label && <label htmlFor={field.name}>{label}</label>}
      <MultiSelect
        id={field.name}
        value={selectedValues || []}
        display="chip"
        className={classNames({ "p-invalid": error && touched })}
        options={options}
        optionLabel={handleGetLabel}
        onChange={(e) => {
          helpers.setTouched(true);
          helpers.setValue(e.value.map((o) => o[keyValue]));
        }}
        {...props}
      />
      {error && touched && (
        <FormFeedback className="p-error">{error}</FormFeedback>
      )}
    </div>
  );
}

export default MultiSelectField;
