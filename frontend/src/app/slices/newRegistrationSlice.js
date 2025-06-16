import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCompleted: false,
  stepOneForm: null,
  stepTwoForm: null,
  stepThreeForm: null,
  finalStepForm: null,
};

const newRegistrationSlice = createSlice({
  name: "newRegistration",
  initialState,
  reducers: {
    setIsCompleted: (state, action) => {
      state.isCompleted = action.payload;
    },
    removeIsCompleted: (state, _action) => {
      state.isCompleted = false;
    },
    setStepOneForm: (state, action) => {
      state.stepOneForm = action.payload;
    },
    removeStepOneForm: (state, _action) => {
      state.stepOneForm = null;
    },
    setStepTwoForm: (state, action) => {
      state.stepTwoForm = action.payload;
    },
    removeStepTwoForm: (state, _action) => {
      state.stepTwoForm = null;
    },
    setStepThreeForm: (state, action) => {
      state.stepThreeForm = action.payload;
    },
    removeStepThreeForm: (state, _action) => {
      state.stepThreeForm = null;
    },
    setFinalStepForm: (state, action) => {
      state.finalStepForm = action.payload;
    },
    removeFinalStepForm: (state, _action) => {
      state.finalStepForm = null;
    },
  },
});

export const {
  setIsCompleted,
  removeIsCompleted,
  setStepOneForm,
  removeStepOneForm,
  setStepTwoForm,
  removeStepTwoForm,
  setStepThreeForm,
  removeStepThreeForm,
  setFinalStepForm,
  removeFinalStepForm,
} = newRegistrationSlice.actions;
export const getStepOneForm = (state) => state.newRegistration.stepOneForm;
export default newRegistrationSlice.reducer;
