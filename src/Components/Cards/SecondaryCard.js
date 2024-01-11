import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Trans } from "@lingui/react";

const SecondaryCard = ({
  title,
  showBackButton = true,
  body,
  backUrl = "",
}) => {
  const navigate = useNavigate();

  return (
    <>
      <Card
        header={
          <div className="px-2 py-2 border d-flex align-items-center">
            {showBackButton && (
              <Button
                className="rounded-pill "
                icon="pi pi-arrow-circle-left"
                tooltip="Back"
                onClick={() => {
                  backUrl ? navigate(backUrl) : navigate(-1);
                }}
              />
            )}
            <h3 className="mb-0 ms-1">{title}</h3>
          </div>
        }
      >
        {body}
      </Card>
    </>
  );
};

export default SecondaryCard;
