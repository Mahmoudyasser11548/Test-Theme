/* eslint-disable nonblock-statement-body-position */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import {
  updateReward,
  createReward,
  getRewards,
  deleteReward,
  resetDialog,
  showDeleteDialog,
  showDialog,
} from "@store/slices/Rewards";
import configs from "@configs";
import { useDispatch, useSelector } from "react-redux";
import { RewardColumns } from "./Columns";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { Col, Row } from "reactstrap";
import { Trans, useLingui } from "@lingui/react";
import {
  InputField,
  SwitchField,
  SubmitButton,
  ImageField,
  CustomDataTable,
  CustomDialog,
} from "@customcomponents";
import useFile from "@hooks/useFile";

const Rewards = ({ wheelId, activeTab }) => {
  const { i18n } = useLingui();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { rewards, loading, reward_metadata, openDeleteDialog } = useSelector(
    (state) => state.rewards,
  );

  const [reward, setReward] = useState({});
  const [rewardId, setRewardId] = useState();

  const extraHandler = (id) => {
    navigate(`/extra/List/${id}`);
  };

  const editHandler = (rowData) => {
    setReward(rowData);
    dispatch(showDialog());
  };

  const deleteHandler = ({ id }) => {
    setRewardId(id);
    dispatch(showDeleteDialog());
  };

  const confirmDeleteReward = () => {
    dispatch(deleteReward(rewardId));
  };

  const [filters, setFilters] = useState({
    page: 1,
    pageSize: configs?.pageSize,
    filters: "",
  });

  const initialValues = (reward) => {
    return {
      id: reward?.id || "",
      name: reward?.name || "",
      quantity: reward?.quantity || "",
      consumed: reward?.consumed || "",
      image: useFile(reward?.image),
      lose: reward?.lose ? reward?.lose : false,
      isTryAgain: reward?.isTryAgain ? reward?.isTryAgain : false,
      spinningWheelId: wheelId,
    };
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required(),
    quantity: yup.string().required(),
  });

  // ** Function to handle form submit
  const onSubmit = (values, { resetForm }) => {
    if (values.id) {
      dispatch(updateReward({ payload: values, id: values.id }));
    } else {
      dispatch(createReward(values));
      resetForm();
    }
  };

  useEffect(() => {
    if (activeTab === "3")
      dispatch(getRewards({ ...filters, spinningWheelId: wheelId }));
  }, [filters, activeTab]);

  return (
    <>
      <Formik
        onSubmit={onSubmit}
        enableReinitialize={true}
        initialValues={initialValues(reward)}
        validationSchema={validationSchema}
      >
        <Form>
          <Row>
            <Col md="9">
              <Row>
                <Col md="5">
                  <InputField name="name" placeholder={i18n._("Enter name")} />
                </Col>
                <Col md="5">
                  <InputField
                    name="quantity"
                    placeholder={i18n._("Enter quantity")}
                  />
                </Col>
                <Col md="5">
                  <SwitchField label={<Trans id="Lose" />} name="lose" />
                </Col>
                <Col md="5">
                  <SwitchField
                    label={<Trans id="try_again" />}
                    name="isTryAgain"
                  />
                </Col>
              </Row>
            </Col>

            <Col md="3">
              <div className="d-flex justify-content-end">
                <ImageField
                  name="image"
                  mode={"add"}
                  width={100}
                  height={100}
                />
              </div>
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
        setFilter={setFilters}
        loading={loading || false}
        metadata={reward_metadata || null}
        data={rewards || []}
        filter={filters}
        pagination
        noHeader={true}
        columns={RewardColumns(deleteHandler, editHandler, extraHandler)}
      />
      <CustomDialog
        title={<Trans id="Delete Reward" />}
        show={openDeleteDialog}
        onHide={resetDialog}
        closeOnConfirm={true}
        body={
          <h3>
            <Trans id="Are you sure you want to delete ?" />
          </h3>
        }
        onConfirmHandler={confirmDeleteReward}
        closeButtonTitle={i18n._("No")}
        confirmButtonTitle={i18n._("Yes")}
      />
    </>
  );
};

export default Rewards;
