import React, { useEffect, useState } from "react";
import {
  PrimaryCard,
  CustomDataTable,
  PageState,
  PermissionButton,
  CustomDialog,
} from "@customcomponents";
import { useNavigate } from "react-router-dom";
import { Plus } from "react-feather";
import { Trans } from "@lingui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  getWheels,
  showDeleteDialog,
  resetDialog,
  deleteWheel,
  setWheels,
} from "@store/slices/spinWheel";

import { Columns } from "./Columns";

const WheelList = ({ filters, setFilters }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [wheelId, setWheelId] = useState("");

  const { spins, spin_metadata, loading, openDeleteDialog } = useSelector(
    (state) => state.spin,
  );

  // Handlers
  const deleteHandler = (rowData) => {
    setWheelId(rowData?.id);
    dispatch(showDeleteDialog());
  };

  const editHandler = (rowData) => {
    navigate(`/spinWheel/tabs/${rowData?.id}`);
  };

  const confirmDeleteWheel = () => {
    dispatch(deleteWheel(wheelId));
  };

  useEffect(() => {
    dispatch(getWheels({ ...filters }));
    return () => {
      dispatch(setWheels());
    };
  }, [filters]);

  return (
    <>
      <PrimaryCard
        breadCrumbs={[{ label: "Wheels", isActive: true }]}
        title={"Spin Wheels"}
        addButton={
          <PermissionButton
            color="primary"
            className="btn-primary ml-2 rounded-pill"
            onClick={() => navigate("/spinWheel/tabs/new")}
          >
            <Plus size={14} />
            <span className="align-middle ml-25">
              <Trans id="Add Wheel" />
            </span>
          </PermissionButton>
        }
        body={
          <>
            <CustomDataTable
              setFilters={setFilters}
              loading={loading || false}
              metadata={spin_metadata || null}
              data={spins || []}
              filters={filters}
              noHeader={true}
              columns={Columns(deleteHandler, editHandler)}
            />
          </>
        }
      />

      <CustomDialog
        title={<Trans id="Delete Wheel" />}
        show={openDeleteDialog}
        onHide={resetDialog}
        closeOnConfirm={true}
        body={
          <h3>
            <Trans id="Are you sure you want to delete?" />
          </h3>
        }
        onConfirmHandler={confirmDeleteWheel}
        closeButtonTitle={"No"}
        confirmButtonTitle={"Yes"}
      />
    </>
  );
};

const List = () => {
  return <PageState Page={WheelList} name="WheelsPage" />;
};

export default List;
