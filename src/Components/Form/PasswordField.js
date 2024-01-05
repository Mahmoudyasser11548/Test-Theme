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
    <div>
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
        {touched && error && (
          <FormFeedback className="p-error">{error}</FormFeedback>
        )}
      </div>
    </div>
  );
};

export default PasswordField;
