import React from "react";
import defaultAvatar from "../../../assets/images/imgs/no-user-image.jpg";

const AvatarWithNameTemplate = ({
  rowData,
  image,
  width = 45,
  height = 45,
}) => {
  return (
    <div className="flex align-items-center">
      <img
        src={
          (image &&
            `${process.env.VITE_APP_BASE_URL}/${image}?w=${width}&h=${height}&mode=pad`) ||
          defaultAvatar
        }
        width="32"
        className="me-2 rounded-pill"
      />
      <span>{rowData.name}</span>
    </div>
  );
};

export default AvatarWithNameTemplate;
