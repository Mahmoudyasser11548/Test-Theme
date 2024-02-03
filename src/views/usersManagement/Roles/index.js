import React, { lazy } from "react";

const List = lazy(() => import("@views/usersManagements/Roles/List"));
const Details = lazy(() => import("@views/usersManagements/Roles/Details"));

const routes = [
  {
    path: "/user-managment/roles/list",
    element: <List />,
    meta: {
      permission: "read_user",
    },
  },
  {
    path: "/user-managment/roles/details/:id",
    element: <Details />,
    meta: {
      permission: "read_user",
    },
  },
];

export default routes;
