import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { api } from "../../services";

export const createUser = createAsyncThunk(
  "users/create",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("user-management/users", payload);
      return res.data.payload;
    } catch (error) {
      return rejectWithValue(error.response.data.errorMessage);
    }
  },
);

export const updateUser = createAsyncThunk(
  "users/update",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.put(
        `user-management/users/delete-user/${payload.id}`,
        payload,
      );
      return res.data.payload;
    } catch (error) {
      return rejectWithValue(error.response.data.errorMessage);
    }
  },
);

export const deleteUser = createAsyncThunk(
  "users/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`user-management/users/delete-user/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data.errorMessage);
    }
  },
);

export const getUsers = createAsyncThunk(
  "users/get",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.get(`user-management/users`, payload);
      return res.data.payload;
    } catch (error) {
      return rejectWithValue(error.response.data.errorMessage);
    }
  },
);

export const getUserWithId = createAsyncThunk(
  "users/getWithId",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`user-management/users/${id}`);
      return res.data.payload;
    } catch (error) {
      return rejectWithValue(error.response.data.errorMessage);
    }
  },
);

const initialState = {
  users: [],
  roles: [],
  user: {},
  role: {},
  user_metadata: null,
  role_metadata: null,
  loading: false,
  errors: "",
  openUserDeleteDialog: false,
  openUserDialog: false,
  openRoleDeleteDialog: false,
  openRoleDialog: false,
};

const userManagement = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    // Users
    showUserDeleteDialog: (state) => {
      state.openUserDeleteDialog = true;
    },
    showUserDialog: (state) => {
      state.openUserDialog = true;
    },
    resetUserDialog: (state) => {
      state.openUserDialog = false;
      state.openUserDeleteDialog = false;
    },
    setUsers: (state) => {
      state.users = undefined;
    },
    setUser: (state) => {
      state.user = undefined;
    },
    // Roles
    showRoleDeleteDialog: (state) => {
      state.openRoleDeleteDialog = true;
    },
    showRoleDialog: (state) => {
      state.openRoleDialog = true;
    },
    resetRoleDialog: (state) => {
      state.openRoleDialog = false;
      state.openRoleDeleteDialog = false;
    },
    setRoles: (state) => {
      state.roles = undefined;
    },
    setRole: (state) => {
      state.role = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload.items;
        state.user_metadata = action.payload.metadata;
      })
      .addCase(getUserWithId.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id,
        );
        if (index > -1) {
          state.users[index] = action.payload;
        }
      });
  },
});

export const {
  showRoleDeleteDialog,
  resetRoleDialog,
  showRoleDialog,
  setRoles,
  setRole,
  // users
  showUserDeleteDialog,
  resetUserDialog,
  showUserDialog,
  setUsers,
  setUser,
} = userManagement.actions;
export default userManagement.reducer;
