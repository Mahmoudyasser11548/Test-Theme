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

const rootReducer = { navbar, layout, app, auth, sample, page, tenant };

export default rootReducer;
