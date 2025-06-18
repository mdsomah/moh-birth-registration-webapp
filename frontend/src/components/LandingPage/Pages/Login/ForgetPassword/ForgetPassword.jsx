import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link as URLLink, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ThemeProvider } from "@mui/material/styles";
import { responsiveTheme } from "../../../../../utils/muiUtils";
import {
  CssBaseline,
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  FormControl,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { BiMailSend } from "react-icons/bi";
import { LuAsterisk } from "react-icons/lu";
import { FaArrowLeft } from "react-icons/fa";
import useTranslationLang from "../../../../../hooks/useTranslation";
import ForgetPasswordDemo from "./ForgetPasswordDemo/ForgetPasswordDemo";

// Scroll to top of react route/page change
import ScrollToTop from "../../../../ScrollToTop/ScrollToTop";

// Formik and Yup
import { useFormik } from "formik";
import * as Yup from "yup";

// Update Data
import CreateData from "../../../../../apis/CreateData";

// J-Singh Logo
import logo from "../../../../../images/ROMMTech_Logo/eSalesPOS_Logo.png";

// Endpoints
const forgetPasswordURL = "/auth/forget-password";

// i18next Local Storage Key
const langKey = "i18nextLng";

// Employee Password Reset Schema
const validateEmployeePasswordResetSchema = Yup.object()
  .shape({
    email: Yup.string().required("Email required!").email("Invalid Email!"),
  })
  .required();

const ForgetPassword = () => {
  // Destructure useTranslationLang hook
  const { translation } = useTranslationLang(`${langKey}`);

  // Destructure useParams
  let { lang } = useParams();

  lang = translation;

  // useNavigate
  const navigate = useNavigate();

  // Loading State
  const [loading, setLoading] = useState(false);

  // Formik Employee Password Reset Form
  const formikEmployeePasswordResetForm = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validateEmployeePasswordResetSchema,
    onSubmit: (values) => {
      console.log(values);
      handlePasswordReset();
    },
  });

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    formikEmployeePasswordResetForm.handleSubmit();
  };

  // Password Reset Data
  const PasswordResetData = {
    email: formikEmployeePasswordResetForm.values.email,
  };

  console.log(PasswordResetData);

  // useQueryClient
  const queryClient = useQueryClient();

  const Mutation = useMutation({
    mutationFn: (newData) => CreateData(`${forgetPasswordURL}`, newData),
    onSuccess: (data) => {
      navigate(`/${lang}/login`, { replace: true });
      queryClient.invalidateQueries({
        queryKey: ["employeesData"],
      });
      return data;
    },
    onError: (error) => {
      return error;
    },
  });

  // Loading Effect
  useEffect(() => {
    if (Mutation.isPending) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [Mutation]);

  // Handle Password Reset
  const handlePasswordReset = () => {
    Mutation.mutate(PasswordResetData);
  };

  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>ROMMTech eSalesPOS | Password Reset</title>
      </Helmet>
      <ThemeProvider theme={responsiveTheme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={7}
            md={7}
            lg={7}
            sx={{
              display: { xs: "none", lg: "block" },
              bgcolor: "#00A4EF",
              textAlign: "center",
              p: 3,
            }}
          >
            <Box sx={{ mt: 14 }}>
              <Typography
                variant="h3"
                sx={{ mt: 3, color: "#fff", fontWeight: "bolder" }}
              >
                Password reset is easy
              </Typography>
              {/* Start Singup Demo */}
              <Box sx={{ mt: 4 }}>
                <Box sx={{ mb: 2 }}>
                  <Typography
                    sx={{
                      fontSize: "1.3rem",
                      fontWeight: 500,
                      color: "#fff",
                    }}
                  >
                    Watch Password Reset Demo
                  </Typography>
                  <Typography sx={{ color: "#F5F5DC", fontSize: 16 }}>
                    See how it's done using your email
                  </Typography>
                </Box>
                <ForgetPasswordDemo />
              </Box>
              {/* End Singup Demo */}
              <URLLink to="/contact-us">
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 4, mr: 3, fontSize: 20 }}
                >
                  Book A Demo
                </Button>
              </URLLink>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={5}
            md={5}
            lg={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 1.8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <URLLink
                to="/"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img src={logo} width="100" />
              </URLLink>
              <Typography component="h1" variant="h5" sx={{ mt: 3 }}>
                Request Password Reset?
              </Typography>
              <Typography sx={{ mt: 2 }}>
                <span style={{ color: "#00A4EF" }}>
                  Enter your email to receive instructions to reset your
                  password.
                </span>
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                autoCapitalize="on"
                sx={{ mt: 4 }}
              >
                <FormControl variant="outlined" fullWidth>
                  <Typography>
                    Email Address
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                  </Typography>
                  <TextField
                    margin="normal"
                    id="email"
                    name="email"
                    type="email"
                    value={formikEmployeePasswordResetForm.values.email}
                    onChange={formikEmployeePasswordResetForm.handleChange}
                    onBlur={formikEmployeePasswordResetForm.handleBlur}
                    error={
                      formikEmployeePasswordResetForm.touched.email &&
                      Boolean(formikEmployeePasswordResetForm.errors.email)
                    }
                  />
                  <Typography variant="inherit" color="error.main">
                    {formikEmployeePasswordResetForm.touched.email &&
                      formikEmployeePasswordResetForm.errors.email}
                  </Typography>
                </FormControl>
                <LoadingButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  loading={loading}
                  loadingPosition="end"
                  endIcon={<BiMailSend size={20} color="#fff" />}
                  sx={{ mt: 3, mb: 2 }}
                >
                  <span>Send Email</span>
                </LoadingButton>
                <URLLink
                  to={`/${lang}/login`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Button
                    sx={{ p: 1, mt: 1 }}
                    startIcon={<FaArrowLeft size={20} color="#C41E3A" />}
                  >
                    Back to Login
                  </Button>
                </URLLink>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
      <ScrollToTop />
    </React.Fragment>
  );
};

export default ForgetPassword;
