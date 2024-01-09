import { Button } from "primereact/button";
import React, { useRef } from "react";
import PopupDialog from "../../Dialogs/PopupDialog";

const ActionBodyTemplate = ({
  rowData,
  showPopup,
  onHidePopup,
  confirmHandler,
  // editPermission,
  // deletePermission,
  editHandler,
  deleteHandler,
  hideDelete = false,
  hideEdit = false,
}) => {
  const target = useRef(null);

  return (
    <React.Fragment>
      {!hideEdit && (
        <Button
          icon="pi pi-pencil"
          outlined
          className="me-1 rounded-pill"
          onClick={() => editHandler(rowData)}
        />
      )}
      {!hideDelete && (
        <>
          <PopupDialog
            target={target.current}
            show={showPopup}
            onHide={onHidePopup}
            confirmHandler={confirmHandler}
          />
          <Button
            ref={target}
            icon="pi pi-trash"
            outlined
            severity="danger"
            className="rounded-pill"
            onClick={() => deleteHandler(rowData)}
          />
        </>
      )}
    </React.Fragment>
  );
};

export default ActionBodyTemplate;
