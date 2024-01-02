import React from "react";
import StatusBodyTemplate from "../../Components/DataTable/Templates/StatusBodyTemplate";
import ActionBodyTemplate from "../../Components/DataTable/Templates/ActionBodyTemplate";
import DateBodyTemplate from "../../Components/DataTable/Templates/DateBodyTemplate";

const Columns = (editHandler, deleteHandler) => {
  const statusBody = (rowData) => {
    return <StatusBodyTemplate value={rowData.status} severity={"sucess"} />;
  };

  const actionBody = (rowData) => {
    return (
      <ActionBodyTemplate
        rowData={rowData}
        editHandler={editHandler}
        deleteHandler={deleteHandler}
      />
    );
  };

  const DateBody = (rowData) => {
    return <DateBodyTemplate rowData={rowData} />;
  };

  return [
    { field: "code", header: "Code", sortable: true },
    { field: "name", header: "Name", sortable: true },
    { field: "category", header: "Category", sortable: true },
    { field: "quantity", header: "Quantity" },
    { field: "date", header: "Date", body: DateBody },
    { field: "status", header: "Status", body: statusBody },
    { field: "acion", body: actionBody },
  ];
};

export default Columns;
