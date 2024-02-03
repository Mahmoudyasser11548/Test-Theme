import React, { useEffect, useState } from "react";
import {
  PrimaryCard,
  CustomDataTable,
  PageState,
  PermissionButton,
  CustomDialog,
} from "@customcomponents";
import {
  getUsers,
  setUsers,
  showUserDeleteDialog,
  resetUserDialog,
  deleteUser,
} from "@store/slices/userManagement";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Columns } from "./Columns";
import { Trans } from "@lingui/react";
const UsersList = ({ filters, setFilters }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { users, user_metadata, loading, openUserDeleteDialog } = useSelector(
    (state) => state.usersManagement,
  );

  const [userId, setUserId] = useState("");

  // Handlers
  const deleteHandler = (rowData) => {
    setUserId(rowData?.id);
    dispatch(showUserDeleteDialog());
  };

  const editHandler = (rowData) => {
    navigate(`/user-managment/users/details/${rowData?.id}`);
  };

  const confirmDeleteUser = () => {
    dispatch(deleteUser(userId));
  };

  useEffect(() => {
    dispatch(getUsers({ ...filters }));
    return () => {
      dispatch(setUsers());
    };
  }, [filters]);

  return (
    <>
      <PrimaryCard
        breadCrumbs={[
          { label: "User Management", isActive: false },
          { label: "Users", isActive: true },
        ]}
        title={"Users"}
        body={
          <CustomDataTable
            keyField="id"
            setFilters={setFilters}
            loading={loading || false}
            metadata={user_metadata || null}
            data={users || []}
            filters={filters}
            noHeader={true}
            columns={Columns(deleteHandler, editHandler)}
          />
        }
      />
      <CustomDialog
        title={<Trans id="Delete User" />}
        show={openUserDeleteDialog}
        onHide={resetUserDialog}
        closeOnConfirm={true}
        body={
          <h3>
            <Trans id="Are you sure you want to delete?" />
          </h3>
        }
        onConfirmHandler={confirmDeleteUser}
        closeButtonTitle={"No"}
        confirmButtonTitle={"Yes"}
      />
    </>
  );
};

const List = () => {
  return <PageState Page={UsersList} name="usersPage" />;
};

export default List;
