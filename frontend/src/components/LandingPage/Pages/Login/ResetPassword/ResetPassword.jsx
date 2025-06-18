import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Link as URLLink,
  useNavigate,
  useSearchParams,
  useParams,
} from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ThemeProvider } from "@mui/material/styles";
import { responsiveTheme } from "../../../../../utils/muiUtils";
import {
  CssBaseline,
  Box,
  Typography,
  Grid,
  Paper,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { IoMdSend } from "react-icons/io";
import { LuAsterisk } from "react-icons/lu";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import useTranslationLang from "../../../../../hooks/useTranslation";
import ResetPasswordDemo from "../ResetPassword/ResetPasswordDemo/ResetPasswordDemo";

// Scroll to top of react route/page change
import ScrollToTop from "../../../../ScrollToTop/ScrollToTop";

// Formik and Yup
import { useFormik } from "formik";
import * as Yup from "yup";

// J-Singh Logo
import logo from "../../../../../images/ROMMTech_Logo/eSalesPOS_Logo.png";

// Update Data
import CreateData from "../../../../../apis/CreateData";

// i18next Local Storage Key
const langKey = "i18nextLng";

// Endpoints
const resetEmployeePasswordURL = "/auth/reset-password";

// Employee Password Reset Schema
const validateEmployeePasswordResetSchema = Yup.object()
  .shape({
    password: Yup.string()
      .required("Password is required!")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required!")
      .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
  })
  .required();

const ResetPassword = () => {
  // Destructure useTranslationLang hook
  const { translation } = useTranslationLang(`${langKey}`);

  // SearchParams State
  const [searchParams] = useSearchParams();
  // EmployeeId
  const employeeId = searchParams.get("employeeId");
  // Token
  const token = searchParams.get("token");

  // Destructure useParams
  let { lang } = useParams();

  lang = translation;

  // useNavigate
  const navigate = useNavigate();

  // Loading State
  const [loading, setLoading] = useState(false);
  // Password & Confirm Password States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password Event
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Confirm Password Event
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  // Reset Password Obj
  const ResetPasswordOBJ = {
    employeeId: () => `${employeeId}`,
    token: () => `${token}`,
  };

  // Formik Rest Employee Password Form
  const formikResetEmployeePasswordForm = useFormik({
    initialValues: {
      employeeId: `${ResetPasswordOBJ.employeeId()}`,
      token: `${ResetPasswordOBJ.token()}`,
      password: "",
      confirmPassword: "",
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
    formikResetEmployeePasswordForm.handleSubmit();
  };

  // Password Reset Data
  const PasswordResetData = {
    employeeId: formikResetEmployeePasswordForm.values.employeeId,
    token: formikResetEmployeePasswordForm.values.token,
    password: formikResetEmployeePasswordForm.values.password,
    confirmPassword: formikResetEmployeePasswordForm.values.confirmPassword,
  };

  console.log(PasswordResetData);

  // useQueryClient
  const queryClient = useQueryClient();

  const Mutation = useMutation({
    mutationFn: (newData) => CreateData(`${resetEmployeePasswordURL}`, newData),
    onSuccess: (data) => {
      // navigate(`${lang}/login`, { replace: true });
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
        <title>ROMMTech eSalesPOS | Reset Password</title>
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
                Resetting your password is easy
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
                    See how it's done using either your email or username and
                    your password
                  </Typography>
                </Box>
                <ResetPasswordDemo />
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
                Reset Your Password
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 4 }}
              >
                <FormControl variant="outlined" fullWidth sx={{ mt: 2 }}>
                  <Typography sx={{ mb: 2 }}>
                    New Password
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                  </Typography>
                  <OutlinedInput
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    value={formikResetEmployeePasswordForm.values.password}
                    onChange={formikResetEmployeePasswordForm.handleChange}
                    onBlur={formikResetEmployeePasswordForm.handleBlur}
                    error={
                      formikResetEmployeePasswordForm.touched.password &&
                      Boolean(formikResetEmployeePasswordForm.errors.password)
                    }
                  />
                  <Typography
                    variant="inherit"
                    color="error.main"
                    sx={{ mt: 1 }}
                  >
                    {formikResetEmployeePasswordForm.touched.password &&
                      formikResetEmployeePasswordForm.errors.password}
                  </Typography>
                </FormControl>
                <FormControl variant="outlined" fullWidth sx={{ mt: 2 }}>
                  <Typography sx={{ mb: 2 }}>
                    Confirm Password
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                  </Typography>
                  <OutlinedInput
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownConfirmPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    value={
                      formikResetEmployeePasswordForm.values.confirmPassword
                    }
                    onChange={formikResetEmployeePasswordForm.handleChange}
                    onBlur={formikResetEmployeePasswordForm.handleBlur}
                    error={
                      formikResetEmployeePasswordForm.touched.confirmPassword &&
                      Boolean(
                        formikResetEmployeePasswordForm.errors.confirmPassword
                      )
                    }
                  />
                  <Typography
                    variant="inherit"
                    color="error.main"
                    sx={{ mt: 1 }}
                  >
                    {formikResetEmployeePasswordForm.touched.confirmPassword &&
                      formikResetEmployeePasswordForm.errors.confirmPassword}
                  </Typography>
                </FormControl>
                <LoadingButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  loading={loading}
                  loadingPosition="end"
                  endIcon={<IoMdSend size={20} color="#fff" />}
                  sx={{ mt: 3, mb: 2 }}
                >
                  <span>Reset Password</span>
                </LoadingButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
      <ScrollToTop />
    </React.Fragment>
  );
};

export default ResetPassword;
