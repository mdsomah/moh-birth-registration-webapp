import { createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Typography from "@mui/material/Typography";
import { store } from "../store/store";
import { setMessage } from "../slices/messageSlice";

import AuthService from "../../services/authService";

//? Endpoints
const loginUser = "/auth/login";
const logoutUser = "/auth/logout";
const getUser = "/auth/authenticated";

//? React Sweet Alert Initialization
const MySwal = withReactContent(Swal);

//? Sweet Alert Error
const Error_Alert = (message) => {
  MySwal.fire({
    title: (
      <Typography component="h5" variant="h5" color="error">
        ERROR
      </Typography>
    ),
    text: `${message}`,
    icon: "error",
  });
};

//? Login User
const login = createAsyncThunk(`${loginUser}`, async (user, thunkAPI) => {
  try {
    const data = await AuthService.login(user);
    store.dispatch(setMessage(data?.message));
    return { user: data };
  } catch (error) {
    if (error?.response) {
      const { message } = error?.response?.data;
      store.dispatch(setMessage(message));
      thunkAPI.dispatch(Error_Alert(message));
      return thunkAPI.rejectWithValue();
    }
  }
});

//? Logout User
const logout = createAsyncThunk(`${logoutUser}`, async (thunkAPI) => {
  try {
    const data = await AuthService.logout();
    store.dispatch(setMessage(data?.message));
    return data;
  } catch (error) {
    if (error?.response) {
      const { message } = error?.response?.data;
      store.dispatch(setMessage(message));
      thunkAPI.dispatch(Error_Alert(message));
      return thunkAPI.rejectWithValue();
    }
  }
});

//? Get Authenticated User
const getAuthenticatedUser = createAsyncThunk(
  `${getUser}`,
  async (thunkAPI) => {
    try {
      const data = await AuthService.getAuthenticatedUser();
      store.dispatch(setMessage(data?.message));
      return data;
    } catch (error) {
      const { message } = error?.response?.data;
      store.dispatch(setMessage(message));
      thunkAPI.dispatch(Error_Alert(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const authActions = { login, logout, getAuthenticatedUser };
