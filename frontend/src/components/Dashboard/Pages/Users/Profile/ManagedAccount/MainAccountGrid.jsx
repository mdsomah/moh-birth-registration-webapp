import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Paper,
  FormControl,
  TextField,
  Button,
  Autocomplete,
  Avatar,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { LoadingButton } from "@mui/lab";
import { MdCancel } from "react-icons/md";
import { IoMdSave } from "react-icons/io";
import { LuAsterisk } from "react-icons/lu";
import { setUserProfile } from "../../../../../../app/slices/authSlice";
import Copyright from "../../../Dashboard/internals/components/Copyright";
import EditPhoneInputsField from "../EditPhoneInputsField/EditPhoneInputsField";
import ButtonLoader from "../../../../../ButtonLoader/ButtonLoader";
import NavbarBreadcrumbs from "../../../Dashboard/components/NavbarBreadcrumbs";

//? Formik and Yup
import { useFormik } from "formik";
import * as Yup from "yup";
import "yup-phone-lite";

//? React Responsive Media Queries
import { useMediaQuery } from "react-responsive";

//? Get Single User
import GetSingleData from "../../../../../../apis/GetSingleData";

//? Get All Users Roles
import GetAllData from "../../../../../../apis/GetAllData";

//? Update User
import CreateData from "../../../../../../apis/CreateData";

//? Endpoints
const getUserProfileURL = "/users/profile";
const getAllUsersRolesURL = "/user/roles/";
const postUserProfileURL = "/users/profile";

//? Validate My Account Schema
const ValidateMyAccountSchema = Yup.object()
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

const MainUsersGrid = () => {
  //? Tablet or Mobile Responsive Media Queries
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  //? useDispatch
  const dispatch = useDispatch();

  //? useNavigate
  const navigate = useNavigate();

  //? useQueryClient
  const queryClient = useQueryClient();

  //? Destructure useSelector
  const {
    user: { user: currentUser },
    userProfile: currentUserProfile,
    isAuthenticated,
  } = useSelector((state) => state.auth);

  //? Destructure useQuery
  const { data: userProfileData } = useQuery({
    queryKey: ["userProfileData", currentUser?.id],
    queryFn: ({ queryKey }) =>
      GetSingleData(`${getUserProfileURL}/${queryKey[1]}`),
    initialData: () => {
      return queryClient
        .getQueryData(["usersData"])
        ?.find((user) => user.id === currentUser?.id);
    },
    initialDataUpdatedAt: () =>
      queryClient.getQueryState(["usersData"])?.dataUpdatedAt,
    enabled: !!currentUser?.id,
  });

  const { data: usersRolesData } = useQuery({
    queryKey: ["usersRolesData"],
    queryFn: () => GetAllData(`${getAllUsersRolesURL}`),
  });

  //? Handle Close Edit User Profile Function
  const handleCloseEditUserProfile = () => {
    navigate("/dashboard", { replace: true });
  };

  //? User Roles State
  const [roles, setRoles] = useState(null);

  //? Handle Role Change
  const handleRoleChange = (_event, newValue) => {
    formikEditMyAccountForm.setFieldValue("role", newValue);
    setRoles(usersRolesData?.find((role) => role?.roleName === `${newValue}`));
  };

  //? My Account Object
  const MyAccountOBJ = {
    lastName: () => userProfileData?.lastName ?? currentUserProfile?.lastName,
    firstName: () =>
      userProfileData?.firstName ?? currentUserProfile?.firstName,
    middleName: () =>
      userProfileData?.middleName ?? currentUserProfile?.middleName,
    displayName: () =>
      userProfileData?.displayName ?? currentUserProfile?.displayName,
    primaryPhoneNumber: () =>
      userProfileData?.primaryPhoneNumber ??
      currentUserProfile?.primaryPhoneNumber,
    secondaryPhoneNumber: () =>
      userProfileData?.secondaryPhoneNumber ??
      currentUserProfile?.secondaryPhoneNumber,
    email: () => userProfileData?.email ?? currentUserProfile?.email,
    userName: () => userProfileData?.userName ?? currentUserProfile?.userName,
    role: () => userProfileData?.role ?? currentUserProfile?.role,
    userRoleId: () =>
      roles !== null ? roles?.id : userProfileData?.userRoleId,
  };

  //? Loading State
  const [loading, setLoading] = useState(false);

  //? Formik Edit My Account Form
  const formikEditMyAccountForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      lastName: `${MyAccountOBJ.lastName()}`,
      firstName: `${MyAccountOBJ.firstName()}`,
      middleName: `${MyAccountOBJ.middleName()}`,
      displayName: `${MyAccountOBJ.displayName()}`,
      primaryPhoneNumber: `${MyAccountOBJ.primaryPhoneNumber()}`,
      secondaryPhoneNumber: `${MyAccountOBJ.secondaryPhoneNumber()}`,
      email: `${MyAccountOBJ.email()}`,
      userName: `${MyAccountOBJ.userName()}`,
      role: `${MyAccountOBJ.role()}`,
      userRoleId: `${MyAccountOBJ.userRoleId()}`,
    },
    validationSchema: ValidateMyAccountSchema,
    onSubmit: () => {
      updateUser();
    },
  });

  //? Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    formikEditMyAccountForm.handleSubmit();
  };

  //? User Data
  const UserData = {
    lastName: formikEditMyAccountForm.values.lastName,
    firstName: formikEditMyAccountForm.values.firstName,
    middleName: formikEditMyAccountForm.values.middleName,
    displayName: formikEditMyAccountForm.values.displayName,
    primaryPhoneNumber: formikEditMyAccountForm.values.primaryPhoneNumber,
    secondaryPhoneNumber: formikEditMyAccountForm.values.secondaryPhoneNumber,
    email: formikEditMyAccountForm.values.email,
    userName: formikEditMyAccountForm.values.userName,
    role: formikEditMyAccountForm.values.role,
    userRoleId:
      (formikEditMyAccountForm.values.userRoleId = `${MyAccountOBJ.userRoleId()}`),
  };

  console.log(UserData);

  const Mutation = useMutation({
    mutationFn: (newData) => CreateData(`${postUserProfileURL}`, newData),
    onSuccess: (data) => {
      const updatedUserProfile = {
        id: data?.updateProfile?.id,
        lastName: data?.updateProfile?.lastName,
        firstName: data?.updateProfile?.firstName,
        middleName: data?.updateProfile?.middleName,
        displayName: data?.updateProfile?.displayName,
        primaryPhoneNumber: data?.updateProfile?.primaryPhoneNumber,
        secondaryPhoneNumber: data?.updateProfile?.secondaryPhoneNumber,
        email: data?.updateProfile?.email,
        userName: data?.updateProfile?.userName,
        role: data?.updateProfile?.role,
        photo: data?.updateProfile?.photo,
      };
      if (data) {
        dispatch(setUserProfile(updatedUserProfile));
        navigate("/dashboard", { replace: true });
        queryClient.setQueryData(["userProfileData", currentUser?.id], data);
      }
      return data;
    },
    onError: (error) => {
      if (error) {
        return error;
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
    if (!formikEditMyAccountForm.isSubmitting) return;
    if (Object.keys(formikEditMyAccountForm.errors).length > 0) {
      document
        .getElementsByName(Object.keys(formikEditMyAccountForm.errors)[0])
        .forEach((error) => error.focus());
    }
  }, [formikEditMyAccountForm]);

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* cards */}
      {isTabletOrMobile && <NavbarBreadcrumbs />}
      <Typography
        component="h2"
        variant="h6"
        sx={{ mt: { xs: 3, md: 0 }, mb: 2 }}
      >
        Managed Account
      </Typography>
      <Box component="form" noValidate autoComplete="on" sx={{ mb: 16 }}>
        {isAuthenticated
          ? currentUserProfile && (
              <Grid
                container
                spacing={2}
                columns={12}
                sx={{ mb: (theme) => theme.spacing(2) }}
              >
                {/* User Information */}
                <Grid size={{ xs: 12, lg: 9 }}>
                  <Paper sx={{ pt: 2, pb: 3, pl: 2, pr: 2 }}>
                    <Typography
                      sx={{
                        color: "#00A4EF",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        textTransform: "uppercase",
                        mb: 2,
                      }}
                    >
                      Account Information
                    </Typography>
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
                          value={formikEditMyAccountForm.values.lastName}
                          onChange={formikEditMyAccountForm.handleChange}
                          error={
                            formikEditMyAccountForm.touched.lastName &&
                            Boolean(formikEditMyAccountForm.errors.lastName)
                          }
                          onBlur={formikEditMyAccountForm.handleBlur}
                        />
                        <Typography variant="inherit" color="error.main">
                          {formikEditMyAccountForm.touched.lastName &&
                            formikEditMyAccountForm.errors.lastName}
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
                          value={formikEditMyAccountForm.values.firstName}
                          onChange={formikEditMyAccountForm.handleChange}
                          error={
                            formikEditMyAccountForm.touched.firstName &&
                            Boolean(formikEditMyAccountForm.errors.firstName)
                          }
                          onBlur={formikEditMyAccountForm.handleBlur}
                        />
                        <Typography variant="inherit" color="error.main">
                          {formikEditMyAccountForm.touched.firstName &&
                            formikEditMyAccountForm.errors.firstName}
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
                          value={formikEditMyAccountForm.values.middleName}
                          onChange={formikEditMyAccountForm.handleChange}
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
                            (formikEditMyAccountForm.values.displayName = `${formikEditMyAccountForm.values.firstName} ${formikEditMyAccountForm.values.middleName} ${formikEditMyAccountForm.values.lastName}`)
                          }
                          onChange={formikEditMyAccountForm.handleChange}
                          error={
                            formikEditMyAccountForm.touched.displayName &&
                            Boolean(formikEditMyAccountForm.errors.displayName)
                          }
                          onBlur={formikEditMyAccountForm.handleBlur}
                        />
                        <Typography variant="inherit" color="error.main">
                          {formikEditMyAccountForm.touched.displayName &&
                            formikEditMyAccountForm.errors.displayName}
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
                        <EditPhoneInputsField
                          formikEditMyAccountForm={formikEditMyAccountForm}
                        />
                        <Typography variant="inherit" color="error.main">
                          {formikEditMyAccountForm.touched.primaryPhoneNumber &&
                            formikEditMyAccountForm.errors.primaryPhoneNumber}
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
                          value={
                            formikEditMyAccountForm.values.secondaryPhoneNumber
                          }
                          onChange={formikEditMyAccountForm.handleChange}
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
                          value={formikEditMyAccountForm.values.email}
                          onChange={formikEditMyAccountForm.handleChange}
                          error={
                            formikEditMyAccountForm.touched.email &&
                            Boolean(formikEditMyAccountForm.errors.email)
                          }
                          onBlur={formikEditMyAccountForm.handleBlur}
                        />
                        <Typography variant="inherit" color="error.main">
                          {formikEditMyAccountForm.touched.email &&
                            formikEditMyAccountForm.errors.email}
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
                          value={formikEditMyAccountForm.values.userName}
                          onChange={formikEditMyAccountForm.handleChange}
                          error={
                            formikEditMyAccountForm.touched.userName &&
                            Boolean(formikEditMyAccountForm.errors.userName)
                          }
                          onBlur={formikEditMyAccountForm.handleBlur}
                        />
                        <Typography variant="inherit" color="error.main">
                          {formikEditMyAccountForm.touched.userName &&
                            formikEditMyAccountForm.errors.userName}
                        </Typography>
                      </FormControl>
                      {formikEditMyAccountForm.values.role !== "User" && (
                        <FormControl fullWidth>
                          <Typography sx={{ mb: 2 }}>
                            User Role
                            <span>
                              <LuAsterisk size={10} color="#C41E3A" />
                            </span>
                          </Typography>
                          <Autocomplete
                            id="role"
                            value={formikEditMyAccountForm.values.role}
                            onChange={handleRoleChange}
                            onBlur={formikEditMyAccountForm.handleBlur}
                            onError={
                              formikEditMyAccountForm.touched.role &&
                              Boolean(formikEditMyAccountForm.errors.role)
                            }
                            options={
                              usersRolesData?.map((role) => role?.roleName) ??
                              []
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
                            {formikEditMyAccountForm.touched.role &&
                              formikEditMyAccountForm.errors.role}
                          </Typography>
                        </FormControl>
                      )}
                    </Box>
                  </Paper>
                </Grid>
                {/* End User Information */}

                {/* Start User Profile Password & Confirm Password Update */}
                <Grid size={{ xs: 12, lg: 3 }}>
                  {/* Start User Profile Photo */}
                  <Paper sx={{ pt: 2, pb: 5, pl: 2, pr: 2 }}>
                    <Box>
                      <Box sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{
                            color: "#00A4EF",
                            fontWeight: "bold",
                            fontSize: "1rem",
                            textTransform: "uppercase",
                          }}
                        >
                          Profile Photo
                        </Typography>
                        <Box sx={{ mt: 4 }}>
                          {/* Start User Profile Photo */}
                          {userProfileData?.photo !== "" && (
                            <Box sx={{ textAlign: "center" }}>
                              <Avatar
                                src={`/images/${userProfileData?.photo}`}
                                alt={`${currentUserProfile?.firstName} Photo`}
                                sx={{
                                  display: "inline-block",
                                  width: 150,
                                  height: 150,
                                  border: "3px solid #4169E1",
                                }}
                                slotProps={{
                                  img: { loading: "lazy" },
                                }}
                              />
                            </Box>
                          )}

                          {userProfileData?.photo === "" && (
                            <Box sx={{ textAlign: "center" }}>
                              <Avatar
                                sx={{
                                  display: "inline-block",
                                  width: 150,
                                  height: 150,
                                  border: "3px solid #4169E1",
                                }}
                                slotProps={{
                                  img: { loading: "lazy" },
                                }}
                              >
                                <Typography
                                  sx={{
                                    position: "relative",
                                    top: 30,
                                    fontSize: "3rem",
                                  }}
                                >
                                  {`${formikEditMyAccountForm.values?.firstName.charAt(
                                    0
                                  )}${formikEditMyAccountForm.values?.middleName.charAt(
                                    0
                                  )}${formikEditMyAccountForm.values?.lastName.charAt(
                                    0
                                  )}`}
                                </Typography>
                              </Avatar>
                            </Box>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </Paper>
                  {/* End User Profile Photo */}
                </Grid>
                {/* End User Profile Password & Confirm Password Update */}
              </Grid>
            )
          : null}
      </Box>
      <hr style={{ marginTop: 30 }} />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Box>
          <Button
            variant="contained"
            size="large"
            sx={{
              mt: 3,
              mb: 2,
              mr: 2,
              bgcolor: "#acb5c3",
              color: "#d4bf79",
            }}
            endIcon={<MdCancel size={20} color="#d4bf79" />}
            onClick={() => {
              handleCloseEditUserProfile();
            }}
          >
            Cancel
          </Button>
          <LoadingButton
            variant="contained"
            size="large"
            loading={loading}
            loadingIndicator={<ButtonLoader />}
            onClick={handleSubmit}
            loadingPosition="end"
            endIcon={<IoMdSave size={20} color="#d4bf79" />}
            sx={{ mt: 3, mb: 2, color: "#d4bf79" }}
          >
            {loading ? (
              <span style={{ color: "#d4bf79" }}>Saving</span>
            ) : (
              <spa>Save</spa>
            )}
          </LoadingButton>
        </Box>
      </Box>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
};

export default MainUsersGrid;
