import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link as URLLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Paper,
  TextField,
  FormControl,
  FormControlLabel,
  Button,
  IconButton,
  Tooltip,
  Checkbox,
  Link,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import { LuAsterisk } from "react-icons/lu";
import { FaArrowLeft } from "react-icons/fa";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ForgotPassword from "./ForgetPassword/ForgotPassword";
import ButtonLoader from "../../../ButtonLoader/ButtonLoader";
import { authActions } from "../../../../app/actions/authActions";
import { setUserProfile } from "../../../../app/slices/authSlice";

//? Formik and Yup
import { useFormik } from "formik";
import * as Yup from "yup";

//? MOH Logo
import MOHLogo from "../../../../images/MOH_Logo/MOH-LOGO.png";

const emailRegex = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

//? User Login Schema
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
    rememberMe: Yup.boolean().notRequired(),
  })
  .required();

const SigninContent = () => {
  //? Destructure authActions
  const { login } = authActions;

  //? useNavigate
  const navigate = useNavigate();

  //? useDispatch
  const dispatch = useDispatch();

  //? Loading State
  const [loading, setLoading] = useState(false);

  //? Show Password State
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //? Formik User Login Form
  const formikUserLoginForm = useFormik({
    initialValues: {
      Username: "",
      Password: "",
      rememberMe: false,
    },
    validationSchema: validateUserLoginSchema,
    onSubmit: (values) => {
      console.log(values);
      handleUserLogin();
    },
  });

  //? Handle Submit Form
  const handleSubmitForm = (e) => {
    e.preventDefault();
    formikUserLoginForm.handleSubmit();
  };

  //? User Login Data
  const UserLoginData = {
    Username: formikUserLoginForm.values.Username,
    Password: formikUserLoginForm.values.Password,
    rememberMe: formikUserLoginForm.values.rememberMe,
  };

  console.log(UserLoginData);

  //? useQueryClient
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
      if (formikUserLoginForm.values.rememberMe === true) {
        localStorage.setItem(
          "rememberMe_token",
          JSON.stringify(user?.accessToken)
        );
      } else {
        localStorage.removeItem("rememberMe_token");
      }
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
      if (error) {
        return error;
      }
    },
  });

  //? Loading Effect
  useEffect(() => {
    if (Mutation.isPending) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [Mutation]);

  //? Handle User Login
  const handleUserLogin = () => {
    Mutation.mutate(UserLoginData);
  };

  //? Scroll to error input on form submit
  useEffect(() => {
    if (!formikUserLoginForm.isSubmitting) return;
    if (Object.keys(formikUserLoginForm.errors).length > 0) {
      document
        .getElementsByName(Object.keys(formikUserLoginForm.errors)[0])
        .forEach((error) => error.focus());
    }
  }, [formikUserLoginForm]);

  return (
    <Paper sx={{ width: 500, ml: "auto", mr: "auto", pt: 3, pb: 3 }}>
      <Box
        sx={{
          my: 1.8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <URLLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <img src={MOHLogo} alt="MOH Logo" width="100" />
        </URLLink>
        <Typography component="h1" variant="h5" sx={{ mt: 3 }}>
          Sign In
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmitForm}
          noValidate
          autoComplete="off"
        >
          <FormControl variant="outlined" fullWidth>
            <Typography>
              Username / Email
              <span>
                <LuAsterisk size={10} color="#C41E3A" />
              </span>
              <Tooltip title="This field required!" placement="bottom" arrow>
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
            <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
              {formikUserLoginForm.touched.Username &&
                formikUserLoginForm.errors.Username}
            </Typography>
          </FormControl>
          <FormControl variant="outlined" fullWidth>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ mb: 2 }}>
                Password
                <span>
                  <LuAsterisk size={10} color="#C41E3A" />
                </span>
              </Typography>
              <Link
                component="button"
                type="button"
                onClick={handleClickOpen}
                variant="body2"
                sx={{ alignSelf: "baseline" }}
              >
                Forgot your password?
              </Link>
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
                    {showPassword ? <Visibility /> : <VisibilityOff />}
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
            <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
              {formikUserLoginForm.touched.Password &&
                formikUserLoginForm.errors.Password}
            </Typography>
          </FormControl>
          <FormControlLabel
            id="rememberMe"
            name="rememberMe"
            control={
              <Checkbox
                checked={formikUserLoginForm.values.rememberMe}
                onChange={formikUserLoginForm.handleChange}
                color="primary"
              />
            }
            label="Remember me on this device"
          />
          <ForgotPassword open={open} handleClose={handleClose} />
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            loading={loading}
            loadingIndicator={<ButtonLoader />}
            loadingPosition="end"
            endIcon={<IoMdSend size={20} color="#fff" />}
            sx={{ mt: 3, mb: 2, color: "#fff" }}
          >
            {loading ? (
              <span style={{ color: "#fff" }}>Signing In</span>
            ) : (
              <spa>Sign In</spa>
            )}
          </LoadingButton>
          <URLLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Button
              sx={{ p: 1, mt: 1, color: "#4169E1" }}
              startIcon={<FaArrowLeft size={20} color="#4169E1" />}
            >
              Back To Home
            </Button>
          </URLLink>
        </Box>
      </Box>
    </Paper>
  );
};

export default SigninContent;
