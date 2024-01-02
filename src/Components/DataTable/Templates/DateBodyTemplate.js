import moment from "moment";
import React from "react";

const formatDate = (value) => {
  return moment(value, "YYYY-MM-DD").format("l");
};

const DateBodyTemplate = ({ rowData }) => {
  return formatDate(rowData.date);
};

export default DateBodyTemplate;
