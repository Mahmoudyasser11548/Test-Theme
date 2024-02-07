import React from "react";
import ActionBodyTemplate from "../../Components/DataTable/Templates/ActionBodyTemplate";
import { classNames } from "primereact/utils";
import AvatarWithNameTemplate from "../../Components/DataTable/Templates/AvatarWithNameTemplate";
import { PermissionButton } from "@customcomponents";

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

  const activateTemplate = (rowData) => {
    return (
      <i
        className={classNames("pi", {
          "true-icon pi-check-circle": rowData.isRequired,
          "false-icon pi-times-circle": !rowData.isRequired,
        })}
      ></i>
    );
  };

  return [
    { field: "name", header: "Name", sortable: true },
    { field: "isRequired", header: "isRequired", body: activateTemplate },
    {
      field: "actions",
      header: "Actions",
      body: ActionsBtns,
      style: { width: "9rem" },
    },
  ];
};

export const RewardColumns = (deleteHandler, editHandler, extraHandler) => {
  const AvatarImage = (rowData) => {
    return <AvatarWithNameTemplate image={rowData.logo} />;
  };

  const ActionsBtns = (rowData) => {
    return (
      <>
        <PermissionButton
          icon="pi pi-plus-circle"
          outlined
          severity="success"
          className="border-0 me-1 action-btn"
          onClick={() => extraHandler(row?.id)}
        />
        <ActionBodyTemplate
          rowData={rowData}
          deleteHandler={deleteHandler}
          editHandler={editHandler}
        />
      </>
    );
  };

  const activateTemplate = (rowData) => {
    return (
      <i
        className={classNames("pi", {
          "true-icon pi-check-circle": rowData.isRequired,
          "false-icon pi-times-circle": !rowData.isRequired,
        })}
      ></i>
    );
  };

  return [
    { field: "name", header: "Name", sortable: false },
    {
      header: "Quantity",
      sortable: false,
      body: (rowData) => rowData?.quantity + rowData?.consumed,
    },
    { field: "quantity", header: "Remaining", sortable: false },
    { field: "consumed", header: "Consumed", sortable: false },
    { field: "win", header: "Win", body: activateTemplate },
    {
      field: "image",
      header: "Image",
      body: AvatarImage,
    },
    {
      field: "actions",
      header: "Actions",
      body: ActionsBtns,
      style: { width: "9rem" },
    },
  ];
};
