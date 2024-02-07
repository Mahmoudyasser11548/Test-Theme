/* eslint-disable no-unused-expressions */
import React, { useEffect, useRef } from "react";
import {
  updateUser,
  createUser,
  getUserWithId,
  setUser,
} from "@store/slices/userManagement";
import {
  SecondaryCard,
  InputField,
  SwitchField,
  PasswordField,
  PhoneField,
  SubmitButton,
  ToastAlert,
} from "@customcomponents";
import { Button } from "primereact/button";
import { generatePassword } from "../../../utility/genPassword";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Trans, useLingui } from "@lingui/react";
import { Form, Formik } from "formik";
import { Col, Row } from "reactstrap";

const Details = () => {
  const toast = useRef();
  const { id: userId } = useParams();
  const dispatch = useDispatch();
  const { i18n } = useLingui();

  const { user, loading, errors } = useSelector(
    (state) => state.usersManagement,
  );

  const initialValues = (user) => {
    return {
      username: user?.username || "",
      password: "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      active: user?.active ? user?.active : false,
      roles: user?.roles || ["Admin"],
    };
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(),
    email: Yup.string().email(),
    password: Yup.string()
      .min(6)
      .test("isNew", "Password is required", function (value) {
        if (userId === "new") {
          return !!value;
        } else {
          return true;
        }
      }),
    phoneNumber: Yup.string().required(),
  });

  const onSubmit = (values) => {
    if (values.id) {
      dispatch(updateUser({ payload: values, id: user.id }));

      errors
        ? toast.current.show({
            severity: "error",
            summary: "Error",
            detail: errors,
          })
        : toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Updated Successfully",
          });
    } else {
      dispatch(createUser(values));

      errors
        ? toast.current.show({
            severity: "error",
            summary: "Error",
            detail: errors,
          })
        : toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Created Successfully",
          });
    }
  };

  useEffect(() => {
    userId !== "new" && dispatch(getUserWithId(userId));

    return () => {
      dispatch(setUser());
    };
  }, [userId]);

  return (
    <>
      <ToastAlert toastRef={toast} />
      <SecondaryCard
        title={
          userId !== "new" ? (
            <Trans id="Edit User" />
          ) : (
            <Trans id="Create User" />
          )
        }
        body={
          <Formik
            enableReinitialize={true}
            initialValues={initialValues(user)}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({ setFieldValue }) => {
              return (
                <Form>
                  <Row>
                    <Col lg="9" sm="12">
                      <Row>
                        <Col lg="6" sm="12">
                          <InputField
                            label={<Trans id="Username" />}
                            name="username"
                            placeholder={i18n._("Enter Username")}
                          />
                        </Col>

                        <Col lg="6" sm="12">
                          <PhoneField
                            label={"Phone Number"}
                            name="phoneNumber"
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6" sm="12">
                          <PasswordField
                            label={<Trans id="Password" />}
                            name="password"
                          />
                        </Col>
                        <Col lg="6" sm="12">
                          <Button
                            className="mt-2"
                            color="flat-warning"
                            onClick={(e) => {
                              e.preventDefault();
                              setFieldValue(
                                "password",
                                generatePassword(),
                                false,
                              );
                            }}
                          >
                            {<Trans id="Generate Password" />}
                          </Button>
                        </Col>

                        <Col lg="6" sm="12">
                          <SwitchField
                            name="active"
                            label={<Trans id="Active user" />}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <div className="text-end">
                    <SubmitButton loading={loading} />
                  </div>
                </Form>
              );
            }}
          </Formik>
        }
      />
    </>
  );
};

export default Details;
