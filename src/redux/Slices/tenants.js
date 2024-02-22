import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services";

export const createTenant = createAsyncThunk(
  "tenants/create",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("tenant/create", payload);
      return res.data.payload;
    } catch (error) {
      return rejectWithValue(error.response.data.errorMessage);
    }
  },
);

export const updateTenant = createAsyncThunk(
  "tenants/update",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.put(`tenant/edit`, payload);
      return res.data.payload;
    } catch (error) {
      return rejectWithValue(error.response.data.errorMessage);
    }
  },
);

export const deleteTenant = createAsyncThunk(
  "tenants/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`tenant/remove/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data.errorMessage);
    }
  },
);

export const getTenants = createAsyncThunk(
  "tenants/get",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.get(`tenant/search`, payload);
      return res.data.payload;
    } catch (error) {
      return rejectWithValue(error.response.data.errorMessage);
    }
  },
);

export const getTenantWithId = createAsyncThunk(
  "tenants/getWithId",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`tenant/find/${id}`);
      return res.data.payload;
    } catch (error) {
      return rejectWithValue(error.response.data.errorMessage);
    }
  },
);

const initialState = {
  tenants: [],
  tenant: {},
  tenants_metadata: null,
  loading: false,
  errors: "",
  openDeleteDialog: false,
  openDialog: false,
};

const tenants = createSlice({
  name: "tenants",
  initialState: initialState,
  reducers: {
    showDeleteDialog: (state) => {
      state.openDeleteDialog = true;
    },
    showDialog: (state) => {
      state.openDialog = true;
    },
    resetDialog: (state) => {
      state.openDialog = false;
      state.openDeleteDialog = false;
    },
    setTenants: (state) => {
      state.tenants = undefined;
    },
    setTenant: (state) => {
      state.tenant = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTenants.fulfilled, (state, action) => {
        state.tenants = action.payload.items;
        state.tenants_metadata = action.payload.metadata;
      })
      .addCase(getTenantWithId.fulfilled, (state, action) => {
        state.tenant = action.payload;
      })
      .addCase(createTenant.fulfilled, (state, action) => {
        state.tenants.push(action.payload);
      })
      .addCase(deleteTenant.fulfilled, (state, action) => {
        state.tenants = state.tenants.filter(
          (tenant) => tenant.id !== action.payload,
        );
      })
      .addCase(updateTenant.fulfilled, (state, action) => {
        const index = state.tenants.findIndex(
          (tenant) => tenant.id === action.payload.id,
        );
        if (index > -1) {
          state.tenants[index] = action.payload;
        }
      });
  },
});

export const {
  showDeleteDialog,
  showDialog,
  resetDialog,
  setTenants,
  setTenant,
} = tenants.actions;
export default tenants.reducer;
