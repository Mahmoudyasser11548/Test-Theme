import React from "react";

const AvatarWithNameTemplate = ({ rowData }) => {
  return (
    <div className="flex align-items-center">
      <img
        alt={rowData.name}
        src={`${import.meta.env.VITE_BASE_URL}/${rowData.image}`}
        width="32"
        className="me-2"
      />
      <span>{rowData.name}</span>
    </div>
  );
};

export default AvatarWithNameTemplate;
