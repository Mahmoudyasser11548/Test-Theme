import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services";

export const createSegmant = createAsyncThunk(
  "segmant/create",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("Segment/add-segment", payload);
      return res.data.payload;
    } catch (error) {
      return rejectWithValue(error.response.data.errorMessage);
    }
  },
);

export const updateSegmant = createAsyncThunk(
  "segmant/update",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.put(`Segment/edit-segment`, payload);
      return res.data.payload;
    } catch (error) {
      return rejectWithValue(error.response.data.errorMessage);
    }
  },
);

export const deleteSegmant = createAsyncThunk(
  "segmant/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`Segment/delete-segment/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data.errorMessage);
    }
  },
);

export const getSegmants = createAsyncThunk(
  "segmant/get",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.get(`Segment/segments`, payload);
      return res.data.payload;
    } catch (error) {
      return rejectWithValue(error.response.data.errorMessage);
    }
  },
);

const initialState = {
  segmants: [],
  segmant: {},
  segmant_metadata: null,
  loading: false,
  errors: "",
  openDeleteDialog: false,
  openDialog: false,
};

const segmants = createSlice({
  name: "segmants",
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
    setSegmants: (state) => {
      state.segmants = undefined;
    },
    setSegmant: (state) => {
      state.segmant = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSegmants.fulfilled, (state, action) => {
        state.segmants = action.payload.items;
        state.segmant_metadata = action.payload.metadata;
      })
      .addCase(createSegmant.fulfilled, (state, action) => {
        state.segmants.push(action.payload);
      })
      .addCase(deleteSegmant.fulfilled, (state, action) => {
        state.segmants = state.segmants.filter(
          (segmant) => segmant.id !== action.payload,
        );
      })
      .addCase(updateSegmant.fulfilled, (state, action) => {
        const index = state.segmants.findIndex(
          (segmant) => segmant.id === action.payload.id,
        );
        if (index > -1) {
          state.segmants[index] = action.payload;
        }
      });
  },
});

export const {
  showDeleteDialog,
  resetDialog,
  showDialog,
  setSegmants,
  setSegmant,
} = segmants.actions;
export default segmants.reducer;
