import React from "react";
import { useField } from "formik";
import { Password } from "primereact/password";
import classNames from "classnames";
import { Message } from "primereact/message";

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
          placeholder="password"
          toggleMask
        />
        {touched && error && (
          <Message severity="error" text={error} className="mt-1" />
        )}
      </div>
    </div>
  );
};

export default PasswordField;
