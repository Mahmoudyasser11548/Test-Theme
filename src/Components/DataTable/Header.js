import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React from "react";

const Header = () => {
  return (
    <div className="d-flex justify-content-between">
      <Button
        type="button"
        icon="pi pi-filter-slash"
        label="Clear"
        outlined
        className="rounded"
        // onClick={clearFilter}
      />
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          // value={globalFilterValue}
          // onChange={onGlobalFilterChange}
          placeholder="Keyword Search"
        />
      </span>
    </div>
  );
};

export default Header;
