import { createSlice } from "@reduxjs/toolkit";
import { createThunk } from "../services/Methods";

const createSample = createThunk(
  "sample",
  " http://localhost:3000/samples",
  "post",
);
export const getSamples = createThunk(
  "sample",
  " http://localhost:3000/samples",
  "get",
);
const updateSample = createThunk(
  "sample",
  " http://localhost:3000/samples",
  "put",
);
const deleteSample = createThunk(
  "sample",
  " http://localhost:3000/samples",
  "delete",
);

const sampleSlice = createSlice({
  name: "sample",
  initialState: {
    samples: [],
    sample: {},
    openDeleteDialog: false,
    openDialog: false,
  },
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
    setSamples: (state) => {
      state.samples = undefined;
    },
    setSample: (state) => {
      state.sample = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Samples
      .addCase(getSamples.fulfilled, (state, action) => {
        state.samples = action.payload;
      })

      // Create Sample
      .addCase(createSample.fulfilled, (state, action) => {
        state.samples.push(action.payload);
      })

      // Update Sample
      .addCase(updateSample.fulfilled, (state, action) => {
        const index = state.samples.findIndex(
          (sample) => sample.id === action.payload.id,
        );
        if (index > -1) {
          state.samples[index] = action.payload;
        }
      })
      // Delete Sample
      .addCase(deleteSample.fulfilled, (state, action) => {
        state.samples = state.samples.filter(
          (sample) => sample.id !== action.payload,
        );
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

export const {
  showDeleteDialog,
  showDialog,
  resetDialog,
  setSamples,
  setSample,
} = sampleSlice.actions;
export default sampleSlice.reducer;
