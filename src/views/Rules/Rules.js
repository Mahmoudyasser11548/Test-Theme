import React, { useState } from "react";
import { CustomDataTable } from "../../Components";
import Columns from "./Columns";

const Rules = () => {
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
      date: "2024-1-2",
    },
  ];

  const [product, setProduct] = useState({});

  console.log(product);
  const deleteHandler = () => {};
  const editHandler = () => {};
  return (
    <>
      <CustomDataTable
        data={products}
        columns={Columns(editHandler, deleteHandler)}
        header={true}
        selection={{
          mode: "single",
          checked: true,
          selected: product,
          handleOnChangeSelect: (e) => setProduct(e),
        }}
      />
    </>
  );
};

export default Rules;
