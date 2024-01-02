import React from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Header from "./Header";

const CustomDataTable = ({ data, columns, header, selection = {} }) => {
  return (
    <div className="card">
      <DataTable
        header={header ? <Header /> : ""}
        value={data}
        tableStyle={{ minWidth: "50rem" }}
        removableSort
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        selectionMode={selection?.mode} // radiobutton, checkbox, single, multiple
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
            key={col.field}
            field={col.field}
            sortable={col.sortable || false}
            header={col.header}
            body={col.body || null}
          />
        ))}
      </DataTable>
    </div>
  );
};

export default CustomDataTable;
