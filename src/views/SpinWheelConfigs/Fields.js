import React, { useEffect, useState } from "react";
import {
  createField,
  showDeleteDialog,
  resetDialog,
  deleteField,
  getFields,
  setFields,
} from "@store/slices/fields";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { Form, Formik } from "formik";
import { Col, Row } from "reactstrap";
import {
  InputField,
  SwitchField,
  SubmitButton,
  CustomDataTable,
  CustomDialog,
} from "@customcomponents";
import { FieldsColumns } from "./Columns";
import { Trans, useLingui } from "@lingui/react";

const Fields = ({ wheelId, activeTab }) => {
  const { i18n } = useLingui();
  const dispatch = useDispatch();
  const { openDeleteDialog, fields, loading, field_metadata } = useSelector(
    (state) => state.fields,
  );
  const [fieldId, setFieldId] = useState();
  const [filters, setFilters] = useState({
    page: 1,
    pageSize: 10,
    filter: "",
  });

  const deleteHandler = (rowData) => {
    setFieldId(rowData?.id);
    dispatch(showDeleteDialog());
  };

  const confirmDeleteField = () => {
    dispatch(deleteField(fieldId));
  };

  const initialValues = () => {
    return {
      id: "",
      name: "",
      isRequired: false,
      spinningWheelId: wheelId,
    };
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required(),
  });

  const onSubmit = (values, { resetForm }) => {
    dispatch(createField(values));
    resetForm();
  };
  useEffect(() => {
    if (activeTab === "2") {
      dispatch(getFields({ ...filters, spinningWheelId: wheelId }));
    }
    return () => {
      dispatch(setFields());
    };
  }, [filters, activeTab]);

  return (
    <>
      <Formik
        onSubmit={onSubmit}
        enableReinitialize={true}
        initialValues={initialValues()}
        validationSchema={validationSchema}
      >
        <Form>
          <Row>
            <Col md="8">
              <Row>
                <Col md="8">
                  <InputField name="name" label={<Trans id="Name" />} />
                </Col>
                <Col md="8">
                  <SwitchField
                    name="isRequired"
                    label={<Trans id="isRequired" />}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <div className="d-flex justify-content-end text-end w-100 mb-1">
            <SubmitButton
              label={<Trans id="Save Changes" />}
              type="submit"
              color="primary"
              className="btn-primary ml-auto"
            />
          </div>
        </Form>
      </Formik>
      <CustomDataTable
        keyField="id"
        setFilters={setFilters}
        loading={loading || false}
        metadata={field_metadata || null}
        data={fields || []}
        filters={filters}
        noHeader={true}
        columns={FieldsColumns(deleteHandler)}
      />
      <CustomDialog
        title={<Trans id="Delete Field" />}
        show={openDeleteDialog}
        onHide={resetDialog}
        closeOnConfirm={true}
        body={
          <h3>
            <Trans id="Are you sure you want to delete?" />
          </h3>
        }
        onConfirmHandler={confirmDeleteField}
        closeButtonTitle={i18n._("No")}
        confirmButtonTitle={i18n._("Yes")}
      />
    </>
  );
};

export default Fields;
