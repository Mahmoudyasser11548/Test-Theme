/* eslint-disable no-unused-expressions */
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SecondaryCard,
  InputField,
  SwitchField,
  ImageField,
  SubmitButton,
  ToastAlert,
} from "@customcomponents";
import {
  getTenantWithId,
  setTenant,
  updateTenant,
  createTenant,
} from "@store/slices/tenants";
import { useParams } from "react-router-dom";
import { Trans } from "@lingui/react";
import useFile from "@hooks/useFile";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { Col, Row } from "reactstrap";

const Details = () => {
  const toast = useRef();
  const { id: tenantId } = useParams();
  const dispatch = useDispatch();

  const { tenant, loading, errors } = useSelector((state) => state.tenant);

  const initialValues = (tenant) => {
    return {
      id: tenant?.id || "",
      name: tenant?.name || "",
      phoneNumber: tenant?.phoneNumber || "",
      logo: useFile(tenant?.logo),
      isActive: tenant?.isActive ? tenant?.isActive : false,
    };
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
  });

  const onSubmit = (values) => {
    if (values.id) {
      dispatch(updateTenant({ ...values, id: values.id }));

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
      dispatch(createTenant(values));

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
    tenantId !== "new" && dispatch(getTenantWithId(tenantId));

    return () => {
      dispatch(setTenant());
    };
  }, [tenantId]);

  return (
    <>
      <ToastAlert toastRef={toast} />
      <SecondaryCard
        title={
          tenantId !== "new" ? (
            <Trans id="Edit Tenant" />
          ) : (
            <Trans id="Create Tenant" />
          )
        }
        body={
          <>
            <Formik
              enableReinitialize={true}
              initialValues={initialValues(tenant)}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              <Form>
                <Row>
                  <Col lg="7" md="12">
                    <InputField
                      label={<Trans id="Name" />}
                      placeholder="Enter Name"
                      name="name"
                    />
                    <InputField
                      label={<Trans id="Phone Number" />}
                      placeholder="Enter PH Number"
                      name="phoneNumber"
                    />
                    <SwitchField
                      label={<Trans id="isActive" />}
                      name="isActive"
                    />
                  </Col>
                  <Col lg="4" md="12" className="d-flex justify-content-end">
                    <ImageField
                      name="logo"
                      mode={"add"}
                      width={200}
                      height={200}
                    />
                  </Col>
                </Row>

                <div className="text-end">
                  <SubmitButton loading={loading} />
                </div>
              </Form>
            </Formik>
          </>
        }
      />
    </>
  );
};

export default Details;
