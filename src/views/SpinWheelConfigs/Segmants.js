/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik } from "formik";
import { Col, Row } from "reactstrap";
import {
  InputField,
  SelectField,
  SubmitButton,
  ColorPickerField,
  CustomDataTable,
  CustomDialog,
} from "@customcomponents";
import configs from "@configs";
import { Trans } from "@lingui/react";
import { SegmantsColumns } from "./Columns";
import {
  createSegmant,
  updateSegmant,
  setSegmants,
  getSegmants,
  resetDialog,
  deleteSegmant,
  showDeleteDialog,
} from "@store/slices/segmants";

const Segmants = ({ wheelId, activeTab }) => {
  const dispatch = useDispatch();
  const { segmant_metadata, segmants, loading, openDeleteDialog } = useSelector(
    (state) => state.segmants,
  );

  const [filters, setFilters] = useState({
    page: 1,
    pageSize: configs?.pageSize,
    filters: "",
  });
  const [segmantId, setSegmantId] = useState("");

  const deleteHandler = (rowData) => {
    setSegmantId(rowData?.id);
    dispatch(showDeleteDialog());
  };
  const editHandler = () => {};

  const confirmDeleteSegmant = () => {
    dispatch(deleteSegmant(segmantId));
  };

  const initialValues = () => {
    return {
      id: "",
      label: "",
      color: "#000000",
      textColor: "#000000",
      rewardId: "",
    };
  };

  const validationSchema = yup.object().shape({
    label: yup.string().required(),
    rewardId: yup.string().required(),
    textColor: yup.string().required(),
    color: yup.string().required(),
  });

  const onSubmit = (values, { resetForm }) => {
    if (values.id) {
      dispatch(updateSegmant({ id: values.id, ...values }));
    } else {
      dispatch(createSegmant(values));
    }
    resetForm();
  };

  useEffect(() => {
    dispatch(getSegmants({ ...filters }));
    return () => {
      dispatch(setSegmants());
    };
  }, [filters]);

  return (
    <>
      <Formik
        initialValues={initialValues()}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {({}) => {
          return (
            <>
              <Form>
                <div>
                  <Row className="d-flex justify-content-between align-items-center">
                    <Col>
                      <InputField name="label" label={<Trans id="Title" />} />
                    </Col>

                    <Col>
                      <SelectField
                        name="rewardId"
                        label={<Trans id="Reward" />}
                        options={[
                          { label: "Prize1", value: "prize1" },
                          { label: "Prize2", value: "prize2" },
                          { label: "Prize3", value: "prize3" },
                        ]}
                        keyValue="value"
                        title="label"
                      />
                    </Col>

                    <Col>
                      <ColorPickerField
                        name="color"
                        label={<Trans id="Color" />}
                      />
                    </Col>

                    <Col>
                      <ColorPickerField
                        name="textColor"
                        label={<Trans id="Text Color" />}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="d-flex justify-content-end text-end w-100 mb-1">
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
      <CustomDataTable
        keyField="id"
        setFilters={setFilters}
        loading={loading || false}
        metadata={segmant_metadata || null}
        data={segmants || []}
        filters={filters}
        noHeader={true}
        columns={SegmantsColumns(deleteHandler, editHandler)}
      />
      <CustomDialog
        title={<Trans id="Delete Segmant" />}
        show={openDeleteDialog}
        onHide={resetDialog}
        closeOnConfirm={true}
        body={
          <h3>
            <Trans id="Are you sure you want to delete?" />
          </h3>
        }
        onConfirmHandler={confirmDeleteSegmant}
        closeButtonTitle={"No"}
        confirmButtonTitle={"Yes"}
      />
    </>
  );
};

export default Segmants;
