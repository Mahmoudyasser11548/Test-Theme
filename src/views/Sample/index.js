import { lazy } from "react";

const List = lazy(() => import("@views/Sample/List"));
const Details = lazy(() => import("@views/Sample/Details"));

const routes = [
  {
    path: "/sample/list",
    element: <List />,
    // meta: {
    //   permission: "read_sample",
    // },
  },
  {
    path: "/sample/details",
    element: <Details />,
    // meta: {
    //   permission: "read_sample",
    // },
  },
];

export default routes;
