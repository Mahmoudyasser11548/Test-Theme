/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
import React from "react";
import ActionBodyTemplate from "../../Components/DataTable/Templates/ActionBodyTemplate";
import { PermissionButton } from "@customcomponents";

export const Columns = (deleteHandler, editHandler) => {
  const ActionsBtns = (rowData) => {
    return (
      <>
        {rowData?.isAuthorized && (
          <PermissionButton
            icon="pi pi-cloud-download"
            outlined
            severity="success"
            className="border-0 me-1 action-btn"
            // onClick={() => {
            //   downloadReport(row);
            // }}
          />
        )}
        <PermissionButton
          icon="pi pi-gift"
          outlined
          severity="success"
          className="border-0 me-1 action-btn"
          onClick={() =>
            window.open(`displayed-rewards/${row?.id}`, "_blank").focus()
          }
        />
        <PermissionButton
          icon="pi pi-book"
          outlined
          severity="warning"
          className="border-0 me-1 action-btn"
          onClick={() =>
            !row?.isAuthorized
              ? window.open(`displayed-wheel/${row?.id}`, "_blank").focus()
              : window.open(`/guests/registration/${row?.id}`, "_blank").focus()
          }
        />
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
    },
    {
      field: "tenantName",
      header: "Tenant",
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
