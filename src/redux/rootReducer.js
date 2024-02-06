// ** Reducers Imports
// App Settings
import layout from "./AppSettings/layout";
import navbar from "./AppSettings/navbar";
import app from "./AppSettings/app";
import page from "./AppSettings/pages";
import auth from "./AppSettings/auth";
// Slices
import sample from "./Slices/sample";
import tenant from "./Slices/tenants";
import spin from "./Slices/spinWheel";
import usersManagement from "./Slices/userManagement";
import rewards from "./Slices/Rewards";
import fields from "./Slices/Fields";
import segmants from "./Slices/Segmants";

const rootReducer = {
  navbar,
  layout,
  app,
  auth,
  sample,
  page,
  tenant,
  spin,
  usersManagement,
  rewards,
  fields,
  segmants,
};

export default rootReducer;
