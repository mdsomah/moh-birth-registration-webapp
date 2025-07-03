import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  viewApplicant: null,
  editApplicant: null,
};

const applicantSlice = createSlice({
  name: "applicant",
  initialState,
  reducers: {
    setViewApplicant: (state, action) => {
      state.viewApplicant = action.payload;
    },
    removeViewApplicant: (state, _action) => {
      state.viewApplicant = null;
    },
    setEditApplicant: (state, action) => {
      state.editApplicant = action.payload;
    },
    removeEditApplicant: (state, _action) => {
      state.editApplicant = null;
    },
  },
});

export const {
  setViewApplicant,
  removeViewApplicant,
  setEditApplicant,
  removeEditApplicant,
} = applicantSlice.actions;
export const getViewApplicant = (state) => state.applicant.viewApplicant;
export default applicantSlice.reducer;
