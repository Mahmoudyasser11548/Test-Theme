/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import {
  CustomDataTable,
  CustomDialog,
  PageState,
  PrimaryCard,
} from "@customcomponents";
import Columns from "./Columns";
import { Trans } from "@lingui/react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSamples, setSamples } from "@store/sample";

const Sample = () => {
  const { samples } = useSelector((state) => state.sample);
  const dispatch = useDispatch();

  const [product, setProduct] = useState({});
  const naviagte = useNavigate();

  const deleteHandler = () => {};
  const editHandler = () => {};
  const confirmDeleteBanar = () => {};

  useEffect(() => {
    dispatch(getSamples());

    return () => {
      dispatch(setSamples());
    };
  }, [samples]);

  return (
    <>
      <PrimaryCard
        breadCrumbs={[{ label: "Sample", isActive: true }]}
        title={"Sample"}
        listCount={12}
        addButton={
          <Button
            color="primary"
            className="btn-primary ml-2 rounded-pill"
            onClick={() => naviagte("/sample/details")}
          >
            <span className="align-middle ml-25">
              <Trans id="Create Sample" />
            </span>
          </Button>
        }
        body={
          <CustomDataTable
            data={samples}
            columns={Columns(editHandler, deleteHandler)}
            resizableColumns={false}
            noHeader={false}
            selection={{
              mode: "multiple",
              checked: true,
              selected: product,
              handleOnChangeSelect: (e) => setProduct(e),
            }}
          />
        }
      />

      <CustomDialog
        title={<Trans id="delete_banar" />}
        show={true}
        // onHide={resetDialog}
        closeOnConfirm={true}
        body={
          <h3>
            {" "}
            <Trans id="Are_you_sure_you_want_to_delete_this_item_?" />
          </h3>
        }
        onConfirmHandler={confirmDeleteBanar}
        closeButtonTitle={"No"}
        confirmButtonTitle={"Yes"}
      />
    </>
  );
};

const List = () => {
  return <PageState Page={Sample} name="SamplePage" />;
};

export default List;
