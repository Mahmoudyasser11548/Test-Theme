import { Trans } from "@lingui/react";
import React from "react";
import { Mail, Home, User, Chrome, Users } from "react-feather";

export default [
  {
    id: "home",
    title: "Home",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "secondPage",
    title: "Second Page",
    icon: <Mail size={20} />,
    navLink: "/second-page",
  },
  {
    id: "tenants",
    title: <Trans id="Tenants" />,
    icon: <User size={20} />,
    navLink: "/tenants/list",
    permissions: "read_user",
  },
  {
    id: "spinWheel",
    title: <Trans id="Spin Wheels" />,
    icon: <Chrome size={20} />,
    navLink: "/spinWheel/list",
    permissions: "read_user",
  },
  {
    id: "users",
    title: <Trans id="Users" />,
    icon: <Users size={20} />,
    navLink: "/user-managment/users/list",
    permissions: "read_user",
  },
];
