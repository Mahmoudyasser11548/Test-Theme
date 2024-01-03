import React from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

const Header = ({ clearFilters, onGlobalFilterChange, globalFilterValue }) => {
  return (
    <div className="d-flex justify-content-between">
      <Button
        type="button"
        icon="pi pi-filter-slash"
        label="Clear"
        outlined
        className="rounded"
        onClick={clearFilters} // Call function to clear filters
      />
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange} // Call function to handle global filter change
          placeholder="Keyword Search"
        />
      </span>
    </div>
  );
};

export default Header;
