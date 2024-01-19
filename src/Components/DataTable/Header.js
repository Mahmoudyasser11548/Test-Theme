import React from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useLingui } from "@lingui/react";
import { useDebouncedCallback } from "use-debounce";

const Header = ({ clearFilters, filters, setFilters }) => {
  const { i18n } = useLingui();
  const debounced = useDebouncedCallback((value) => {
    setFilters({ ...filters, filters: value });
  }, 1000);

  return (
    <div className="d-flex justify-content-between">
      <Button
        type="button"
        icon="pi pi-filter-slash"
        label="Clear"
        outlined
        className="rounded"
        onClick={clearFilters}
      />
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          onChange={(e) => debounced(e.target.value)}
          placeholder={i18n._("Keyword Search")}
        />
      </span>
    </div>
  );
};

export default Header;
