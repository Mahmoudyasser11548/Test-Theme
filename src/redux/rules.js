// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import axios from 'axios'


export const addRule = createAsyncThunk("rules/add", async (rule) => {
  const res = await axios.post('http://localhost:3000/rules', rule)
  return res.data
})

export const layoutSlice = createSlice({
  name: "rule",
  initialState: {
    Rule: {
      rule: '',
      property: '' || 'String',
      operator: '' || 'Equals',
      value: ''
    },
    error: false,
    loading: false
  },
  reducers: {
    
  },
  extraReducers: {
    [addRule.pending]: (state) => {
      state.loading = true
    },
    [addRule.fulfilled]: (state, action) => {
      state.loading = false
      state.Rule = action.payload
    },
    [addRule.rejected]: (state) => {
      state.loading = false
      state.error = true
    }
  }
})

export default layoutSlice.reducer
