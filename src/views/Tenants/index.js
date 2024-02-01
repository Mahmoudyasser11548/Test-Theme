import React, { lazy } from "react";

const List = lazy(() => import("@views/Tenants/List"));
const Details = lazy(() => import("@views/Tenants/Details"));

const routes = [
  {
    path: "tenants/list",
    element: <List />,
    meta: {
      permission: "read_user",
    },
  },
  {
    path: "tenants/details/:id",
    element: <Details />,
    meta: {
      permission: "read_user",
    },
  },
];

export default routes;
