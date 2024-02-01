/* eslint-disable no-unused-vars */
import React from "react";
import ActionBodyTemplate from "../../Components/DataTable/Templates/ActionBodyTemplate";
import AvatarWithNameTemplate from "../../Components/DataTable/Templates/AvatarWithNameTemplate";
import classNames from "classnames";

export const Columns = (deleteHandler, editHandler) => {
  // Body Template
  const AvatarImage = (rowData) => {
    return <AvatarWithNameTemplate rowData={rowData} image={rowData.logo} />;
  };

  const activateTemplate = (rowData) => {
    return (
      <i
        className={classNames("pi", {
          "true-icon pi-check-circle": rowData.isActive,
          "false-icon pi-times-circle": !rowData.isActive,
        })}
      ></i>
    );
  };

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
    {
      field: "name",
      header: "Name",
      sortable: true,
      body: AvatarImage,
    },
    {
      field: "phoneNumber",
      header: "Phone Number",
      sortable: true,
    },
    { field: "isActive", header: "isActive", body: activateTemplate },
    {
      field: "actions",
      header: "Actions",
      body: ActionsBtns,
      style: { width: "9rem" },
    },
  ];
};
