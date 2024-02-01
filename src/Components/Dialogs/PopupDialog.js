/* eslint-disable no-unused-expressions */
import React, { useEffect, useRef, useState } from "react";
import { ConfirmPopup } from "primereact/confirmpopup";
import { Toast } from "primereact/toast";
import { useDispatch } from "react-redux";

const PopupDialog = ({
  target,
  message = "Are you sure you want to proceed?",
  icon = "pi pi-exclamation-triangle",
  show,
  onHideDispatch = true,
  dispatchConfirm = false,
  onConfirmHandler = () => {},
  closeOnConfirm = true,
  onHide,
  showToast,
}) => {
  const toast = useRef(null);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);

  const close = () => {
    if (!onHideDispatch && onHide) onHide();
    else onHide ? dispatch(onHide()) : setOpen(false);
  };

  const showToastElement = () => {
    showToast &&
      toast.current.show({
        severity: "info",
        summary: "Confirmed",
        detail: "You have accepted",
        life: 3000,
      });
  };

  const confirmHandler = () => {
    dispatchConfirm
      ? onConfirmHandler && dispatch(onConfirmHandler())
      : onConfirmHandler && onConfirmHandler() && showToastElement();
    closeOnConfirm && close();
  };

  useEffect(() => {
    setOpen(show);
  }, [show]);

  return (
    <>
      {showToast && <Toast ref={toast} />}
      <ConfirmPopup
        pt={{
          root: { className: "surface-100" },
        }}
        target={target}
        visible={open}
        onHide={close}
        message={message}
        icon={icon}
        accept={confirmHandler}
        acceptIcon="pi pi-check"
        rejectIcon="pi pi-times"
        rejectclass="p-button-sm"
        acceptclass="p-button-outlined p-button-sm"
      />
    </>
  );
};

export default PopupDialog;
