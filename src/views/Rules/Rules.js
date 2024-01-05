import React, { useState } from "react";
import {
  CheckboxField,
  CustomDataTable,
  DatePickerField,
  ImageField,
  InputField,
  MultiSelectField,
  PasswordField,
  PdfField,
  PhoneField,
  RadioField,
  SelectField,
  SwitchField,
  VideoField,
} from "../../Components";
import Columns from "./Columns";
import { Form, Formik } from "formik";
import useFile from "@hooks/useFile";
import { Button } from "primereact/button";
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
      status: "INSTOCK",
      date: "2024-1-2",
    },
  ];

  const options = [
    { name: 1, label: "Option 1" },
    { name: 2, label: "Option 2" },
  ];

  const radioOptions = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
  ];

  const CheckboxOptions = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
  ];

  const multiSelectOptions = [
    { id: 1, name: "Option 1" },
    { id: 2, name: "Option 2" },
  ];

  const [product, setProduct] = useState({});

  const deleteHandler = () => {};
  const editHandler = () => {};
  const onSubmit = () => {};
  return (
    <>
      <CustomDataTable
        data={products}
        columns={Columns(editHandler, deleteHandler)}
        noHeader={false}
        resizableColumns={true}
        selection={{
          mode: "single",
          checked: true,
          selected: product,
          handleOnChangeSelect: (e) => setProduct(e),
        }}
      />

      <Formik
        initialValues={{
          username: "",
          gender: "",
          date: "",
          active: false,
          radio: false,
          checkbox: "",
          multiSelect: [],
          password: "",
          phone: "",
          image: useFile(),
          video: useFile(),
          pdf: useFile(),
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <InputField name="username" label="Username" />
          <SelectField
            name="gender"
            label="Select an Option"
            options={options}
            keyValue="name"
            title="label"
          />
          <DatePickerField
            name="date"
            label="Select Date"
            placeholder="Choose a date"
          />
          <SwitchField name="active" label="Active" />
          <RadioField name="radio" options={radioOptions} />
          <CheckboxField name="checkbox" options={CheckboxOptions} />
          <MultiSelectField
            name="multiSelect"
            label="Select Options:"
            options={multiSelectOptions}
            keyValue="id"
            title="name"
          />
          <PasswordField name="password" label="Enter Password" />
          <PhoneField name="phone" />
          <ImageField name="image" label="image" width={200} height={200} />
          <VideoField name="video" label="video" width={200} height={200} />
          <PdfField
            name="pdf"
            multiple={true}
            label="pdf"
            width={200}
            height={200}
          />

          <Button type="submit">Submit</Button>
        </Form>
      </Formik>
    </>
  );
};

export default Rules;
