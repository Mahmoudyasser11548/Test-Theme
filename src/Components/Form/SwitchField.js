/* eslint-disable no-unused-vars */
import React from "react";
import { useField } from "formik";
import { InputSwitch } from "primereact/inputswitch";
import { Label, FormGroup } from "reactstrap";

const SwitchField = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);

  return (
    <FormGroup className="d-flex justify-content-center align-align-items-center">
      {label && (
        <label className="form-label me-1" for={field.name}>
          {label}
        </label>
      )}
      <InputSwitch
        checked={field.value}
        onChange={(e) => helpers.setValue(e.value)}
        {...props}
        {...field}
      />
    </FormGroup>
  );
};

export default SwitchField;
