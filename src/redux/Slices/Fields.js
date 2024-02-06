import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services";

export const createField = createAsyncThunk(
  "fields/create",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("SpinningWheelField/add-spin-field", payload);
      return res.data.payload;
    } catch (error) {
      return rejectWithValue(error.response.data.errorMessage);
    }
  },
);

export const deleteField = createAsyncThunk(
  "fields/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`SpinningWheelField/delete-field/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data.errorMessage);
    }
  },
);

export const getFields = createAsyncThunk(
  "fields/get",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.get(`SpinningWheelField/spin-fields`, payload);
      return res.data.payload;
    } catch (error) {
      return rejectWithValue(error.response.data.errorMessage);
    }
  },
);

const initialState = {
  fields: [],
  field: {},
  field_metadata: null,
  loading: false,
  errors: "",
  openDeleteDialog: false,
  openDialog: false,
};

const fields = createSlice({
  name: "fields",
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
    setFields: (state) => {
      state.fields = undefined;
    },
    setField: (state) => {
      state.field = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFields.fulfilled, (state, action) => {
        state.fields = action.payload.items;
        state.field_metadata = action.payload.metadata;
      })
      .addCase(createField.fulfilled, (state, action) => {
        state.fields.push(action.payload);
      })
      .addCase(deleteField.fulfilled, (state, action) => {
        state.fields = state.fields.filter(
          (field) => field.id !== action.payload,
        );
      });
  },
});

export const {
  showDeleteDialog,
  resetDialog,
  showDialog,
  setFields,
  setField,
} = fields.actions;
export default fields.reducer;
