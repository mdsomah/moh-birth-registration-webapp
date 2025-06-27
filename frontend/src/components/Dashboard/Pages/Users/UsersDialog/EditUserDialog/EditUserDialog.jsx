import React, { useState, useEffect, useCallback, forwardRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
  TextField,
  Autocomplete,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { MdCancel } from "react-icons/md";
import { IoMdSave } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { LuAsterisk } from "react-icons/lu";
import EditPrimaryPhoneInputField from "../../PhoneInputsField/EditPrimaryPhoneInputField";
import ChangeUserPasswordDialog from "../../ChangeUserPasswordDialog/ChangeUserPasswordDialog";
import ChangeUserPhotoDialog from "../../ChangeUserPhotoDialog/ChangeUserPhotoDialog";
import ButtonLoader from "../../../../../ButtonLoader/ButtonLoader";

//? MUI Dialog Responsive Query
import useMediaQuery from "@mui/material/useMediaQuery";

//? Formik and Yup
import { useFormik } from "formik";
import * as Yup from "yup";
import "yup-phone-lite";

//? Get All Users Roles
import GetAllData from "../../../../../../apis/GetAllData";

//? Update User
import UpdateData from "../../../../../../apis/UpdateData";

//? Endpoints
const getAllUsersRolesURL = "/user/roles/";
const updateUserURL = "/users/";

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

//? Validate Edit User Schema
const ValidateEditUserSchema = Yup.object()
  .shape({
    lastName: Yup.string().required("Last name required!"),
    firstName: Yup.string().required("First name required!"),
    middleName: Yup.string().notRequired(),
    displayName: Yup.string().required("Display name required!"),
    primaryPhoneNumber: Yup.string()
      .phone(null, "Please enter a valid phone number!")
      .required("Primary phone number required!"),
    secondaryPhoneNumber: Yup.string().notRequired(),
    email: Yup.string()
      .required("Email address required!")
      .email("Invalid email address!"),
    userName: Yup.string().required("User name required!"),
    role: Yup.string().required("Please select user role!"),
    userRoleId: Yup.string().notRequired(),
  })
  .required();

const EditUserDialog = ({ row, closeMenu, open, handleClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  //? Destructure useQuery
  const { data: usersRolesData } = useQuery({
    queryKey: ["usersRolesData"],
    queryFn: () => GetAllData(`${getAllUsersRolesURL}`),
  });

  //? User Roles State
  const [roles, setRoles] = useState(null);

  //? Handle Role Change
  const handleRoleChange = (_event, newValue) => {
    formikEditUserForm.setFieldValue("role", newValue);
    setRoles(usersRolesData?.find((role) => role?.roleName === `${newValue}`));
  };

  //? User Object
  const UserOBJ = {
    lastName: () => row?.original?.lastName,
    firstName: () => row?.original?.firstName,
    middleName: () => row?.original?.middleName,
    displayName: () => row?.original?.displayName,
    primaryPhoneNumber: () => row?.original?.primaryPhoneNumber,
    secondaryPhoneNumber: () => row?.original?.secondaryPhoneNumber,
    email: () => row?.original?.email,
    userName: () => row?.original?.userName,
    role: () => row?.original?.role,
    userRoleId: () => (roles !== null ? roles?.id : row?.original?.userRoleId),
  };

  //? Loading State
  const [loading, setLoading] = useState(false);

  //? Change Password Dialog State
  const [openChangePassword, setOpenChangePassword] = useState(false);

  //? Change Password Dialog Functions
  const handleOpenChangePassword = () => {
    handleClose();
    setOpenChangePassword(true);
  };

  const handleCloseChangePassword = useCallback(() => {
    setOpenChangePassword(false);
  }, []);

  //? Change Photo Dialog State
  const [openChangePhoto, setOpenChangePhoto] = useState(false);

  //? Change Photo Dialog Functions
  const handleOpenChangePhoto = () => {
    handleClose();
    setOpenChangePhoto(true);
  };

  const handleCloseChangePhoto = useCallback(() => {
    setOpenChangePhoto(false);
  }, []);

  //? Formik Edit User Form
  const formikEditUserForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      lastName: `${UserOBJ.lastName()}`,
      firstName: `${UserOBJ.firstName()}`,
      middleName: `${UserOBJ.middleName()}`,
      displayName: `${UserOBJ.displayName()}`,
      primaryPhoneNumber: `${UserOBJ.primaryPhoneNumber()}`,
      secondaryPhoneNumber: `${UserOBJ.secondaryPhoneNumber()}`,
      email: `${UserOBJ.email()}`,
      userName: `${UserOBJ.userName()}`,
      role: `${UserOBJ.role()}`,
      userRoleId: `${UserOBJ.userRoleId()}`,
    },
    validationSchema: ValidateEditUserSchema,
    onSubmit: () => {
      updateUser();
    },
  });

  //? Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    formikEditUserForm.handleSubmit();
  };

  //? Handle Cancel
  const handleCancel = () => {
    handleClose();
    formikEditUserForm.resetForm();
  };

  //? User Data
  const UserData = {
    lastName: formikEditUserForm.values.lastName,
    firstName: formikEditUserForm.values.firstName,
    middleName: formikEditUserForm.values.middleName,
    displayName: formikEditUserForm.values.displayName,
    primaryPhoneNumber: formikEditUserForm.values.primaryPhoneNumber,
    secondaryPhoneNumber: formikEditUserForm.values.secondaryPhoneNumber,
    email: formikEditUserForm.values.email,
    userName: formikEditUserForm.values.userName,
    role: formikEditUserForm.values.role,
    userRoleId:
      (formikEditUserForm.values.userRoleId = `${UserOBJ.userRoleId()}`),
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
        queryClient.invalidateQueries({
          queryKey: ["usersData"],
        });
      }
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

  //? Update User
  const updateUser = async () => {
    Mutation.mutate(UserData);
  };

  //? Scroll to error input on form submit
  useEffect(() => {
    if (!formikEditUserForm.isSubmitting) return;
    if (Object.keys(formikEditUserForm.errors).length > 0) {
      document
        .getElementsByName(Object.keys(formikEditUserForm.errors)[0])
        .forEach((error) => error.focus());
    }
  }, [formikEditUserForm]);

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
            Edit User
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
          <Box
            component="form"
            noValidate
            autoComplete="on"
            encType="multipart/form-data"
          >
            <Paper sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 1,
                  mb: 4,
                }}
              >
                <Button variant="outlined" onClick={handleOpenChangePassword}>
                  Change Password
                </Button>
                <Button variant="outlined" onClick={handleOpenChangePhoto}>
                  Change Photo
                </Button>
              </Box>
              <Box
                sx={{
                  display: { xs: "block", lg: "flex" },
                  gap: "1rem",
                  mt: { lg: 3 },
                }}
              >
                <FormControl fullWidth>
                  <Typography>
                    Last Name
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                  </Typography>
                  <TextField
                    margin="normal"
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Enter last name..."
                    variant="outlined"
                    value={formikEditUserForm.values.lastName}
                    onChange={formikEditUserForm.handleChange}
                    error={
                      formikEditUserForm.touched.lastName &&
                      Boolean(formikEditUserForm.errors.lastName)
                    }
                    onBlur={formikEditUserForm.handleBlur}
                  />
                  <Typography variant="inherit" color="error.main">
                    {formikEditUserForm.touched.lastName &&
                      formikEditUserForm.errors.lastName}
                  </Typography>
                </FormControl>
                <FormControl fullWidth>
                  <Typography>
                    First Name
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                  </Typography>
                  <TextField
                    margin="normal"
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Enter first name..."
                    variant="outlined"
                    value={formikEditUserForm.values.firstName}
                    onChange={formikEditUserForm.handleChange}
                    error={
                      formikEditUserForm.touched.firstName &&
                      Boolean(formikEditUserForm.errors.firstName)
                    }
                    onBlur={formikEditUserForm.handleBlur}
                  />
                  <Typography variant="inherit" color="error.main">
                    {formikEditUserForm.touched.firstName &&
                      formikEditUserForm.errors.firstName}
                  </Typography>
                </FormControl>
              </Box>
              <Box
                sx={{
                  display: { xs: "block", lg: "flex" },
                  gap: "1rem",
                  mt: { lg: 3 },
                }}
              >
                <FormControl fullWidth>
                  <Typography>Middle Name</Typography>
                  <TextField
                    margin="normal"
                    id="middleName"
                    name="middleName"
                    type="text"
                    placeholder="Enter middle name..."
                    variant="outlined"
                    value={formikEditUserForm.values.middleName}
                    onChange={formikEditUserForm.handleChange}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <Typography>
                    Display Name
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                  </Typography>
                  <TextField
                    margin="normal"
                    id="displayName"
                    name="displayName"
                    type="text"
                    placeholder="Enter display name..."
                    variant="outlined"
                    value={
                      (formikEditUserForm.values.displayName = `${formikEditUserForm.values.firstName} ${formikEditUserForm.values.middleName} ${formikEditUserForm.values.lastName}`)
                    }
                    onChange={formikEditUserForm.handleChange}
                    error={
                      formikEditUserForm.touched.displayName &&
                      Boolean(formikEditUserForm.errors.displayName)
                    }
                    onBlur={formikEditUserForm.handleBlur}
                  />
                  <Typography variant="inherit" color="error.main">
                    {formikEditUserForm.touched.displayName &&
                      formikEditUserForm.errors.displayName}
                  </Typography>
                </FormControl>
              </Box>
              <Box
                sx={{
                  display: { xs: "block", lg: "flex" },
                  gap: "1rem",
                  mt: { lg: 3 },
                }}
              >
                <FormControl fullWidth>
                  <Typography>
                    Phone Number
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                  </Typography>
                  <EditPrimaryPhoneInputField
                    formikEditUserForm={formikEditUserForm}
                  />
                  <Typography variant="inherit" color="error.main">
                    {formikEditUserForm.touched.primaryPhoneNumber &&
                      formikEditUserForm.errors.primaryPhoneNumber}
                  </Typography>
                </FormControl>
                <FormControl fullWidth>
                  <Typography>Secondary Phone</Typography>
                  <TextField
                    margin="normal"
                    id="secondaryPhoneNumber"
                    name="secondaryPhoneNumber"
                    type="text"
                    placeholder="Enter secondary phone number..."
                    variant="outlined"
                    value={formikEditUserForm.values.secondaryPhoneNumber}
                    onChange={formikEditUserForm.handleChange}
                  />
                </FormControl>
              </Box>
              <Box sx={{ mt: { lg: 3 } }}>
                <FormControl fullWidth>
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
                    type="text"
                    placeholder="Enter email address..."
                    variant="outlined"
                    value={formikEditUserForm.values.email}
                    onChange={formikEditUserForm.handleChange}
                    error={
                      formikEditUserForm.touched.email &&
                      Boolean(formikEditUserForm.errors.email)
                    }
                    onBlur={formikEditUserForm.handleBlur}
                  />
                  <Typography variant="inherit" color="error.main">
                    {formikEditUserForm.touched.email &&
                      formikEditUserForm.errors.email}
                  </Typography>
                </FormControl>
              </Box>
              <Box
                sx={{
                  display: { xs: "block", lg: "flex" },
                  gap: "1rem",
                  mt: { lg: 3 },
                }}
              >
                <FormControl fullWidth>
                  <Typography>
                    User Name
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                  </Typography>
                  <TextField
                    margin="normal"
                    id="userName"
                    name="userName"
                    type="text"
                    placeholder="Enter user name..."
                    variant="outlined"
                    value={formikEditUserForm.values.userName}
                    onChange={formikEditUserForm.handleChange}
                    error={
                      formikEditUserForm.touched.userName &&
                      Boolean(formikEditUserForm.errors.userName)
                    }
                    onBlur={formikEditUserForm.handleBlur}
                  />
                  <Typography variant="inherit" color="error.main">
                    {formikEditUserForm.touched.userName &&
                      formikEditUserForm.errors.userName}
                  </Typography>
                </FormControl>
                <FormControl fullWidth>
                  <Typography sx={{ mb: 2 }}>
                    User Role
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                  </Typography>
                  <Autocomplete
                    id="role"
                    value={formikEditUserForm.values.role}
                    onChange={handleRoleChange}
                    onBlur={formikEditUserForm.handleBlur}
                    onError={
                      formikEditUserForm.touched.role &&
                      Boolean(formikEditUserForm.errors.role)
                    }
                    options={
                      usersRolesData?.map((role) => role?.roleName) ?? []
                    }
                    autoHighlight
                    renderInput={(params) => (
                      <TextField
                        placeholder="Select user role..."
                        {...params}
                      />
                    )}
                  />
                  <Typography
                    variant="inherit"
                    color="error.main"
                    sx={{ mt: 1 }}
                  >
                    {formikEditUserForm.touched.role &&
                      formikEditUserForm.errors.role}
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
            sx={{ color: "#d4bf79" }}
            endIcon={<IoMdSave size={20} color="#d4bf79" />}
            onClick={handleSubmit}
          >
            {loading ? (
              <span style={{ color: "#d4bf79" }}>Saving</span>
            ) : (
              <spa>Save</spa>
            )}
          </LoadingButton>
        </DialogActions>
      </BootstrapDialog>
      {/* End Dialog */}

      {/* Start ChangeUserPasswordDialog */}
      <ChangeUserPasswordDialog
        open={openChangePassword}
        handleClose={handleCloseChangePassword}
        row={row}
        closeMenu={closeMenu}
      />
      {/* End ChangeUserPasswordDialog */}

      {/* Start ChangeUserPhotoDialog */}
      <ChangeUserPhotoDialog
        open={openChangePhoto}
        handleClose={handleCloseChangePhoto}
        row={row}
        closeMenu={closeMenu}
      />
      {/* End ChangeUserPhotoDialog */}
    </React.Fragment>
  );
};

export default React.memo(EditUserDialog);
