// ** Reducers Imports
import layout from "./AppSettings/layout";
import navbar from "./AppSettings/navbar";
import app from "./AppSettings/app";
import sample from "./Slices/sample";
import page from "./AppSettings/pages";
import auth from "./AppSettings/auth";

const rootReducer = { navbar, layout, app, auth, sample, page };

export default rootReducer;
