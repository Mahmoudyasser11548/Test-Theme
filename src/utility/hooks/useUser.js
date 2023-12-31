//** React Imports
import { useEffect, useState } from "react";
// ** Store & Actions
import { handleMenuHidden } from "@redux/layout";
import { useDispatch, useSelector } from "react-redux";
import { Roles } from "src/configs/roles";
import { useNavbarType } from "./useNavbarType";

export const useUser = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [navbarType, setNavbarType] = useNavbarType();
  const { user } = useSelector((state) => state.auth);
  const [permissions, setPermissions] = useState([]);
  const [tenantId, setTenantId] = useState("");

  const [roles, setRoles] = useState([]);
  // ** Return a wrapped version of useState's setter function
  const can = (value) => {
    return permissions.includes(value);
  };

  useEffect(() => {
    setPermissions(user?.permissions || []);
    setRoles(user?.role || []);
    setTenantId(user?.tenantId || "");
    if (user) {
      dispatch(handleMenuHidden(user?.role?.includes(Roles.Employee) || false));
    }
  }, [user]);

  const inRole = (role) => {
    return roles.includes(role);
  };

  useEffect(() => {
    const navType = inRole(Roles.Employee) ? "sticky" : "floating";

    localStorage.setItem("navbarType", navType);
    setNavbarType(navType);
  }, [roles]);

  const isSuperAdmin = () => {
    return roles.includes("SuperAdmin");
  };

  return {
    can: can,
    user: user,
    permission: permissions,
    roles: roles,
    inRole,
    tenantId,
    isSuperAdmin,
  };
};
