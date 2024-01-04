/* eslint-disable no-unused-vars */
import React from "react";
import { useField } from "formik";
import { InputSwitch } from "primereact/inputswitch";

const SwitchField = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);

  return (
    <div className="d-flex align-items-center">
      <InputSwitch
        checked={field.value}
        onChange={(e) => helpers.setValue(e.value)}
        {...props}
        {...field}
      />
      {label && (
        <label className="ms-1" htmlFor={field.name}>
          {label}
        </label>
      )}
    </div>
  );
};

export default SwitchField;
