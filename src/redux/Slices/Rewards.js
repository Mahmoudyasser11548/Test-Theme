import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services";

export const createReward = createAsyncThunk(
  "reward/create",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("reward/add-reward", payload);
      return res.data.payload;
    } catch (error) {
      return rejectWithValue(error.response.data.errorMessage);
    }
  },
);

export const updateReward = createAsyncThunk(
  "reward/update",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.put(`reward/edit-reward`, payload);
      return res.data.payload;
    } catch (error) {
      return rejectWithValue(error.response.data.errorMessage);
    }
  },
);

export const deleteReward = createAsyncThunk(
  "reward/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`reward/delete-reward/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data.errorMessage);
    }
  },
);

export const getRewards = createAsyncThunk(
  "reward/get",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.get(`reward/rewards`, payload);
      return res.data.payload;
    } catch (error) {
      return rejectWithValue(error.response.data.errorMessage);
    }
  },
);

const initialState = {
  rewards: [],
  reward: {},
  reward_metadata: null,
  loading: false,
  errors: "",
  openDeleteDialog: false,
  openDialog: false,
};

const rewards = createSlice({
  name: "rewards",
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
    setRewards: (state) => {
      state.rewards = undefined;
    },
    setReward: (state) => {
      state.reward = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRewards.fulfilled, (state, action) => {
        state.rewards = action.payload.items;
        state.reward_metadata = action.payload.metadata;
      })
      .addCase(createReward.fulfilled, (state, action) => {
        state.rewards.push(action.payload);
      })
      .addCase(deleteReward.fulfilled, (state, action) => {
        state.rewards = state.rewards.filter(
          (reward) => reward.id !== action.payload,
        );
      })
      .addCase(updateReward.fulfilled, (state, action) => {
        const index = state.rewards.findIndex(
          (reward) => reward.id === action.payload.id,
        );
        if (index > -1) {
          state.rewards[index] = action.payload;
        }
      });
  },
});

export const {
  showDeleteDialog,
  resetDialog,
  showDialog,
  setRewards,
  setReward,
} = rewards.actions;
export default rewards.reducer;
