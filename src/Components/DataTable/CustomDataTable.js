import React, { useState } from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Header from "./Header";
import { Trans } from "@lingui/react";

const CustomDataTable = ({
  dataKey = "id",
  data,
  columns,
  noHeader = false,
  metadata,
  emptyMessage = "No data to display",
  resizableColumns = true,
  loading,
  selection = {},
}) => {
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const clearFilters = () => {
    // Implement logic to clear filters
    // Clear filter values, reset state, etc.
  };

  const handleGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
    // Implement logic to handle global filter change
    // Filter data based on 'e.target.value'
  };

  const handleSort = () => {
    // Implement logic to handle sorting
    // Update state for sorting configuration or trigger sorting function
  };

  const header = (
    <Header
      clearFilters={clearFilters}
      onGlobalFilterChange={handleGlobalFilterChange}
      globalFilterValue={globalFilterValue}
    />
  );

  return (
    <DataTable
      stripedRows
      dataKey={dataKey}
      className="p-datatable-sm"
      header={noHeader ? "" : header}
      value={data}
      filterDisplay="menu" // row, menu
      tableStyle={{ minWidth: "50rem" }}
      removableSort
      sortMode="multiple"
      onSort={handleSort}
      paginator
      rows={metadata?.pageSize || 10}
      rowsPerPageOptions={[5, 10, 25, 50]}
      totalRecords={metadata?.totalItemCount || 0}
      lazy
      resizableColumns={resizableColumns}
      columnResizeMode={resizableColumns && "fit"} // fit, expand, minimal
      loading={loading || false}
      emptyMessage={<Trans id={emptyMessage} />}
      selectionMode={selection?.mode} // single, multiple
      selection={selection?.selected}
      onSelectionChange={(e) => selection?.handleOnChangeSelect(e.value)}
      checked={selection?.checked}
    >
      {Object.keys(selection).length !== 0 ? (
        <Column
          selectionMode={selection?.mode}
          headerStyle={{ width: "3rem" }}
        ></Column>
      ) : null}
      <Column
        header="#"
        headerStyle={{ width: "3rem" }}
        body={(data, options) => options.rowIndex + 1}
      ></Column>
      {columns.map((col) => (
        <Column
          key={col?.field}
          field={col?.field}
          sortable={col?.sortable || false}
          header={col?.header}
          style={col?.style}
          body={col?.body || null}
          filter={col?.filter}
          filterMatchMode={col?.filterMatchMode || "contains"}
          showFilterMatchModes={false}
          showFilterMenuOptions={false}
          filterPlaceholder={col?.filterPlaceholder || "enter value"}
          filterType={col?.filterType}
          {...col}
        />
      ))}
    </DataTable>
  );
};

export default CustomDataTable;
