// import axios from "axios";
import API from "../utils/api.Interceptor";

//? Endpoints
const loginUser = "/auth/login";
const logoutUser = "/auth/logout";
const getUser = "/auth/authenticated";

//? Login User
const login = async (user) => {
  const resp = await API.post(`${loginUser}`, user);
  return resp?.data;
};

//? Logout User
const logout = async () => {
  const resp = await API.post(`${logoutUser}`);
  return resp?.data;
};

//? Get Authenticated User
const getAuthenticatedUser = async () => {
  const resp = await API.get(`${getUser}`);
  return resp?.data;
};

const AuthService = { login, logout, getAuthenticatedUser };

export default AuthService;
