import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";

const CustomDropdownFilter = ({ value, onChange, options }) => {
  const [selectedOption, setSelectedOption] = useState(value || null);

  const handleDropdownChange = (e) => {
    setSelectedOption(e.value);
    onChange({ value: e.value });
  };

  return (
    <Dropdown
      value={selectedOption}
      options={options}
      onChange={handleDropdownChange}
      placeholder="Select option"
    />
  );
};

export default CustomDropdownFilter;
