import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Typography from "@mui/material/Typography";
import { store } from "../../app/store/store";
import { setMessage } from "../../app/slices/messageSlice";
import NIR_API from "../../utils/api.nir.Interceptor";

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

const GET_ALL_APPLICANTS = async (url) => {
  const resp = await NIR_API.get(`${url}`)
    .then((response) => {
      if (response?.data) {
        return response?.data;
      }
    })
    .catch((error) => {
      if (error?.response) {
        const { error, message } = error?.response;
        return store.dispatch(setMessage(Error_Alert(`${error}: ${message}`)));
        // return store.dispatch(setMessage(Error_Alert(error)));
      }
    });
  return resp;
};

export default GET_ALL_APPLICANTS;
