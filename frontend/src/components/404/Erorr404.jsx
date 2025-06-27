import React from "react";
import { Link as URLLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import {
  Paper,
  Typography,
  Alert,
  AlertTitle,
  Button,
  CssBaseline,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { responsiveTheme } from "../../utils/muiUtils";

const Error404 = () => {
  //? Destructure useSelector
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          404 Error | Ministry of Health (MOH) Online Delayed Birth Registration
          Platform
        </title>
      </Helmet>
      <ThemeProvider theme={responsiveTheme}>
        <CssBaseline />
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
            404, Page Not Found!!
          </Typography>
          <Alert severity="error" sx={{ mt: 3, mb: 10 }}>
            <AlertTitle>Error</AlertTitle>
            <strong>The page you're trying to access is not found</strong>
          </Alert>
          {isAuthenticated ? (
            <URLLink
              to="/dashboard"
              style={{
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
              }}
            >
              <Button sx={{ mt: 3, ml: 1 }} variant="contained" color="primary">
                Go To Dashboard
              </Button>
            </URLLink>
          ) : (
            <URLLink
              to="/"
              style={{
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
              }}
            >
              <Button sx={{ mt: 3, ml: 1 }} variant="contained" color="primary">
                Go To Home
              </Button>
            </URLLink>
          )}
        </Paper>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default Error404;
