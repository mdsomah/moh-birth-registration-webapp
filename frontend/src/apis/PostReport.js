import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Typography from "@mui/material/Typography";
import { store } from "../app/store/store";
import { setMessage } from "../app/slices/messageSlice";
import API from "../utils/api.Interceptor";

//? React Sweet Alert Initialization
const MySwal = withReactContent(Swal);

//? Sweet Alert Success
const Success_Alert = (message) => {
  MySwal.fire({
    title: (
      <Typography component="h5" variant="h5" color="success">
        SUCCESS
      </Typography>
    ),
    text: `${message}`,
    icon: "success",
  });
};

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

const POST_REPORT = async (url, newData) => {
  const resp = await API.post(`${url}`, newData)
    .then((response) => {
      if (response?.data) {
        store.dispatch(setMessage(Success_Alert(response?.data?.message)));
        return response?.data;
      }
    })
    .catch((error) => {
      if (error?.response) {
        const { message } = error?.response?.data;
        return store.dispatch(setMessage(Error_Alert(message)));
      }
    });

  return resp;
};

export default POST_REPORT;
