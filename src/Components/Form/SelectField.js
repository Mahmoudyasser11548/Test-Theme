/* eslint-disable no-unused-vars */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
import { useField } from "formik";
import React from "react";
import classnames from "classnames";
import { Label, FormGroup } from "reactstrap";
import Select from "react-select";
import { useLanguage } from "@hooks/useLanguage";
import { Message } from "primereact/message";

function SelectField({
  label,
  label_key,
  withFeedbackLabel = true,
  customFeedbackLabel,
  showCustomFeedbackLable = false,
  options,
  keyValue,
  getOptionLabel,
  title,
  callBack = () => {},
  ...props
}) {
  const { locale } = useLanguage();
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { onChange, value, ...fieldProps } = field;

  const selectedObj =
    options &&
    options?.find((a) =>
      keyValue ? a[keyValue] === field.value : a === field.value,
    );

  const handleGetLabel = (o) => {
    if (getOptionLabel) {
      return getOptionLabel(o);
    }
    if (typeof o[title] === "object") {
      return o[title][locale.code];
    }
    return o[title];
  };

  return (
    <>
      <div className="mb-1">
        {label && (
          <Label className="form-label" for={field.name}>
            {label}
          </Label>
        )}
        <Select
          isClearable
          value={selectedObj || ""}
          className={classnames("react-select", {
            "is-invalid": error && touched,
          })}
          menuPlacement="auto"
          options={options}
          isOptionDisabled={(option) => option.disabled}
          getOptionLabel={handleGetLabel}
          getOptionValue={(option) =>
            option[keyValue] !== undefined ? option[keyValue] : option
          }
          onChange={(option) => {
            helpers.setTouched(true);
            if (option) {
              helpers.setValue(
                option[keyValue] !== undefined ? option[keyValue] : option,
              );
              callBack({ name: field.name, value: option });

              return;
            }
            callBack({ name: field.name, value: "" });

            helpers.setValue("");
          }}
          {...props}
          classNamePrefix="select"
          {...fieldProps}
        />
        {error && touched && (
          <Message severity="error" text={error} className="mt-1" />
        )}
      </div>
    </>
  );
}

export default SelectField;
