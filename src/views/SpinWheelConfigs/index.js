/* eslint-disable implicit-arrow-linebreak */
import { lazy } from "react";

const WheelConfigs = lazy(() => import("@views/spinWheelConfigs/Wheel"));
const Tabs = lazy(() => import("@views/spinWheelConfigs/WholeTabs"));
const ExtraData = lazy(() =>
  import("@views/spinWheelConfigs/ExtraData/ExtraDataPage"),
);

const routes = [
  {
    path: "/spinWheel/wheel/configs",
    element: <WheelConfigs />,
  },
  {
    path: "/spinWheel/tabs/:id",
    element: <Tabs />,
  },
  {
    path: "/extra/list/:id",
    element: <ExtraData />,
  },
];

export default routes;
