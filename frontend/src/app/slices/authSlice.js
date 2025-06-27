import { createSlice, createAction } from "@reduxjs/toolkit";

//? Auth Actions
import { authActions } from "../actions/authActions";

//? Token Actions
export const setToken = createAction("setToken");
export const removeToken = createAction("removeToken");
// export const setRememberMeToken = createAction("setRememberMeToken");
export const removeRememberMeToken = createAction("removeRememberMeToken");

//? User Profile Actions
export const setUserProfile = createAction("setUserProfile");
export const removeUserProfile = createAction("removeUserProfile");

//? Initial State
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  rememberMeToken: null,
  userProfile: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authActions.login.fulfilled, (state, action) => {
        const { user } = action.payload.user;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = user.accessToken;
        if (user.rememberMe === true) {
          state.rememberMeToken = user.rememberMe_Token;
        }
      })
      .addCase(authActions.login.rejected, (state, _action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })
      .addCase(authActions.logout.fulfilled, (state, _action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })
      .addCase(authActions.getAuthenticatedUser.fulfilled, (state, action) => {
        const { user } = action.payload.user;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = user.accessToken;
      })
      .addCase(authActions.getAuthenticatedUser.rejected, (state, _action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })
      .addCase(setToken, (state, action) => {
        state.token = action.payload;
      })
      .addCase(removeToken, (state, _action) => {
        state.token = null;
      })
      // .addCase(setRememberMeToken, (state, action) => {
      //   state.rememberMeToken = action.payload;
      // })
      .addCase(removeRememberMeToken, (state, _action) => {
        state.rememberMeToken = null;
      })
      .addCase(setUserProfile, (state, action) => {
        state.userProfile = action.payload;
      })
      .addCase(removeUserProfile, (state, _action) => {
        state.userProfile = null;
      })
      .addDefaultCase((_state, _action) => {});
  },
});

export const selectToken = (state) => state.auth.token;
export default authSlice.reducer;
