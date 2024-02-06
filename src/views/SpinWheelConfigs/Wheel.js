import React from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import {
  InputField,
  SelectField,
  SubmitButton,
  ImageField,
  SwitchField,
  DatePickerField,
  ColorPickerField,
} from "@customcomponents";
import { Trans } from "@lingui/react";
import { Form, Formik } from "formik";
import { Col, Row } from "reactstrap";
import { createWheel, updateWheel } from "@store/slices/spinWheel";
import useFile from "@hooks/useFile";

const Wheel = () => {
  const dispatch = useDispatch();

  const initialValues = () => {
    return {
      id: "",
      name: "",
      active: false,
      showRewardsImages: false,
      isAuthorized: false,
      expiryDate: "",
      bgColor: "#000000",
      color: "#000000",
      textColor: "#000000",
      topHeader: "",
      bottomHeader: "",
      buttonText: "",
      type: "",
      logo: useFile(),
      circleImg: useFile(),
    };
  };

  const validationSchema = yup.object({
    name: yup.string().required(),
    bgColor: yup.string().required(),
    color: yup.string().required(),
    textColor: yup.string().required(),
    topHeader: yup.string().required(),
    bottomHeader: yup.string().required(),
    buttonText: yup.string().required(),
    type: yup.string().required(),
  });

  const onSubmit = (values) => {
    if (values.id) {
      dispatch(updateWheel({ id: values.id, ...values }));
    } else {
      dispatch(createWheel(values));
    }
  };

  return (
    <>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues()}
        enableReinitialize={true}
        validationSchema={validationSchema}
      >
        {({}) => {
          return (
            <>
              <Form>
                <Row className="justify-content-between">
                  <Row className="w-75">
                    <Col md="4">
                      <InputField name="name" label={<Trans id="Name" />} />
                    </Col>
                    <Col md="4">
                      <DatePickerField
                        name="expiryDate"
                        label={<Trans id="Expiry Date" />}
                        enableTime={true}
                      />
                    </Col>
                    <Col md="4">
                      <InputField
                        name="buttonText"
                        label={<Trans id="Button Text" />}
                      />
                    </Col>
                    <Col md="4">
                      <InputField
                        name="topHeader"
                        label={<Trans id="Top Header" />}
                      />
                    </Col>
                    <Col md="4">
                      <InputField
                        name="bottomHeader"
                        label={<Trans id="Bottom Header" />}
                      />
                    </Col>
                    <Col md="4">
                      <SelectField
                        options={[
                          { value: "spin", label: "Spin" },
                          { value: "slider", label: "Slider" },
                        ]}
                        label={<Trans id="Type" />}
                        title="label"
                        keyValue="value"
                        name="type"
                      />
                    </Col>
                    <Col md="12">
                      <ColorPickerField
                        name="bgColor"
                        label={<Trans id="Background Color" />}
                      />
                    </Col>
                    <Col md="12">
                      <ColorPickerField
                        name="color"
                        label={<Trans id="Color" />}
                      />
                    </Col>
                    <Col md="12">
                      <ColorPickerField
                        name="textColor"
                        label={<Trans id="Text Color" />}
                      />
                    </Col>
                    <Col md="4">
                      <SwitchField
                        name="active"
                        label={<Trans id="Active" />}
                      />
                      <SwitchField
                        name="showRewardsImages"
                        label={<Trans id="Show RewardsImages" />}
                      />
                      <SwitchField
                        name="isAuthorized"
                        label={<Trans id="Enable Registration" />}
                      />
                    </Col>
                  </Row>
                  <Row className="w-25">
                    <Col md="3" className="d-flex flex-column">
                      <ImageField
                        title="logo"
                        name="logo"
                        mode="add"
                        width={200}
                        height={200}
                      />
                      <ImageField
                        title="Circle Image"
                        name="circleImg"
                        mode="add"
                        width={200}
                        height={200}
                      />
                    </Col>
                  </Row>
                </Row>
                <div className="d-flex justify-content-end text-end w-100">
                  <SubmitButton
                    label={<Trans id="Save Changes" />}
                    type="submit"
                    color="primary"
                    className="btn-primary ml-auto"
                  />
                </div>
              </Form>
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default Wheel;
