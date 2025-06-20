import React from "react";
import { Link as URLLink } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Typography from "@mui/material/Typography";
import { Paper, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeIsCompleted } from "../../../../../app/slices/newRegistrationSlice";

const SuccessForm = () => {
  // useDispatch
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <Paper
        sx={{
          width: 700,
          p: 5,
          mt: 3,
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Thank you for registering your institution with us!
        </Typography>
        <Alert severity="info" sx={{ mt: 3, mb: 10 }}>
          <AlertTitle>Success</AlertTitle>
          Institution Register — <strong>Successfully!</strong>
          <p>Go to the home page and track your application!</p>
        </Alert>
        <URLLink
          to="/"
          style={{
            textDecoration: "none",
            color: "inherit",
            cursor: "pointer",
          }}
        >
          <Button
            sx={{ mt: 3, ml: 1, bgcolor: "#008080" }}
            variant="contained"
            onClick={() => dispatch(removeIsCompleted())}
          >
            Go Back Home
          </Button>
        </URLLink>
      </Paper>
    </React.Fragment>
  );
};

export default SuccessForm;
