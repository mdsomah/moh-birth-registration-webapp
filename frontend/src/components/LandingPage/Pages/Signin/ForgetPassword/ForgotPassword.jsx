import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import { LoadingButton } from "@mui/lab";
import { MdCancel } from "react-icons/md";
import { BiMailSend } from "react-icons/bi";
import { LuAsterisk } from "react-icons/lu";
import ButtonLoader from "../../../../ButtonLoader/ButtonLoader";

//? Formik and Yup
import { useFormik } from "formik";
import * as Yup from "yup";

//? Update Data
import CreateData from "../../../../../apis/CreateData";

//? Endpoints
const forgetPasswordURL = "/auth/forget-password";

//? Forget Password Schema
const validateForgetPasswordSchema = Yup.object()
  .shape({
    email: Yup.string()
      .required("Email address required!")
      .email("Invalid email address!"),
  })
  .required();

const ForgotPassword = ({ open, handleClose }) => {
  //? Loading State
  const [loading, setLoading] = useState(false);

  //? Formik Forget Password Form
  const formikForgetPasswordForm = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validateForgetPasswordSchema,
    onSubmit: () => {
      handleForgetPassword();
    },
  });

  //? Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    formikForgetPasswordForm.handleSubmit();
  };

  //? Handle Cancel
  const handleCancel = () => {
    handleClose();
    formikForgetPasswordForm.resetForm();
  };

  //? Forget Password Data
  const ForgetPasswordData = {
    email: formikForgetPasswordForm.values.email,
  };

  console.log(ForgetPasswordData);

  //? useQueryClient
  const queryClient = useQueryClient();

  const Mutation = useMutation({
    mutationFn: (newData) => CreateData(`${forgetPasswordURL}`, newData),
    onSuccess: (data) => {
      handleCancel();
      queryClient.invalidateQueries({
        queryKey: ["usersData"],
      });
      return data;
    },
    onError: (error) => {
      if (error) {
        handleClose();
      }
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

  //? Handle Forget Password
  const handleForgetPassword = () => {
    Mutation.mutate(ForgetPasswordData);
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      slotProps={{
        paper: {
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            handleCancel();
          },
          sx: { backgroundImage: "none" },
        },
      }}
    >
      <DialogTitle>Forget Your Password?</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
      >
        <DialogContentText>
          Enter your account&apos;s email address, and we&apos;ll send you a
          link to reset your password.
        </DialogContentText>
        <Typography>
          Email Address
          <span>
            <LuAsterisk size={10} color="#C41E3A" />
          </span>
        </Typography>
        <OutlinedInput
          autoFocus
          required
          margin="dense"
          id="email"
          name="email"
          label="Email address"
          placeholder="Enter email address..."
          type="email"
          fullWidth
          value={formikForgetPasswordForm.values.email}
          onChange={formikForgetPasswordForm.handleChange}
          onBlur={formikForgetPasswordForm.handleBlur}
          error={
            formikForgetPasswordForm.touched.email &&
            Boolean(formikForgetPasswordForm.errors.email)
          }
        />
        <Typography variant="inherit" color="error.main">
          {formikForgetPasswordForm.touched.email &&
            formikForgetPasswordForm.errors.email}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button
          variant="contained"
          size="large"
          sx={{
            color: "#fff",
          }}
          endIcon={<MdCancel size={20} color="#fff" />}
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
          endIcon={<BiMailSend size={20} color="#fff" />}
          sx={{ color: "#fff" }}
          onClick={handleSubmit}
        >
          {loading ? (
            <span style={{ color: "#fff" }}>Sending</span>
          ) : (
            <spa>Send</spa>
          )}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

ForgotPassword.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ForgotPassword;
