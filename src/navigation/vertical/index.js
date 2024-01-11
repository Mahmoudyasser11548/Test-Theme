import React from "react";
import { Mail, Home, Chrome } from "react-feather";

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
    id: "sample",
    title: "Sample",
    icon: <Chrome size={20} />,
    navLink: "/sample/list",
  },
];
