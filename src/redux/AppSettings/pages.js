import { createSlice } from "@reduxjs/toolkit";

const pageSlice = createSlice({
  name: "page",
  initialState: {
    pages: {},
  },
  reducers: {
    setPageState: (state, action) => {
      const { name, st } = action.payload;
      if (!state.pages) {
        state.pages = {};
      }
      state.pages[name] = st;
    },
  },
});

export const { setPageState } = pageSlice.actions;

export default pageSlice.reducer;

// "metadata": {
//   "pageCount": 3,
//   "totalItemCount": 26,
//   "pageNumber": 1,
//   "pageSize": 10,
//   "hasPreviousPage": false,
//   "hasNextPage": true,
//   "isFirstPage": true,
//   "isLastPage": false,
//   "firstItemOnPage": 1,
//   "lastItemOnPage": 10
// }
