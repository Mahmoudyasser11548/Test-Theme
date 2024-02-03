import React from "react";
import { PermissionButton } from "@customcomponents";

const ActionBodyTemplate = ({
  rowData,
  // editPermission,
  // deletePermission,
  editHandler,
  deleteHandler,
  hideDelete = false,
  hideEdit = false,
}) => {
  return (
    <React.Fragment>
      {!hideEdit && (
        <PermissionButton
          icon="pi pi-pencil"
          outlined
          className="me-1 border-0 action-btn"
          onClick={() => editHandler(rowData)}
        />
      )}
      {!hideDelete && (
        <>
          <PermissionButton
            icon="pi pi-trash"
            outlined
            severity="danger"
            className="border-0 delete-btn"
            onClick={() => deleteHandler(rowData)}
          />
        </>
      )}
    </React.Fragment>
  );
};

export default ActionBodyTemplate;
