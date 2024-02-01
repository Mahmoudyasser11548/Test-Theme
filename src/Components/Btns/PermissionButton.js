import React from "react";
import { useSelector } from "react-redux";
import { Ripple } from "primereact/ripple";
import { Button } from "primereact/button";

function PermissionButton({ permission, ...props }) {
  const { user } = useSelector((state) => state.auth);

  if (!permission) {
    return (
      <Button {...props}>
        {props.children}
        <Ripple />
      </Button>
    );
  }

  return permission && user.permissions.includes(permission) ? (
    <Button {...props}>
      {props.children}
      <Ripple />
    </Button>
  ) : null;
}

export default PermissionButton;
