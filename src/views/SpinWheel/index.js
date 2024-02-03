import React, { lazy } from "react";

const List = lazy(() => import("@views/SpinWheel/List"));
const Details = lazy(() => import("@views/SpinWheel/Detials"));

const routes = [
  {
    path: "/spinWheel/list",
    element: <List />,
  },
  {
    path: "/spinWheel/details/:id",
    element: <Details />,
  },
];

export default routes;
