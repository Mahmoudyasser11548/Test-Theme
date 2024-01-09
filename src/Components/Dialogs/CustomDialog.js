/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import SubmitButton from "../Btns/SubmitButton";
import { Trans } from "@lingui/react";

const CustomDialog = ({
  title = "Title",
  body,
  show,
  onHide,
  onConfirmHandler,
  onHideDispatch = true,
  dispatchConfirm = false,
  closeOutside = false,
  loading = false,
  closeOnConfirm = true,
  showConfirmButton = true,
  showFooter = true,
  closeButtonTitle = "Close",
  confirmButtonTitle = "accept",
  submitButtonColor = "primary",
  closeButtonColor = "secondary",
}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const close = () => {
    if (!onHideDispatch && onHide) onHide();
    else onHide ? dispatch(onHide()) : setOpen(false);
  };

  const confirmHandler = () => {
    dispatchConfirm
      ? onConfirmHandler && dispatch(onConfirmHandler())
      : onConfirmHandler && onConfirmHandler();
    closeOnConfirm && close();
  };

  useEffect(() => {
    setOpen(show);
  }, [show]);

  return (
    <div>
      <Dialog
        header={title}
        visible={open}
        style={{ width: "50vw" }}
        onHide={closeOutside ? close : null}
        maximizable
        footer={
          showFooter && (
            <div>
              <Button
                className="rounded me-1"
                label={<Trans id={closeButtonTitle} />}
                icon="pi pi-times"
                onClick={close}
                color={closeButtonColor}
              />
              {showConfirmButton && confirmButtonTitle && (
                <SubmitButton
                  className="rounded"
                  loading={loading}
                  label={<Trans id={confirmButtonTitle} />}
                  onClick={confirmHandler}
                  color={submitButtonColor}
                />
              )}
            </div>
          )
        }
      >
        {body}
      </Dialog>
    </div>
  );
};

export default CustomDialog;
