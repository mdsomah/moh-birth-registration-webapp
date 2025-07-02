import React, { useState, useEffect, forwardRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { styled, useTheme } from "@mui/material/styles";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  IconButton,
  Typography,
  Tooltip,
  Box,
  Paper,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { MdCancel } from "react-icons/md";
import { IoMdSave } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { LuAsterisk } from "react-icons/lu";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ButtonLoader from "../../../../ButtonLoader/ButtonLoader";

//? MUI Dialog Responsive Query
import useMediaQuery from "@mui/material/useMediaQuery";

//? Formik and Yup
import { useFormik } from "formik";
import * as Yup from "yup";

//? Update User Password
import UpdateData from "../../../../../apis/UpdateData";

//? Endpoints
const updateUserURL = "/users/user-password";

//? Dialog Transition
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//? Dialog Styles
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

// Validate User Password Schema
const ValidateUserPasswordSchema = Yup.object()
  .shape({
    password: Yup.string()
      .required("Password required!")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    confirmPassword: Yup.string()
      .required("Confirm password required!")
      .oneOf([Yup.ref("password"), null], "Confirm password does not match!"),
  })
  .required();

const ChangeUserPasswordDialog = ({ row, closeMenu, open, handleClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

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

  //? Formik User Password Form
  const formikUserPasswordForm = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: ValidateUserPasswordSchema,
    onSubmit: () => {
      updateUserPassword();
    },
  });

  //? Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    formikUserPasswordForm.handleSubmit();
  };

  //? Handle Cancel
  const handleCancel = () => {
    handleClose();
    formikUserPasswordForm.resetForm();
  };

  //? User Data
  const UserData = {
    password: formikUserPasswordForm.values.password,
    confirmPassword: formikUserPasswordForm.values.confirmPassword,
  };

  console.log(UserData);

  //? useQueryClient
  const queryClient = useQueryClient();

  const Mutation = useMutation({
    mutationFn: (updatedData) =>
      UpdateData(
        `${updateUserURL}/${row?.original?.id}`,
        updatedData,
        closeMenu
      ),
    onSuccess: (data) => {
      if (data) {
        handleClose();
        formikUserPasswordForm.resetForm();
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

  //? Loading Effect
  useEffect(() => {
    if (Mutation.isPending) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [Mutation]);

  // Update User Password
  const updateUserPassword = async () => {
    Mutation.mutate(UserData);
  };

  return (
    <React.Fragment>
      {/* Start Dialog */}
      <BootstrapDialog
        // onClose={handleClose}
        // aria-labelledby="customized-dialog-title"
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        open={open}
        fullScreen={fullScreen}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <Typography
            sx={{
              color: "#00A4EF",
              fontWeight: "bold",
              fontSize: "1rem",
              textTransform: "uppercase",
            }}
          >
            Change Password
          </Typography>
        </DialogTitle>
        <Tooltip title="Close">
          <IconButton
            aria-label="close"
            onClick={handleCancel}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <IoMdClose size={20} color="#acb5c3" />
          </IconButton>
        </Tooltip>
        <DialogContent dividers>
          <Box component="form" noValidate>
            <Paper sx={{ p: 3 }}>
              <Box
                sx={{
                  display: { xs: "block", lg: "flex" },
                  gap: "1rem",
                  mt: { lg: 3 },
                }}
              >
                <FormControl fullWidth>
                  <Typography sx={{ mb: 2 }}>
                    Password
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                  </Typography>
                  <OutlinedInput
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password..."
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
                    error={
                      formikUserPasswordForm.touched.password &&
                      Boolean(formikUserPasswordForm.errors.password)
                    }
                    value={formikUserPasswordForm.values.password}
                    onChange={formikUserPasswordForm.handleChange}
                    onBlur={formikUserPasswordForm.handleBlur}
                  />
                  <Typography
                    variant="inherit"
                    color="error.main"
                    sx={{ mt: 1 }}
                  >
                    {formikUserPasswordForm.touched.password &&
                      formikUserPasswordForm.errors.password}
                  </Typography>
                </FormControl>
                <FormControl fullWidth>
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
                    placeholder="Enter confirm password..."
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownConfirmPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    error={
                      formikUserPasswordForm.touched.confirmPassword &&
                      Boolean(formikUserPasswordForm.errors.confirmPassword)
                    }
                    value={formikUserPasswordForm.values.confirmPassword}
                    onChange={formikUserPasswordForm.handleChange}
                    onBlur={formikUserPasswordForm.handleBlur}
                  />
                  <Typography
                    variant="inherit"
                    color="error.main"
                    sx={{ mt: 1 }}
                  >
                    {formikUserPasswordForm.touched.confirmPassword &&
                      formikUserPasswordForm.errors.confirmPassword}
                  </Typography>
                </FormControl>
              </Box>
            </Paper>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            size="large"
            sx={{
              color: "#d4bf79",
            }}
            endIcon={<MdCancel size={20} color="#d4bf79" />}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <LoadingButton
            variant="contained"
            size="large"
            loading={loading}
            loadingIndicator={<ButtonLoader />}
            loadingPosition="end"
            endIcon={<IoMdSave size={20} color="#d4bf79" />}
            sx={{ color: "#d4bf79" }}
            onClick={handleSubmit}
          >
            {loading ? (
              <span style={{ color: "#d4bf79" }}>Saving</span>
            ) : (
              <span>Save</span>
            )}
          </LoadingButton>
        </DialogActions>
      </BootstrapDialog>
      {/* End Dialog */}
    </React.Fragment>
  );
};

export default React.memo(ChangeUserPasswordDialog);
