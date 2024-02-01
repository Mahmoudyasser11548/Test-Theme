/* eslint-disable no-mixed-operators */
/* eslint-disable no-unused-expressions */
import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Header from "./Header";
import { Trans } from "@lingui/react";
import { ProgressSpinner } from "primereact/progressspinner";

const CustomDataTable = ({
  dataKey = "id",
  filters,
  setFilters,
  data,
  columns,
  noHeader = false,
  metadata,
  emptyMessage = "No data to display",
  resizableColumns = true,
  loading,
  selection = {},
}) => {
  const clearFilters = () => {
    const clearedFilters = Object.keys(filters).reduce((acc, key) => {
      acc[key] = null;
      return acc;
    }, {});

    setFilters && setFilters(clearedFilters);
  };

  const handlePage = (event) => {
    setFilters &&
      setFilters({ ...filters, page: event.first / event.rows + 1 });
  };

  const handleSort = (event) => {
    setFilters &&
      setFilters({
        ...filters,
        sortBy: event.sortField,
        sortOrder: event.sortOrder === 1 ? "asc" : "desc",
      });
  };

  const header = (
    <Header
      clearFilters={clearFilters}
      filters={filters}
      setFilters={setFilters}
    />
  );

  return (
    <DataTable
      stripedRows
      dataKey={dataKey}
      className="p-datatable-sm"
      header={noHeader ? "" : header}
      filters={filters}
      value={data}
      filterDisplay="menu" // row, menu
      tableStyle={{ minWidth: "50rem" }}
      sortField={filters?.sortBy}
      sortOrder={filters?.sortOrder === "asc" ? 1 : -1}
      onSort={handleSort}
      paginator
      onPage={handlePage}
      first={(filters?.page - 1) * (filters?.pageSize || 10)}
      rows={metadata?.pageSize || 10}
      totalRecords={metadata?.totalItemCount || 0}
      lazy
      resizableColumns={resizableColumns}
      columnResizeMode={resizableColumns && "fit"} // fit, expand, minimal
      loading={loading && <ProgressSpinner />}
      emptyMessage={<Trans id={emptyMessage || "No Data to Display"} />}
      selectionMode={selection?.mode} // single, multiple
      selection={selection?.selected}
      onSelectionChange={(e) => selection?.handleOnChangeSelect(e.value)}
      checked={selection?.checked}
      style={{ cursor: "pointer" }}
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
          filterType={col?.filterType || "text"}
          {...col}
        />
      ))}
    </DataTable>
  );
};

export default CustomDataTable;
