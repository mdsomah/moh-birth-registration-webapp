import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import Box from "@mui/material/Box";
import MuiCard from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import { IoMdSend } from "react-icons/io";
import { LuAsterisk } from "react-icons/lu";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

//? Formik and Yup
import { useFormik } from "formik";
import * as Yup from "yup";

//? Create User
import CreateData from "../../../../../apis/CreateData";

//? Endpoints
const resetPasswordURL = "/auth/reset-password";

//? Password Reset Schema
const validatePasswordResetSchema = Yup.object()
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

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const ResetPasswordCard = () => {
  //? SearchParams State
  const [searchParams] = useSearchParams();

  //? UserId
  const userId = searchParams.get("userId");

  //? Token
  const token = searchParams.get("token");

  //? useNavigate
  const navigate = useNavigate();

  //? Loading State
  const [loading, setLoading] = useState(false);

  //? Password & Confirm Password States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //? Password Event
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //? Confirm Password Event
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  //? Reset Password Obj
  const ResetPasswordOBJ = {
    userId: () => `${userId}`,
    token: () => `${token}`,
  };

  //? Formik Reset Password Form
  const formikResetPasswordForm = useFormik({
    initialValues: {
      userId: `${ResetPasswordOBJ.userId()}`,
      token: `${ResetPasswordOBJ.token()}`,
      password: "",
      confirmPassword: "",
    },
    validationSchema: validatePasswordResetSchema,
    onSubmit: () => {
      handlePasswordReset();
    },
  });

  //? Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    formikResetPasswordForm.handleSubmit();
  };

  //? Password Reset Data
  const PasswordResetData = {
    userId: formikResetPasswordForm.values.userId,
    token: formikResetPasswordForm.values.token,
    password: formikResetPasswordForm.values.password,
    confirmPassword: formikResetPasswordForm.values.confirmPassword,
  };

  console.log(PasswordResetData);

  //? useQueryClient
  const queryClient = useQueryClient();

  const Mutation = useMutation({
    mutationFn: (newData) => CreateData(`${resetPasswordURL}`, newData),
    onSuccess: (data) => {
      if (data) {
        navigate("/", { replace: true });
        queryClient.invalidateQueries({
          queryKey: ["usersData"],
        });
        return data;
      }
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

  //? Handle Password Reset
  const handlePasswordReset = () => {
    Mutation.mutate(PasswordResetData);
  };

  //? Scroll to error input on form submit
  useEffect(() => {
    if (!formikResetPasswordForm.isSubmitting) return;
    if (Object.keys(formikResetPasswordForm.errors).length > 0) {
      document
        .getElementsByName(Object.keys(formikResetPasswordForm.errors)[0])
        .forEach((error) => error.focus());
    }
  }, [formikResetPasswordForm]);

  return (
    <Card variant="outlined">
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        Reset Password
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        autoCapitalize="on"
        sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
      >
        <FormControl variant="outlined" fullWidth>
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
            autoFocus
            placeholder="Enter new password..."
            value={formikResetPasswordForm.values.password}
            onChange={formikResetPasswordForm.handleChange}
            onBlur={formikResetPasswordForm.handleBlur}
            error={
              formikResetPasswordForm.touched.password &&
              Boolean(formikResetPasswordForm.errors.password)
            }
          />
          <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
            {formikResetPasswordForm.touched.password &&
              formikResetPasswordForm.errors.password}
          </Typography>
        </FormControl>
        <FormControl variant="outlined" fullWidth>
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
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            placeholder="Enter confirm password..."
            value={formikResetPasswordForm.values.confirmPassword}
            onChange={formikResetPasswordForm.handleChange}
            onBlur={formikResetPasswordForm.handleBlur}
            error={
              formikResetPasswordForm.touched.confirmPassword &&
              Boolean(formikResetPasswordForm.errors.confirmPassword)
            }
          />
          <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
            {formikResetPasswordForm.touched.confirmPassword &&
              formikResetPasswordForm.errors.confirmPassword}
          </Typography>
        </FormControl>
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          loading={loading}
          loadingPosition="end"
          endIcon={<IoMdSend size={20} color="#d4bf79" />}
          sx={{ mt: 3, mb: 2, color: "#d4bf79" }}
        >
          <span>Reset Password</span>
        </LoadingButton>
      </Box>
    </Card>
  );
};

export default ResetPasswordCard;
