import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: null,
};

const querySlice = createSlice({
  name: "queryApplicant",
  initialState,
  reducers: {
    setApplicant: (state, action) => {
      state.query = action.payload;
    },
    removeApplicant: (state, _action) => {
      state.query = null;
    },
  },
});

export const { setApplicant, removeApplicant } = querySlice.actions;
export const getApplicant = (state) => state.queryApplicant.query;
export default querySlice.reducer;
