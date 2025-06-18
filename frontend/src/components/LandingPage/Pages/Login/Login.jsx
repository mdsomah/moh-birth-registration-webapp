import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link as URLLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet-async";
import { ThemeProvider } from "@mui/material/styles";
import { responsiveTheme } from "../../../../utils/muiUtils";
import { authActions } from "../../../../app/actions/authActions";
import { clearMessage } from "../../../../app/slices/messageSlice";
import { setUserProfile } from "../../../../app/slices/authSlice";
import {
  CssBaseline,
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  FormControl,
  FormControlLabel,
  OutlinedInput,
  InputAdornment,
  Checkbox,
  IconButton,
  Tooltip,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import { LuAsterisk } from "react-icons/lu";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CopyRights from "../../CopyRights/CopyRights";

// Scroll to top of react route/page change
import ScrollToTop from "../../../ScrollToTop/ScrollToTop";

// Formik and Yup
import { useFormik } from "formik";
import * as Yup from "yup";

// J-Singh Logo
import logo from "../../../../images/MICAT_Logo/MICAT-LOGO.png";

// Registration Image
import registrationImageURL from "../../../../images/Registration-Image.jpg";

const emailRegex = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

// User Login Schema
const validateUserLoginSchema = Yup.object()
  .shape({
    Username: Yup.string()
      .required("Email or user name required!")
      .test("is-email", "Invalid email", (value) => {
        if (value) {
          return value.includes("@")
            ? Yup.string().email().matches(emailRegex).isValid(value)
            : true;
        }
        return true;
      }),
    Password: Yup.string().required("Password required!"),
    // rememberMe: Yup.boolean().notRequired(),
  })
  .required();

const Login = () => {
  // Destructure authActions
  const { login } = authActions;
  // useNavigate
  const navigate = useNavigate();
  // useDispatch
  const dispatch = useDispatch();

  // Loading State
  const [loading, setLoading] = useState(false);
  // Show Password State
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  // Formik User Login Form
  const formikUserLoginForm = useFormik({
    initialValues: {
      Username: "",
      Password: "",
      // rememberMe: false,
    },
    validationSchema: validateUserLoginSchema,
    onSubmit: (values) => {
      console.log(values);
      handleUserLogin();
    },
  });

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    formikUserLoginForm.handleSubmit();
  };

  // User Login Data
  const UserLoginData = {
    Username: formikUserLoginForm.values.Username,
    Password: formikUserLoginForm.values.Password,
  };

  console.log(UserLoginData);

  // useQueryClient
  const queryClient = useQueryClient();

  const Mutation = useMutation({
    mutationFn: (newData) => dispatch(login(newData)),
    onSuccess: (data) => {
      const { user } = data?.payload?.user;
      const loginUserProfile = {
        id: user?.id,
        lastName: user?.lastName,
        firstName: user?.firstName,
        middleName: user?.middleName,
        displayName: user?.displayName,
        primaryPhoneNumber: user?.primaryPhoneNumber,
        secondaryPhoneNumber: user?.secondaryPhoneNumber,
        email: user?.email,
        userName: user?.userName,
        role: user?.role,
        photo: user?.photo,
      };
      // if (formikUserLoginForm.values.rememberMe === true) {
      //   localStorage.setItem(
      //     "rememberMe_token",
      //     JSON.stringify(user?.accessToken)
      //   );
      // }
      if (data) {
        dispatch(setUserProfile(loginUserProfile));
        navigate("/dashboard", { replace: true });
        queryClient.invalidateQueries({
          queryKey: ["usersData"],
        });
      }
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

  // Handle User Login
  const handleUserLogin = () => {
    Mutation.mutate(UserLoginData);
  };

  // Scroll to error input on form submit
  useEffect(() => {
    if (!formikUserLoginForm.isSubmitting) return;
    if (Object.keys(formikUserLoginForm.errors).length > 0) {
      document
        .getElementsByName(Object.keys(formikUserLoginForm.errors)[0])
        .forEach((error) => error.focus());
    }
  }, [formikUserLoginForm]);

  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login | MICAT online registration web software.</title>
      </Helmet>
      <ThemeProvider theme={responsiveTheme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={5}
            md={5}
            lg={5}
            sx={{
              display: { xs: "none", lg: "block" },
              bgcolor: "#4169E1",
              textAlign: "center",
              p: 3,
            }}
          >
            <Box sx={{ mt: 14 }}>
              <Typography
                variant="h3"
                sx={{ mt: 3, color: "#fff", fontWeight: "bolder" }}
              >
                MICAT
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Box sx={{ mb: 2 }}>
                  <Typography
                    sx={{
                      fontSize: "1.3rem",
                      fontWeight: 500,
                      color: "#fff",
                    }}
                  >
                    National Communications Bureau Annual Registration System
                  </Typography>
                  <Typography sx={{ color: "#F5F5DC", fontSize: 16, mt: 1 }}>
                    Enter a valid username or email and password to login to
                    your MICAT account. For MICAT user only!
                  </Typography>
                </Box>
                <Box
                  sx={{
                    backgroundImage: `url(${registrationImageURL})`,
                    height: 400,
                  }}
                ></Box>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={7}
            md={7}
            lg={7}
            component={Paper}
            elevation={6}
            square
          >
            <Paper
              sx={{ width: 500, ml: "auto", mr: "auto", pt: 3, pb: 3, mt: 3 }}
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
                  <img src={logo} alt="MICAT Logo" width="100" />
                </URLLink>
                <Typography component="h1" variant="h5" sx={{ mt: 3 }}>
                  Login
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
                      Username or Email
                      <span>
                        <LuAsterisk size={10} color="#C41E3A" />
                      </span>
                      <Tooltip
                        title="This field required!"
                        placement="bottom"
                        arrow
                      >
                        <IconButton
                          sx={{
                            cursor: "default",
                            position: "relative",
                            bottom: 2,
                          }}
                        >
                          <BsFillInfoCircleFill size={14} color="#acb5c3" />
                        </IconButton>
                      </Tooltip>
                    </Typography>
                    <TextField
                      margin="normal"
                      id="Username"
                      name="Username"
                      type="text"
                      placeholder="Enter username or email address..."
                      value={formikUserLoginForm.values.Username}
                      onChange={formikUserLoginForm.handleChange}
                      onBlur={formikUserLoginForm.handleBlur}
                      error={
                        formikUserLoginForm.touched.Username &&
                        Boolean(formikUserLoginForm.errors.Username)
                      }
                    />
                    <Typography variant="inherit" color="error.main">
                      {formikUserLoginForm.touched.Username &&
                        formikUserLoginForm.errors.Username}
                    </Typography>
                  </FormControl>
                  <FormControl variant="outlined" fullWidth sx={{ mt: 2 }}>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography sx={{ mb: 2 }}>
                        Password
                        <span>
                          <LuAsterisk size={10} color="#C41E3A" />
                        </span>
                        <Tooltip
                          title="This field required!"
                          placement="bottom"
                          arrow
                        >
                          <IconButton
                            sx={{
                              cursor: "default",
                              position: "relative",
                              bottom: 2,
                            }}
                          >
                            <BsFillInfoCircleFill size={14} color="#acb5c3" />
                          </IconButton>
                        </Tooltip>
                      </Typography>
                      {/* <URLLink
                        to="/request-password-reset"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <Typography>
                          <span
                            style={{
                              color: "#4169E1",
                              textAlign: "end",
                              cursor: "pointer",
                            }}
                          >
                            Forget password?
                          </span>
                        </Typography>
                      </URLLink> */}
                    </Box>
                    <OutlinedInput
                      id="Password"
                      name="Password"
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
                      placeholder="Enter password..."
                      value={formikUserLoginForm.values.Password}
                      onChange={formikUserLoginForm.handleChange}
                      onBlur={formikUserLoginForm.handleBlur}
                      error={
                        formikUserLoginForm.touched.Password &&
                        Boolean(formikUserLoginForm.errors.Password)
                      }
                    />
                    <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikUserLoginForm.touched.Password &&
                        formikUserLoginForm.errors.Password}
                    </Typography>
                  </FormControl>
                  {/* <FormControl sx={{ mt: 2 }}>
                    <FormControlLabel
                      id="rememberMe"
                      name="rememberMe"
                      control={
                        <Checkbox
                          checked={formikUserLoginForm.values.rememberMe}
                          onChange={formikUserLoginForm.handleChange}
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: 28,
                            },
                          }}
                        />
                      }
                      label="Remember me for 30 days"
                    />
                  </FormControl> */}
                  <LoadingButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    loading={loading}
                    loadingPosition="end"
                    endIcon={<IoMdSend size={20} color="#fff" />}
                    sx={{ mt: 3, mb: 2, bgcolor: "buttonBGColor.main" }}
                  >
                    <span>Log In</span>
                  </LoadingButton>
                </Box>
              </Box>
            </Paper>
            <Box
              sx={{ width: 500, ml: "auto", mr: "auto", pt: 3, pb: 3, mt: 3 }}
            >
              <CopyRights />
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
      <ScrollToTop />
    </React.Fragment>
  );
};

export default Login;
