import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { store } from "../app/store/store";
import { selectToken, setToken } from "../app/slices/nirAPIsTokenSlice";
import { setMessage } from "../app/slices/messageSlice";
import { encrypt } from "./encrypt";

//? NIR API Authentication Endpoint
const postGenerateToken = "/api/applicant/token";

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

//? Data to be encrypted
const data = {
  userId: "demouser",
  password: "nirnsaapi@2025",
};

//? Encrypt userId and password
const encryptedUserId = encrypt(data.userId);
const encryptedPassword = encrypt(data.password);

export const NIR_API = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

//? Add a request interceptor
NIR_API.interceptors.request.use(
  (request) => {
    const authToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiY0tNbzc0K0h1bk4xODdCbmU2OGZIdz09IiwiZXhwIjoxNzQ5ODMyMjQyLCJpc3MiOiJUZWNobm8gQnJhaW4gR3JvdXAiLCJhdWQiOiJOU0EsIExpYmVyaWEifQ.TQHWTQyshPJ2KoMUpn6za0IuHODOlmze-V4KOTSje9c";
    // const authToken = selectToken(store.getState());
    if (authToken) {
      request.headers.Authorization = `Bearer ${authToken}`;
    }
    return request;
  },
  (error) => Promise.reject(error)
);

//? Add a response interceptor
NIR_API.interceptors.response.use(
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
        const response = await NIR_API.post(`${postGenerateToken}`, {
          userId: `${encryptedUserId}`,
          password: `${encryptedPassword}`,
        });

        if (response?.data) {
          const { token } = response?.data;

          if (process.env.MODE === "development") {
            store.dispatch(
              setMessage(Success_Alert("New NIR token generated!"))
            );
          }

          store.dispatch(setToken(token));

          //? Update the authorization header with the new access token.
          NIR_API.defaults.headers.common.Authorization = `Bearer ${token}`;

          //? Retry the original request with the new access token
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return NIR_API(originalRequest);
        }
      } catch (error) {
        //? Handle refresh token error or redirect to login
        if (error?.response) {
          store.dispatch(setMessage(Error_Alert("Failed to generate token!")));
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(error);
  }
);
