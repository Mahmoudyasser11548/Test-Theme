import React from "react";
import { useField } from "formik";
import { Password } from "primereact/password";
import classNames from "classnames";
import { FormFeedback } from "reactstrap";

const PasswordField = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { value } = field;

  const handlePasswordChange = (e) => {
    helpers.setValue(e.target.value);
  };

  return (
    <div className="mb-1">
      {label && <label htmlFor={field.name}>{label}</label>}
      <div>
        <Password
          className={classNames({ "p-invalid": error && touched })}
          {...field}
          id={field.name}
          value={value || ""}
          onChange={handlePasswordChange}
          feedback={false}
          toggleMask
        />
        {touched && error && <span className="p-error">{error}</span>}
      </div>
    </div>
  );
};

export default PasswordField;
