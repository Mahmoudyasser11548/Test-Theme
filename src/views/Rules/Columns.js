import React from "react";
import StatusBodyTemplate from "../../Components/DataTable/Templates/StatusBodyTemplate";
import ActionBodyTemplate from "../../Components/DataTable/Templates/ActionBodyTemplate";
import DateBodyTemplate from "../../Components/DataTable/Templates/DateBodyTemplate";
import CustomDropdownFilter from "../../Components/DataTable/Templates/CustomDropdownFilter";

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

  const options = [
    { label: "Option 1", value: "Option 1" },
    { label: "Option 2", value: "Option 2" },
    // Add more options as needed
  ];

  return [
    {
      field: "code",
      header: "Code",
      sortable: true,
      filterType: "text",
      filter: true,
    },
    {
      field: "name",
      header: "Name",
      sortable: true,
      filterType: "text",
      filter: true,
    },
    {
      field: "category",
      header: "Category",
      sortable: true,
      filterType: "custom",
      filterElement: <CustomDropdownFilter options={options} />,
      filter: true,
    },
    {
      field: "quantity",
      header: "Quantity",
      filterType: "numeric",
      sortable: true,
      filter: true,
    },
    {
      field: "date",
      header: "Date",
      body: DateBody,
      filterType: "date",
      filter: true,
    },
    { field: "status", header: "Status", body: statusBody },
    { field: "acion", body: actionBody },
  ];
};

export default Columns;

// 'startsWith': Checks if the value starts with the filter text.
// 'endsWith': Checks if the value ends with the filter text.
// 'equals': Checks for an exact match.
// 'notEquals': Checks for values that are not equal.
// 'contains': Checks if the value contains the filter text.
// 'notContains': Checks for values that do not contain the filter text.

// Other available filterType options include:

// 'text': Provides a text input for filtering.
// 'dropdown': Renders a dropdown/select input for filtering.
// 'date': Renders a date picker for filtering date values.
// 'custom': Allows you to provide a custom filter element.
