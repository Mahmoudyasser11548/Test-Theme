import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userManagement = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},
  extraReducers: () => {},
});

export const {} = userManagement.actions;
export default userManagement.reducer;
