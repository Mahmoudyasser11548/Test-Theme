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

  const handleSort = (e) => {
    console.log(e);
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
    <div className="card">
      <DataTable
        dataKey={dataKey}
        className="p-datatable-sm"
        header={noHeader ? "" : header}
        value={data}
        filterDisplay="row" // row, menu
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
        {columns.map((col) => (
          <Column
            key={col?.field}
            field={col?.field}
            sortable={col?.sortable || false}
            header={col?.header}
            body={col?.body || null}
            filter={col?.filter}
            filterMatchMode={col?.filterMatchMode || "contains"}
            filterPlaceholder={col?.filterPlaceholder || "enter value"}
            filterType={col?.filterType}
            {...col}
          />
        ))}
      </DataTable>
    </div>
  );
};

export default CustomDataTable;
