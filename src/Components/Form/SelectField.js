/* eslint-disable no-unused-vars */
import React from "react";
import { useField } from "formik";
import { Dropdown } from "primereact/dropdown";
import { FormFeedback } from "reactstrap";
import { useLanguage } from "@hooks/useLanguage";
import classNames from "classnames";

function SelectField({
  label,
  label_key,
  options,
  keyValue = "id",
  title = "name",
  getOptionLabel,
  callBack = () => {},
  ...props
}) {
  const { locale } = useLanguage();
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { onChange, value, ...fieldProps } = field;

  const selectedOption = options.find(
    (option) => option[keyValue] === field.value,
  );

  const handleGetLabel = (option) => {
    if (getOptionLabel) {
      return getOptionLabel(option);
    }
    if (typeof option[title] === "object") {
      return option[title][locale.code];
    }
    return option[title];
  };

  return (
    <div className="p-field d-flex flex-column">
      {label && <label htmlFor={field.name}>{label}</label>}
      <Dropdown
        value={selectedOption}
        className={classNames({ "p-invalid": error && touched }, "p-dropdown")}
        options={options}
        onChange={(e) => {
          helpers.setTouched(true);
          if (e.value) {
            helpers.setValue(e.value[keyValue]);
            callBack({ name: field.name, value: e.value });
          } else {
            callBack({ name: field.name, value: "" });
            helpers.setValue("");
          }
        }}
        optionLabel={handleGetLabel}
        showClear
        {...props}
        {...fieldProps}
      />
      {error && touched && (
        <FormFeedback className="p-error">{error}</FormFeedback>
      )}
    </div>
  );
}

export default SelectField;
