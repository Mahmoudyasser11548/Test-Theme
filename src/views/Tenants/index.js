import React, { lazy } from "react";

const List = lazy(() => import("@views/Tenants/List"));
const Details = lazy(() => import("@views/Tenants/Details"));

const routes = [
  {
    path: "tenants/list",
    element: <List />,
  },
  {
    path: "tenants/details/:id",
    element: <Details />,
  },
];

export default routes;
