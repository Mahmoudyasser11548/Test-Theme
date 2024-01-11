/* eslint-disable no-unused-expressions */
import React, { useState } from "react";
import { CustomDataTable, CustomDialog, PrimaryCard } from "../../Components";
import Columns from "./Columns";
import { Trans } from "@lingui/react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    code: "986534",
    name: "Laptop",
    category: "Devices",
    quantity: "2",
    status: "INSTOCK",
    date: "10/11/2024",
  },
  {
    id: 2,
    code: "243567",
    name: "Face Wash",
    category: "Cosmetics",
    quantity: "10",
    status: "INSTOCK",
    date: "2024-1-2",
  },
  {
    id: 3,
    code: "768576",
    name: "Mercedes Car",
    category: "Automotive",
    quantity: "1",
    status: "INSTOCK",
    date: "2024-1-2",
  },
  {
    id: 4,
    code: "435982",
    name: "Meat",
    category: "Foods",
    quantity: "2",
    status: "INSTOCK",
    date: "2024-1-2",
  },
  {
    id: 5,
    code: "123244",
    name: "Chiken",
    category: "Foods",
    quantity: "5",
    status: "INSTOCK",
    date: "2024-1-2",
  },
];

const List = () => {
  const [product, setProduct] = useState({});
  const naviagte = useNavigate();
  const deleteHandler = () => {};
  const editHandler = () => {};
  const confirmDeleteBanar = () => {};

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
            data={products}
            columns={Columns(editHandler, deleteHandler)}
            resizableColumns={false}
            noHeader={false}
            selection={{
              mode: "single",
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

export default List;
