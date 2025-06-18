import React from "react";
import { Link as URLLink } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Typography from "@mui/material/Typography";
import { Paper, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { removeInstitution } from "../../../../app/slices/trackInstitutionSlice";

const TrackApplicationSuccessForm = () => {
  // useDispatch
  const dispatch = useDispatch();

  // Destructure useSelector
  const {
    institution: { application: institution },
  } = useSelector((state) => state.trackInstitution);
  console.log(institution);

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
          Thank you for registering with MICAT!
        </Typography>
        <Alert
          severity={`${
            institution?.applicationStatus === "REJECTED"
              ? "error"
              : institution?.applicationStatus === "ACCEPTED"
              ? "info"
              : "warning"
          }`}
          sx={{
            mt: 3,
            mb: 8,
            // bgcolor: `${
            //   institution?.applicationStatus === "REJECTED"
            //     ? "#DC143C"
            //     : institution?.applicationStatus === "ACCEPTED"
            //     ? "#00A4EF"
            //     : "#F7CB73"
            // }`,
          }}
        >
          <AlertTitle sx={{ fontWeight: "bold" }}>
            {institution?.applicationStatus === "REJECTED"
              ? "Application Rejected"
              : institution?.applicationStatus === "ACCEPTED"
              ? "Application Accepted"
              : "Application Pending"}
          </AlertTitle>
          <Typography>
            Business TIN: <strong>{institution?.businessTIN}</strong>
          </Typography>
          {institution?.institutionName} application status is{" "}
          <strong>{institution?.applicationStatus}</strong>
          <p>You can always go back and track your application!</p>
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
            onClick={() => dispatch(removeInstitution())}
          >
            Go Back Home
          </Button>
        </URLLink>
      </Paper>
    </React.Fragment>
  );
};

export default TrackApplicationSuccessForm;
