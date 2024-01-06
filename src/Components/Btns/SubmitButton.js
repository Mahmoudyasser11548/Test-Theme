import { Button } from "primereact/button";
import React from "react";

const SubmitButton = ({ label = "Submit", loading = false, ...props }) => {
  return (
    <Button
      type="submit"
      label={label}
      icon="pi pi-check"
      iconPos="right"
      loading={loading}
      disabled={loading}
      {...props}
    />
  );
};

export default SubmitButton;
