/* eslint-disable no-unused-vars */
// ** React Imports
import React from "react";
import { Link } from "react-router-dom";

// ** Reactstrap Imports
import { Button } from "reactstrap";

// ** Custom Hooks
import { useSkin } from "@hooks/useSkin";

import themeConfig from "@configs/themeConfig";

// ** Illustrations Imports
import illustrationsLight from "@src/assets/images/pages/error.svg";
import illustrationsDark from "@src/assets/images/pages/errjor-dark.svg";

// ** Styles
import "@styles/base/pages/page-misc.scss";

const Error = ({ message, ...props }) => {
  // ** Hooks
  const { skin } = useSkin();

  const source = skin === "dark" ? illustrationsDark : illustrationsLight;

  return (
    <div className="misc-wrapper">
      <a className="brand-logo" href="/">
        <img
          src={themeConfig.app.appLogoImage}
          alt="logo"
          style={{ width: "150px", height: "50px" }}
        />
      </a>
      <div className="misc-inner p-2 p-sm-3">
        <div className="w-100 text-center">
          <h2 className="mb-1">{message || "Page Not Found 🕵🏻‍♀️"}</h2>
          <p className="mb-2">
            Oops! 😖 The requested URL was not found on this server.
          </p>
          <Button
            tag={Link}
            to="/"
            color="primary"
            className="btn-sm-block mb-2"
          >
            Back to home
          </Button>
          <img className="img-fluid" src={source} alt="Not authorized page" />
        </div>
      </div>
    </div>
  );
};
export default Error;
