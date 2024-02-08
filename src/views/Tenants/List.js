import React, { useEffect, useState } from "react";
import {
  PrimaryCard,
  CustomDataTable,
  PageState,
  PermissionButton,
  CustomDialog,
} from "@customcomponents";
import { Plus } from "react-feather";
import { useNavigate } from "react-router-dom";
import { Trans, useLingui } from "@lingui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTenants,
  setTenants,
  showDeleteDialog,
  resetDialog,
  deleteTenant,
} from "@store/slices/tenants";
import { Columns } from "./Columns";

const TenantsList = ({ filters, setFilters }) => {
  const { i18n } = useLingui();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tenantId, setTenantId] = useState("");

  // Selectors
  const { tenants, tenants_metadata, loading, openDeleteDialog } = useSelector(
    (state) => state.tenant,
  );

  // Handlers
  const deleteHandler = (rowData) => {
    setTenantId(rowData?.id);
    dispatch(showDeleteDialog());
  };

  const editHandler = (rowData) => {
    navigate(`/tenants/details/${rowData?.id}`);
  };

  const confirmDeleteTenant = () => {
    dispatch(deleteTenant(tenantId));
  };

  useEffect(() => {
    dispatch(getTenants({ ...filters }));
    return () => {
      dispatch(setTenants());
    };
  }, [filters]);

  return (
    <>
      <PrimaryCard
        breadCrumbs={[{ label: "Tenants", isActive: true }]}
        title={"Tenants"}
        addButton={
          <PermissionButton
            color="primary"
            className="btn-primary ml-2 rounded-pill"
            onClick={() => navigate("/tenants/details/new")}
          >
            <Plus size={14} />
            <span className="align-middle ml-25">
              <Trans id="Add Tenant" />
            </span>
          </PermissionButton>
        }
        body={
          <>
            <CustomDataTable
              setFilters={setFilters}
              loading={loading || false}
              metadata={tenants_metadata || null}
              data={tenants || []}
              filters={filters}
              noHeader={true}
              columns={Columns(deleteHandler, editHandler)}
            />
          </>
        }
      />

      <CustomDialog
        title={<Trans id="Delete Tenant" />}
        show={openDeleteDialog}
        onHide={resetDialog}
        closeOnConfirm={true}
        body={
          <h3>
            <Trans id="Are you sure you want to delete?" />
          </h3>
        }
        onConfirmHandler={confirmDeleteTenant}
        closeButtonTitle={i18n._("No")}
        confirmButtonTitle={i18n._("Yes")}
      />
    </>
  );
};

const List = () => {
  return <PageState Page={TenantsList} name="tenantsPage" />;
};

export default List;
