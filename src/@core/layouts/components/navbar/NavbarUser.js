import React from "react";
// ** Dropdowns Imports
import UserDropdown from "./UserDropdown";
import IntlDropdown from "./IntlDropdown";
import NotificationDropdown from "./NotificationDropdown";
import ProgressDropdown from "./ProgressDropdown";

const NavbarUser = () => {
  return (
    <ul className="nav navbar-nav align-items-center ms-auto">
      <IntlDropdown />
      {/* <NotificationDropdown />
      <ProgressDropdown /> */}
      <UserDropdown />
    </ul>
  );
};
export default NavbarUser;
