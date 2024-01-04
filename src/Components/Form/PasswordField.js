import React from "react";
import { ErrorMessage, useField } from "formik";
import { Password } from "primereact/password";

const PasswordField = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { value, setValue } = helpers;

  const handlePasswordChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <label htmlFor={field.name}>{label}</label>
      <div>
        <Password
          id={props.name}
          value={value || ""}
          onChange={handlePasswordChange}
          feedback={false}
          toggleMask
          {...props}
          {...field}
        />
        {touched && error && (
          <ErrorMessage className="p-error">{error}</ErrorMessage>
        )}
      </div>
    </div>
  );
};

export default PasswordField;
