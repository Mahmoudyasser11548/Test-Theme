import React, { lazy } from "react";

const List = lazy(() => import("@views/usersManagement/Users/List"));
const Details = lazy(() => import("@views/usersManagement/Users/Details"));

const routes = [
  {
    path: "/user-managment/users/list",
    element: <List />,
    meta: {
      permission: "read_user",
    },
  },
  {
    path: "/user-managment/users/details/:id",
    element: <Details />,
    meta: {
      permission: "read_user",
    },
  },
];

export default routes;
