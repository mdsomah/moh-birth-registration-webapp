import React, { useState, useEffect, forwardRef } from "react";
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
import AddPrimaryPhoneInputField from "../../PhoneInputsField/AddPrimaryPhoneInputField";
import ButtonLoader from "../../../../../ButtonLoader/ButtonLoader";

//? MUI Dialog Responsive Query
import useMediaQuery from "@mui/material/useMediaQuery";

//? Formik and Yup
import { useFormik } from "formik";
import * as Yup from "yup";
import "yup-phone-lite";

//? Create User
import CreateData from "../../../../../../apis/CreateData";

//? Get All Users Roles
import GetAllData from "../../../../../../apis/GetAllData";

//? Endpoints
const postUserURL = "/users/create-new-user";
const getAllUsersRolesURL = "/user/roles/";

//? Dialog Transition
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//? Dialog Styles
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  width: "100%",
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

//? User Photo Upload Formats
const SUPPORTED_FORMATS = ["image/jpeg, image/jpg, image/png, image/jif"];

//? User Photo Upload Size
const FILE_SIZE = 1024 * 1024 * 25;

//? Validate User Schema
const ValidateUserSchema = Yup.object()
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
    password: Yup.string()
      .required("Password required!")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    confirmPassword: Yup.string()
      .required("Confirm password required!")
      .oneOf([Yup.ref("password"), null], "Confirm password does not match!"),
    photo: Yup.mixed()
      .notRequired()
      .test(
        "fileFormat",
        "File type not supported! Supported types: (.jpeg, .jpg, .png or .jif)",
        (value) =>
          !value || ((value) => value && SUPPORTED_FORMATS.includes(value.type))
      )
      .test(
        "fileSize",
        "File is too large! Supported size: (2MB)",
        (value) => !value || (value && value.size <= FILE_SIZE)
      ),
  })
  .required();

const AddUserDialog = ({ open, handleClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  //? Destructure useQuery
  const { data: usersRolesData } = useQuery({
    queryKey: ["usersRolesData"],
    queryFn: () => GetAllData(`${getAllUsersRolesURL}`),
  });

  //? User Object
  const UserOBJ = {
    userRoleId: () => roles?.id,
  };

  //? User Roles State
  const [roles, setRoles] = useState({});

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

  //? Handle Role Change
  const handleRoleChange = (_event, newValue) => {
    formikAddUserForm.setFieldValue("role", newValue);
    setRoles(usersRolesData?.find((role) => role?.roleName === `${newValue}`));
  };

  //? Loading State
  const [loading, setLoading] = useState(false);

  //? Formik Add User Form
  const formikAddUserForm = useFormik({
    initialValues: {
      lastName: "",
      firstName: "",
      middleName: "",
      displayName: "",
      primaryPhoneNumber: "",
      secondaryPhoneNumber: "",
      email: "",
      userName: "",
      role: "",
      password: "",
      confirmPassword: "",
      photo: "",
      userRoleId: "",
    },
    validationSchema: ValidateUserSchema,
    onSubmit: () => {
      createUser();
    },
  });

  //? Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    formikAddUserForm.handleSubmit();
  };

  //? Handle Cancel
  const handleCancel = () => {
    handleClose();
    formikAddUserForm.resetForm();
  };

  //? User Data
  const UserData = {
    lastName: formikAddUserForm.values.lastName,
    firstName: formikAddUserForm.values.firstName,
    middleName: formikAddUserForm.values.middleName,
    displayName: formikAddUserForm.values.displayName,
    primaryPhoneNumber: formikAddUserForm.values.primaryPhoneNumber,
    secondaryPhoneNumber: formikAddUserForm.values.secondaryPhoneNumber,
    email: formikAddUserForm.values.email,
    userName: formikAddUserForm.values.userName,
    role: formikAddUserForm.values.role,
    password: formikAddUserForm.values.password,
    confirmPassword: formikAddUserForm.values.confirmPassword,
    photo: formikAddUserForm.values.photo,
    userRoleId: (formikAddUserForm.values.userRoleId =
      UserOBJ.userRoleId() === undefined ? "" : `${UserOBJ.userRoleId()}`),
  };

  console.log(UserData);

  //? useQueryClient
  const queryClient = useQueryClient();

  const Mutation = useMutation({
    mutationFn: (newData) => CreateData(`${postUserURL}`, newData),
    onSuccess: (data) => {
      if (data) {
        handleClose();
        formikAddUserForm.resetForm();
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

  //? Create User
  const createUser = async () => {
    //? Destructure UserData
    const {
      lastName,
      firstName,
      middleName,
      displayName,
      primaryPhoneNumber,
      secondaryPhoneNumber,
      email,
      userName,
      role,
      password,
      confirmPassword,
      photo,
      userRoleId,
    } = UserData;

    //? Create FormData
    const formData = new FormData();
    formData.append("lastName", lastName);
    formData.append("firstName", firstName);
    formData.append("middleName", middleName);
    formData.append("displayName", displayName);
    formData.append("primaryPhoneNumber", primaryPhoneNumber);
    formData.append("secondaryPhoneNumber", secondaryPhoneNumber);
    formData.append("email", email);
    formData.append("userName", userName);
    formData.append("role", role);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("photo", photo);
    formData.append("userRoleId", userRoleId);

    Mutation.mutate(formData);
  };

  //? Scroll to error input on form submit
  useEffect(() => {
    if (!formikAddUserForm.isSubmitting) return;
    if (Object.keys(formikAddUserForm.errors).length > 0) {
      document
        .getElementsByName(Object.keys(formikAddUserForm.errors)[0])
        .forEach((error) => error.focus());
    }
  }, [formikAddUserForm]);

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
            Add New User
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
            <Paper elevation={0} sx={{ padding: 2 }}>
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
                    value={formikAddUserForm.values.lastName}
                    onChange={formikAddUserForm.handleChange}
                    error={
                      formikAddUserForm.touched.lastName &&
                      Boolean(formikAddUserForm.errors.lastName)
                    }
                    onBlur={formikAddUserForm.handleBlur}
                  />
                  <Typography variant="inherit" color="error.main">
                    {formikAddUserForm.touched.lastName &&
                      formikAddUserForm.errors.lastName}
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
                    value={formikAddUserForm.values.firstName}
                    onChange={formikAddUserForm.handleChange}
                    error={
                      formikAddUserForm.touched.firstName &&
                      Boolean(formikAddUserForm.errors.firstName)
                    }
                    onBlur={formikAddUserForm.handleBlur}
                  />
                  <Typography variant="inherit" color="error.main">
                    {formikAddUserForm.touched.firstName &&
                      formikAddUserForm.errors.firstName}
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
                    value={formikAddUserForm.values.middleName}
                    onChange={formikAddUserForm.handleChange}
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
                      (formikAddUserForm.values.displayName = `${formikAddUserForm.values.firstName} ${formikAddUserForm.values.middleName} ${formikAddUserForm.values.lastName}`)
                    }
                    onChange={formikAddUserForm.handleChange}
                    error={
                      formikAddUserForm.touched.displayName &&
                      Boolean(formikAddUserForm.errors.displayName)
                    }
                    onBlur={formikAddUserForm.handleBlur}
                  />
                  <Typography variant="inherit" color="error.main">
                    {formikAddUserForm.touched.displayName &&
                      formikAddUserForm.errors.displayName}
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
                  <AddPrimaryPhoneInputField
                    formikAddUserForm={formikAddUserForm}
                  />
                  <Typography variant="inherit" color="error.main">
                    {formikAddUserForm.touched.primaryPhoneNumber &&
                      formikAddUserForm.errors.primaryPhoneNumber}
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
                    value={formikAddUserForm.values.secondaryPhoneNumber}
                    onChange={formikAddUserForm.handleChange}
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
                    value={formikAddUserForm.values.email}
                    onChange={formikAddUserForm.handleChange}
                    error={
                      formikAddUserForm.touched.email &&
                      Boolean(formikAddUserForm.errors.email)
                    }
                    onBlur={formikAddUserForm.handleBlur}
                  />
                  <Typography variant="inherit" color="error.main">
                    {formikAddUserForm.touched.email &&
                      formikAddUserForm.errors.email}
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
                    value={formikAddUserForm.values.userName}
                    onChange={formikAddUserForm.handleChange}
                    error={
                      formikAddUserForm.touched.userName &&
                      Boolean(formikAddUserForm.errors.userName)
                    }
                    onBlur={formikAddUserForm.handleBlur}
                  />
                  <Typography variant="inherit" color="error.main">
                    {formikAddUserForm.touched.userName &&
                      formikAddUserForm.errors.userName}
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
                    value={formikAddUserForm.values.role}
                    onChange={handleRoleChange}
                    onBlur={formikAddUserForm.handleBlur}
                    onError={
                      formikAddUserForm.touched.role &&
                      Boolean(formikAddUserForm.errors.role)
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
                    {formikAddUserForm.touched.role &&
                      formikAddUserForm.errors.role}
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
                      formikAddUserForm.touched.password &&
                      Boolean(formikAddUserForm.errors.password)
                    }
                    value={formikAddUserForm.values.password}
                    onChange={formikAddUserForm.handleChange}
                    onBlur={formikAddUserForm.handleBlur}
                  />
                  <Typography
                    variant="inherit"
                    color="error.main"
                    sx={{ mt: 1 }}
                  >
                    {formikAddUserForm.touched.password &&
                      formikAddUserForm.errors.password}
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
                      formikAddUserForm.touched.confirmPassword &&
                      Boolean(formikAddUserForm.errors.confirmPassword)
                    }
                    value={formikAddUserForm.values.confirmPassword}
                    onChange={formikAddUserForm.handleChange}
                    onBlur={formikAddUserForm.handleBlur}
                  />
                  <Typography
                    variant="inherit"
                    color="error.main"
                    sx={{ mt: 1 }}
                  >
                    {formikAddUserForm.touched.confirmPassword &&
                      formikAddUserForm.errors.confirmPassword}
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
              <spa>Save</spa>
            )}
          </LoadingButton>
        </DialogActions>
      </BootstrapDialog>
      {/* End Dialog */}
    </React.Fragment>
  );
};

export default React.memo(AddUserDialog);
