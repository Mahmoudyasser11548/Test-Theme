import classNames from "classnames";
import { useField } from "formik";
import React from "react";
import PhoneInput from "react-phone-input-2";

import "react-phone-input-2/lib/material.css";
import { FormFeedback, Label } from "reactstrap";

function PhoneField({ ...props }) {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;

  return (
    <div>
      <PhoneInput
        containerClass={classNames({ "p-invalid": error && touched })}
        country="eg"
        inputClass="phone-input"
        // enableSearch={true}
        // disableSearchIcon={true}
        onChange={(phone) => {
          helpers.setValue(phone);
        }}
        inputProps={{ name: field.name }}
        {...props}
        {...field}
      />
      {error && touched && <FormFeedback>{error}</FormFeedback>}
    </div>
  );
}

export default PhoneField;
