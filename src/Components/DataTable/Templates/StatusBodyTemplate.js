import { Tag } from "primereact/tag";
import React from "react";

const StatusBodyTemplate = ({ value, severity }) => {
  return <Tag value={value} severity={severity}></Tag>;
};

export default StatusBodyTemplate;
