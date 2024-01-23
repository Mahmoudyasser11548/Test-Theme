import React from "react";
import {
  CheckboxField,
  ColorPickerField,
  DatePickerField,
  ImageField,
  InputField,
  MultiSelectField,
  PasswordField,
  PdfField,
  PhoneField,
  RadioField,
  SecondaryCard,
  SelectField,
  SubmitButton,
  SwitchField,
  VideoField,
} from "@customcomponents";
import { Trans } from "@lingui/react";
import useFile from "@hooks/useFile";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Col, Row } from "reactstrap";

const options = [
  { name: 1, label: "Male" },
  { name: 2, label: "Female" },
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

const Details = () => {
  const initialValues = () => {
    return {
      username: "",
      date: "",
      gender: "",
      multiSelect: "",
      password: "",
      phone: "",
      radio: false,
      checkbox: "",
      active: false,
      color: "#000",
      video: useFile(),
      pdf: useFile(),
      image: useFile(),
    };
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is Required"),
    date: Yup.string().required("Date is Required"),
    gender: Yup.string().required("Gender is Required"),
    multiSelect: Yup.array().required("Multioptions is Required"),
    password: Yup.string().required("Password is Required"),
    phone: Yup.string().required("Phone is Required"),
    video: Yup.object().required("video is Required"),
    image: Yup.object().required("image is Required"),
    pdf: Yup.object().required("pdf is Required"),
  });

  const onSubmit = () => {};

  return (
    <>
      <SecondaryCard
        title={<Trans id="Sample Details" />}
        showBackButton={true}
        // backUrl="/home"
        body={
          <>
            <Formik
              initialValues={initialValues()}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({}) => (
                <Form>
                  <Row className="w-100">
                    <Col lg="9">
                      <Row>
                        <Col lg="6" md="12">
                          <InputField name="username" label="Username" />
                        </Col>
                        <Col lg="6" md="12">
                          <DatePickerField
                            name="date"
                            label="Select Date"
                            placeholder="Choose a date"
                          />
                        </Col>
                        <Col lg="6" md="12">
                          <SelectField
                            name="gender"
                            label="Select an Option"
                            options={options}
                            keyValue="name"
                            title="label"
                            placeholder="Select gender"
                          />
                        </Col>
                        <Col lg="6" md="12">
                          <MultiSelectField
                            name="multiSelect"
                            label="Select Options:"
                            options={multiSelectOptions}
                            keyValue="id"
                            title="name"
                          />
                        </Col>
                        <Col lg="6" md="12">
                          <PasswordField
                            name="password"
                            label="Enter Password"
                          />
                        </Col>
                        <Col
                          lg="6"
                          md="12"
                          className="d-flex align-items-center"
                        >
                          <PhoneField name="phone" label="Phone" />
                        </Col>
                      </Row>
                    </Col>

                    <Col lg="3">
                      <ImageField
                        name="image"
                        label="image"
                        width={200}
                        height={200}
                      />
                    </Col>
                  </Row>
                  <Row className="my-2">
                    <Col lg="3">
                      <RadioField name="radio" options={radioOptions} />
                    </Col>
                    <Col lg="3">
                      <CheckboxField
                        name="checkbox"
                        options={CheckboxOptions}
                      />
                    </Col>
                    <Col lg="3">
                      <SwitchField name="active" label="Active" />
                    </Col>
                    <Col lg="3">
                      <ColorPickerField name="color" label="Choose Color" />
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    <Col lg="6">
                      <VideoField
                        name="video"
                        label="video"
                        width={200}
                        height={200}
                      />
                    </Col>
                    <Col lg="6">
                      <PdfField
                        name="pdf"
                        multiple={true}
                        label="pdf"
                        width={200}
                        height={200}
                      />
                    </Col>
                  </Row>

                  <div className="text-end mt-2">
                    <SubmitButton label={"Submit"} />
                  </div>
                </Form>
              )}
            </Formik>
          </>
        }
      />
    </>
  );
};

export default Details;

// <Formik
//         initialValues={{
//           username: "",
//           gender: "",
//           date: "",
//           active: false,
//           radio: false,
//           checkbox: "",
//           multiSelect: [],
//           password: "",
//           phone: "",
//           image: useFile(),
//           video: useFile(),
//           pdf: useFile(),
//         }}
//         onSubmit={onSubmit}
//       >
//         <Form>
//           <InputField name="username" label="Username" />

//           <DatePickerField
//             name="date"
//             label="Select Date"
//             placeholder="Choose a date"
//           />
//           <SwitchField name="active" label="Active" />
//           <RadioField name="radio" options={radioOptions} />
//           <CheckboxField name="checkbox" options={CheckboxOptions} />

//           <PasswordField name="password" label="Enter Password" />
//           <PhoneField name="phone" />
//           <ImageField name="image" label="image" width={200} height={200} />
//           <VideoField name="video" label="video" width={200} height={200} />
//           <PdfField
//             name="pdf"
//             multiple={true}
//             label="pdf"
//             width={200}
//             height={200}
//           />
//           <ColorPickerField name="color" label="Choose Color" />

//           <SubmitButton label={"Submit"} />
//         </Form>
//       </Formik>
