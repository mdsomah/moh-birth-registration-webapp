import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
};

const nirAPIsTokenSlice = createSlice({
  name: "nirAPIs",
  initialState,
  reducers: {
    setAPIToken: (state, action) => {
      state.token = action.payload;
    },
    removeAPIToken: (state, _action) => {
      state.token = null;
    },
  },
});

export const { setAPIToken, removeAPIToken } = nirAPIsTokenSlice.actions;
export const selectAPIToken = (state) => state.nirAPIs.token;
export default nirAPIsTokenSlice.reducer;
