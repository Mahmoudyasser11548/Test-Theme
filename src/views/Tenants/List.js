import React, { useEffect } from "react";
import { PrimaryCard, CustomDataTable, PageState } from "@customcomponents";
import { Button } from "primereact/button";
import { Plus } from "react-feather";
import { useNavigate } from "react-router-dom";
import { Trans } from "@lingui/react";
import { useDispatch, useSelector } from "react-redux";
import { getTenants } from "@store/slices/tenants";
import { Columns } from "./Columns";

const TenantsList = ({ filters, setFilters }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Selectors
  const { tenants, tenants_metadata, tenants_loading } = useSelector(
    (state) => state.tenant,
  );

  // Handlers
  const deleteHandler = () => {};
  const editHandler = () => {};

  useEffect(() => {
    dispatch(getTenants({ ...filters }));
  }, [filters]);

  // console.log(filters);

  return (
    <>
      <PrimaryCard
        breadCrumbs={[{ label: "Tenants", isActive: true }]}
        title={"Tenants"}
        addButton={
          <Button
            color="primary"
            className="btn-primary ml-2 rounded-pill"
            onClick={() => navigate("/tenants/details/new")}
          >
            <Plus size={14} />
            <span className="align-middle ml-25">
              <Trans id="Add Tenant" />
            </span>
          </Button>
        }
        body={
          <>
            <CustomDataTable
              keyField="id"
              setFilters={setFilters}
              loading={tenants_loading || false}
              metadata={tenants_metadata}
              data={tenants || []}
              filters={filters}
              noHeader={true}
              columns={Columns(deleteHandler, editHandler)}
            />
          </>
        }
      />
    </>
  );
};

const List = () => {
  return <PageState Page={TenantsList} name="tenantsPage" />;
};

export default List;
