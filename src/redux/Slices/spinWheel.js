import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services";

export const createWheel = createAsyncThunk(
  "spinWheel/create",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("SpinningWheel/add-wheel", payload);
      return res.data.payload;
    } catch (error) {
      return rejectWithValue(error.response.data.errorMessage);
    }
  },
);

export const updateWheel = createAsyncThunk(
  "spinWheel/update",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.put(
        `SpinningWheel/edit-wheel/${payload.id}`,
        payload,
      );
      return res.data.payload;
    } catch (error) {
      return rejectWithValue(error.response.data.errorMessage);
    }
  },
);

export const deleteWheel = createAsyncThunk(
  "spinWheel/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`SpinningWheel/delete-wheel/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data.errorMessage);
    }
  },
);

export const getWheels = createAsyncThunk(
  "spinWheel/get",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.get(`SpinningWheel/wheels`, payload);
      return res.data.payload;
    } catch (error) {
      return rejectWithValue(error.response.data.errorMessage);
    }
  },
);

export const getWheelWithId = createAsyncThunk(
  "spinWheel/getbyId",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`SpinningWheel/wheel/${id}`);
      return res.data.payload;
    } catch (error) {
      return rejectWithValue(error.response.data.errorMessage);
    }
  },
);

export const getDisplayedWheel = createAsyncThunk(
  "spinWheel/getDisplayedWheel",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`SpinningWheel/displayed-wheel/${id}`);
      return res.data.payload;
    } catch (error) {
      return rejectWithValue(error.response.data.errorMessage);
    }
  },
);

const initialState = {
  spins: [],
  spin: {},
  spin_metadata: null,
  loading: false,
  errors: "",
  openDeleteDialog: false,
  openDialog: false,
};

const spinWheel = createSlice({
  name: "spin",
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
    setWheels: (state) => {
      state.spins = [];
    },
    setWheel: (state) => {
      state.spin = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWheels.fulfilled, (state, action) => {
        state.spins = action.payload.items;
        state.spin_metadata = action.payload.metadata;
      })
      .addCase(getWheelWithId.fulfilled, (state, action) => {
        state.spin = action.payload;
      })
      .addCase(getDisplayedWheel.fulfilled, (state, action) => {
        state.spin = action.payload;
      })
      .addCase(createWheel.fulfilled, (state, action) => {
        state.spins.push(action.payload);
      })
      .addCase(deleteWheel.fulfilled, (state, action) => {
        state.spins = state.spins.filter((spin) => spin.id !== action.payload);
      })
      .addCase(updateWheel.fulfilled, (state, action) => {
        const index = state.spins.findIndex(
          (spin) => spin.id === action.payload.id,
        );
        if (index > -1) {
          state.spins[index] = action.payload;
        }
      });
  },
});

export const {
  showDeleteDialog,
  showDialog,
  resetDialog,
  setWheel,
  setWheels,
} = spinWheel.actions;
export default spinWheel.reducer;
