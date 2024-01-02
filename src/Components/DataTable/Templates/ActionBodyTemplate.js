import { Button } from "primereact/button";
import React from "react";

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
        <Button
          icon="pi pi-pencil"
          outlined
          className="me-1 rounded-pill"
          onClick={() => editHandler(rowData)}
        />
      )}
      {!hideDelete && (
        <Button
          icon="pi pi-trash"
          outlined
          severity="danger"
          className="rounded-pill"
          onClick={() => deleteHandler(rowData)}
        />
      )}
    </React.Fragment>
  );
};

export default ActionBodyTemplate;
