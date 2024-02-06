import { Button } from "primereact/button";
import React from "react";

const SubmitButton = ({ label, loading = false, ...props }) => {
  return (
    <Button
      className="rounded submit-btn"
      type="submit"
      label={label || ""}
      icon="pi pi-check"
      iconPos="right"
      loading={loading}
      disabled={loading}
      {...props}
    />
  );
};

export default SubmitButton;
