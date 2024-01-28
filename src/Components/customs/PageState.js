/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import configs from "@configs";
import { setPageState } from "@store/AppSettings/pages";

const PageState = ({ Page, name, params }) => {
  const dispatch = useDispatch();
  const defaultState = {
    page: 1,
    pageSize: configs.pageSize,
    filters: "",
  };
  const { pages } = useSelector((state) => state.page);
  const [filters, setFilters] = useState();

  useEffect(() => {
    if (pages && pages[name]) {
      setFilters(pages[name]);
    } else {
      setFilters(defaultState);
    }
  }, []);

  useEffect(() => {
    dispatch(setPageState({ name, st: filters }));
  }, [filters]);
  return (
    <>
      <Page filters={filters} setFilters={setFilters} data={params} />
    </>
  );
};

export default PageState;
