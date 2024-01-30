import React from "react";
import { Toast } from "primereact/toast";

const ToastAlert = ({ toastRef }) => {
  return <Toast ref={toastRef} />;
};

export default ToastAlert;
