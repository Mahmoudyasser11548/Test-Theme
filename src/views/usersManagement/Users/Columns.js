/* eslint-disable no-unused-vars */
import React from "react";
import ActionBodyTemplate from "../../../Components/DataTable/Templates/ActionBodyTemplate";
import { Trans } from "@lingui/react";

export const Columns = (deleteHandler, editHandler) => {
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
      field: "username",
      header: <Trans id="Username" />,
      sortable: true,
    },
    {
      field: "email",
      header: "Email",
      sortable: true,
    },
    {
      field: "actions",
      header: "Actions",
      body: ActionsBtns,
      style: { width: "9rem" },
    },
  ];
};
