import { createSlice } from "@reduxjs/toolkit";

import { jwtDecode } from "jwt-decode";
import { createThunk } from "../../services/Methods";

export const login = createThunk("login", "auth/login", "post");

const initialState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  errors: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userData");
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("refreshToken");
      state.user = undefined;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.fulfilled, (state, action) => {
        const token = action.payload.payload.token;
        const refreshToken = action.payload.payload.refreshToken;
        const user = jwtDecode(token);
        state.user = user;
        state.isLoggedIn = true;
        localStorage.setItem("userData", JSON.stringify(user));
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("refreshToken", refreshToken);
      })

      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.errors = null;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.loading = false;
          state.errors = null;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.errors = action.payload;
        },
      );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
