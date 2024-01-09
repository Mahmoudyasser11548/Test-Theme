/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
import React from "react";
import { BreadCrumb } from "primereact/breadcrumb";
import { Panel } from "primereact/panel";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Link } from "react-router-dom";
import { Trans } from "@lingui/react";

const Header = ({ breadCrumbs = [], title = "" }) => {
  return (
    <>
      <div className="breadcrumbs-top d-flex justify-content-between align-align-items-center p-1 border rounded">
        <h2 className="content-header-title mb-0">
          <Trans id={title} />
        </h2>
        <div className="breadcrumb-wrapper">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <span aria-current="location">
                <Link to={"/home"}>
                  <span className="pi pi-home"></span>
                </Link>
              </span>
            </li>
            {breadCrumbs.map(({ label, route, isActive }, i) =>
              isActive ? (
                <li className="breadcrumb-item active" key={i}>
                  <span aria-current="location">
                    <Trans id={label} />
                  </span>
                </li>
              ) : (
                <li className="breadcrumb-item" key={i}>
                  <Link to={route}>
                    <Trans id={label} />
                  </Link>
                </li>
              ),
            )}
          </ol>
        </div>
      </div>
    </>
  );
};

const Filter = ({ addButton, listCount = "" }) => {
  return (
    <div>
      <div className="custom d-flex justify-content-between align-items-center py-1">
        <div className="list-count px-1">
          <span>{listCount}</span>
        </div>
        <div className="add-button">{addButton}</div>
      </div>
    </div>
  );
};

const Body = ({ body }) => <div>{body}</div>;

function PrimaryCard({ title, body, addButton, listCount, breadCrumbs }) {
  return (
    <Card>
      <Header breadCrumbs={breadCrumbs} title={title} />
      <Filter addButton={addButton} listCount={listCount} title={title} />
      <Body body={body} />
    </Card>
  );
}

export default PrimaryCard;
export { Header };
