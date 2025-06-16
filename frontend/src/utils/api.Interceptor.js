import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { store } from "../app/store/store";
import { selectToken, setToken } from "../app/slices/authSlice";
import { setMessage } from "../app/slices/messageSlice";

//? Endpoints
const postRefreshToken = "/auth/refresh-token";

//? React Sweet Alert Initialization
const MySwal = withReactContent(Swal);

//? Sweet Alert Success
const Success_Alert = (message) => {
  MySwal.fire({
    title: "SUCCESS...",
    text: `${message}`,
    icon: "success",
  });
};

//? Sweet Alert Error
const Error_Alert = (message) => {
  MySwal.fire({
    title: "ERROR...",
    text: `${message}`,
    icon: "error",
  });
};

const API = axios.create({
  withCredentials: true,
});

//? Add a request interceptor
API.interceptors.request.use(
  (request) => {
    const accessToken = selectToken(store.getState());
    if (accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => Promise.reject(error)
);

//? Add a response interceptor
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const response = await API.post(`${postRefreshToken}`, {});

        if (response?.data) {
          const { newAccessToken, message } = response?.data;

          if (process.env.MODE === "development") {
            store.dispatch(setMessage(Success_Alert(message)));
          }

          store.dispatch(setToken(newAccessToken));

          //? Update the authorization header with the new access token.
          API.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

          //? Retry the original request with the new access token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return API(originalRequest);
        }
      } catch (error) {
        //? Handle refresh token error or redirect to login
        if (error?.response) {
          const { message } = error?.response?.data;
          store.dispatch(setMessage(Error_Alert(message)));
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default API;
