import React from "react";
import ActionBodyTemplate from "../../Components/DataTable/Templates/ActionBodyTemplate";

export const SegmantsColumns = (deleteHandler, editHandler) => {
  const ActionsBtns = (rowData) => {
    return (
      <>
        <ActionBodyTemplate
          rowData={rowData}
          editHandler={editHandler}
          deleteHandler={deleteHandler}
        />
      </>
    );
  };

  return [
    { field: "label", header: "Label", sortable: true },
    { field: "color", header: "Color" },
    {
      field: "actions",
      header: "Actions",
      body: ActionsBtns,
      style: { width: "9rem" },
    },
  ];
};

export const FieldsColumns = (deleteHandler) => {
  const ActionsBtns = (rowData) => {
    return (
      <>
        <ActionBodyTemplate
          rowData={rowData}
          deleteHandler={deleteHandler}
          hideEdit={true}
        />
      </>
    );
  };

  return [
    { field: "name", header: "Name", sortable: true },
    { field: "isRequired", header: "isRequired" },
    {
      field: "actions",
      header: "Actions",
      body: ActionsBtns,
      style: { width: "9rem" },
    },
  ];
};
