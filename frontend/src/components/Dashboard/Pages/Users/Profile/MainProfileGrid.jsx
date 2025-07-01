import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  Avatar,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Button,
  Badge,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { LoadingButton } from "@mui/lab";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FaCamera } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { IoMdSave } from "react-icons/io";
import { LuAsterisk } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import { SiMaildotru } from "react-icons/si";
import { FaMobileScreenButton } from "react-icons/fa6";
import Copyright from "../../Dashboard/internals/components/Copyright";
import EditPhotoUpload from "./EditPhotoUpload/EditPhotoUpload";
import ButtonLoader from "../../../../ButtonLoader/ButtonLoader";
import NavbarBreadcrumbs from "../../Dashboard/components/NavbarBreadcrumbs";
import { decrypt } from "../../../../../utils/decrypt";

//? Formik and Yup
import { useFormik } from "formik";
import * as Yup from "yup";

//? React Responsive Media Queries
import { useMediaQuery } from "react-responsive";

//? Get Profile
import GetProfile from "../../../../../apis/GetProfile";

//? Update Password
import CreateData from "../../../../../apis/CreateData";

//? Endpoints
const getUserProfileURL = "/users/profile";
const postUserProfilePasswordURL = "/users/profile/password";

//? Validate User Profile Password Schema
const ValidateUserProfilePasswordSchema = Yup.object()
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

const MainProfileGrid = () => {
  //? Tablet or Mobile Responsive Media Queries
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

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
    queryFn: () => GetProfile(`${getUserProfileURL}`),
    initialData: () => {
      return queryClient
        .getQueryData(["usersData"])
        ?.find((user) => user.id === currentUser?.id);
    },
    initialDataUpdatedAt: () =>
      queryClient.getQueryState(["usersData"])?.dataUpdatedAt,
    enabled: !!currentUser?.id,
  });

  //? Decrypt userProfileData
  const decryptedUser = decrypt(
    userProfileData,
    process.env.REACT_APP_ENCRYPTION_KEY,
    process.env.REACT_APP_ENCRYPTION_IV
  );

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

  //? Photo Edit State
  const [openPhoto, setOpenPhoto] = useState(false);

  //? Photo Dialog Functions
  const handleOpenPhoto = () => {
    setOpenPhoto(true);
  };

  const handleClosePhoto = useCallback(() => {
    setOpenPhoto(false);
  }, []);

  //? My Account Object
  const MyAccountOBJ = {
    lastName: () => decryptedUser?.lastName ?? currentUserProfile?.lastName,
    firstName: () => decryptedUser?.firstName ?? currentUserProfile?.firstName,
    middleName: () =>
      decryptedUser?.middleName ?? currentUserProfile?.middleName,
    displayName: () =>
      decryptedUser?.displayName ?? currentUserProfile?.displayName,
    role: () => decryptedUser?.role ?? currentUserProfile?.role,
    email: () => decryptedUser?.email ?? currentUserProfile?.email,
    primaryPhoneNumber: () =>
      decryptedUser?.primaryPhoneNumber ??
      currentUserProfile?.primaryPhoneNumber,
    secondaryPhoneNumber: () =>
      decryptedUser?.secondaryPhoneNumber ??
      currentUserProfile?.secondaryPhoneNumber,
  };

  //? Formik View User Profile Form
  const formikViewUserProfileForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      lastName: `${MyAccountOBJ.lastName()}`,
      firstName: `${MyAccountOBJ.firstName()}`,
      middleName: `${MyAccountOBJ.middleName()}`,
      displayName: `${MyAccountOBJ.displayName()}`,
      role: `${MyAccountOBJ.role()}`,
      email: `${MyAccountOBJ.email()}`,
      primaryPhoneNumber: `${MyAccountOBJ.primaryPhoneNumber()}`,
      secondaryPhoneNumber: `${MyAccountOBJ.secondaryPhoneNumber()}`,
    },
  });

  //? Formik User Profile Password Form
  const formikUserProfilePasswordForm = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: ValidateUserProfilePasswordSchema,
    onSubmit: () => {
      updateUserProfilePassword();
    },
  });

  //? Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    formikUserProfilePasswordForm.handleSubmit();
  };

  //? Handle Close User Profile Function
  const handleCloseUserProfile = () => {
    navigate("/dashboard", { replace: true });
    formikUserProfilePasswordForm.resetForm();
  };

  //? User Data
  const UserData = {
    password: formikUserProfilePasswordForm.values.password,
    confirmPassword: formikUserProfilePasswordForm.values.confirmPassword,
  };

  console.log(UserData);

  const Mutation = useMutation({
    mutationFn: (newData) =>
      CreateData(`${postUserProfilePasswordURL}`, newData),
    onSuccess: (data) => {
      if (data) {
        navigate("/dashboard", { replace: true });
        formikUserProfilePasswordForm.resetForm();
        queryClient.setQueryData(["userProfileData", currentUser?.id], data);
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

  //? Update User Profile Password
  const updateUserProfilePassword = async () => {
    Mutation.mutate(UserData);
  };

  //? Scroll to error input on form submit
  useEffect(() => {
    if (!formikUserProfilePasswordForm.isSubmitting) return;
    if (Object.keys(formikUserProfilePasswordForm.errors).length > 0) {
      document
        .getElementsByName(Object.keys(formikUserProfilePasswordForm.errors)[0])
        .forEach((error) => error.focus());
    }
  }, [formikUserProfilePasswordForm]);

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* cards */}
      {isTabletOrMobile && <NavbarBreadcrumbs />}
      <Typography
        component="h2"
        variant="h6"
        sx={{ mt: { xs: 3, md: 0 }, mb: 2 }}
      >
        My Profile
      </Typography>
      <Box component="form" noValidate sx={{ mb: 16 }}>
        <Grid
          container
          spacing={2}
          columns={12}
          sx={{ mb: (theme) => theme.spacing(2) }}
        >
          {/* Start Profile Photo Update */}
          {isAuthenticated
            ? currentUserProfile && (
                <Grid size={{ xs: 12, lg: 4 }}>
                  <Paper sx={{ pt: 2, pb: 3, pl: 2, pr: 2 }}>
                    <Box sx={{ mb: 3, textAlign: "center" }}>
                      <Typography
                        sx={{
                          color: "#00A4EF",
                          fontWeight: "bold",
                          fontSize: "1rem",
                          textTransform: "uppercase",
                        }}
                      >
                        Profile
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "block",
                        textAlign: "center",
                      }}
                    >
                      {userProfileData?.photo !== "" && (
                        <Badge
                          overlap="circular"
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          badgeContent={
                            <Tooltip
                              title="Change Photo"
                              placement="right"
                              arrow
                            >
                              <IconButton onClick={handleOpenPhoto}>
                                <FaCamera size={30} />
                              </IconButton>
                            </Tooltip>
                          }
                        >
                          <Avatar
                            src={`/images/${userProfileData?.photo}`}
                            alt={`${formikViewUserProfileForm.values?.firstName} Photo`}
                            sx={{
                              display: "inline-block",
                              width: 200,
                              height: 200,
                              border: "3px solid #4169E1",
                            }}
                            slotProps={{
                              img: { loading: "lazy" },
                            }}
                          />
                        </Badge>
                      )}

                      {userProfileData?.photo === "" && (
                        <Badge
                          overlap="circular"
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          badgeContent={
                            <Tooltip
                              title="Change Photo"
                              placement="right"
                              arrow
                            >
                              <IconButton onClick={handleOpenPhoto}>
                                <FaCamera size={30} />
                              </IconButton>
                            </Tooltip>
                          }
                        >
                          <Avatar
                            sx={{
                              display: "inline-block",
                              width: 200,
                              height: 200,
                              border: "3px solid #4169E1",
                            }}
                          >
                            <Typography
                              sx={{
                                position: "relative",
                                top: 50,
                                fontSize: "3rem",
                              }}
                            >
                              {`${formikViewUserProfileForm.values?.firstName.charAt(
                                0
                              )}${formikViewUserProfileForm.values?.middleName.charAt(
                                0
                              )}${formikViewUserProfileForm.values?.lastName.charAt(
                                0
                              )}`}
                            </Typography>
                          </Avatar>
                        </Badge>
                      )}

                      {/* {userProfileData?.photo === "" && (
                        <Avatar
                          sx={{
                            display: "inline-block",
                            width: 200,
                            height: 200,
                            border: "3px solid #4169E1",
                          }}
                        >
                          <Typography
                            sx={{
                              position: "relative",
                              top: 50,
                              fontSize: "3rem",
                            }}
                          >
                            {`${formikViewUserProfileForm.values?.firstName.charAt(
                              0
                            )}${formikViewUserProfileForm.values?.middleName.charAt(
                              0
                            )}${formikViewUserProfileForm.values?.lastName.charAt(
                              0
                            )}`}
                          </Typography>
                        </Avatar>
                      )} */}
                      <Box sx={{ mt: 3 }}>
                        <Typography
                          sx={{
                            color: "#d4bf79",
                            fontWeight: 600,
                            fontSize: "1.6rem",
                          }}
                        >
                          {formikViewUserProfileForm.values?.firstName}{" "}
                          {formikViewUserProfileForm.values?.middleName.charAt(
                            0
                          )}{" "}
                          {formikViewUserProfileForm.values?.lastName}
                        </Typography>
                        <Typography sx={{ color: "#111", fontWeight: 600 }}>
                          <FaUser color="#acb5c3" />{" "}
                          {formikViewUserProfileForm.values?.role}
                        </Typography>
                        <Typography sx={{ color: "#787878", fontSize: "1rem" }}>
                          <SiMaildotru color="#acb5c3" />{" "}
                          {formikViewUserProfileForm.values?.email}
                        </Typography>
                        {formikViewUserProfileForm.values
                          ?.secondaryPhoneNumber === "" ? (
                          <Typography
                            sx={{ color: "#787878", fontSize: "1rem" }}
                          >
                            <FaMobileScreenButton color="#acb5c3" />{" "}
                            {
                              formikViewUserProfileForm.values
                                ?.primaryPhoneNumber
                            }
                          </Typography>
                        ) : (
                          <Typography
                            sx={{ color: "#787878", fontSize: "1rem" }}
                          >
                            <FaMobileScreenButton color="#acb5c3" />{" "}
                            {
                              formikViewUserProfileForm.values
                                ?.primaryPhoneNumber
                            }{" "}
                            /{" "}
                            {
                              formikViewUserProfileForm.values
                                ?.secondaryPhoneNumber
                            }
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              )
            : null}
          {/* End Profile Photo Update  */}

          {/* Start User Profile Password & Confirm Password Update */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Paper sx={{ pt: 2, pb: 3, pl: 2, pr: 2 }}>
              <Box sx={{ mb: 3, textAlign: "center" }}>
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
                <Box sx={{ mt: 3 }}>
                  <FormControl
                    required
                    variant="outlined"
                    sx={{ width: { lg: 400, xs: "100%" }, mt: 1 }}
                  >
                    <Typography sx={{ mb: 1 }}>
                      Password
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
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      value={formikUserProfilePasswordForm.values.password}
                      onChange={formikUserProfilePasswordForm.handleChange}
                      onBlur={formikUserProfilePasswordForm.handleBlur}
                      error={
                        formikUserProfilePasswordForm.touched.password &&
                        Boolean(formikUserProfilePasswordForm.errors.password)
                      }
                    />
                    <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikUserProfilePasswordForm.touched.password &&
                        formikUserProfilePasswordForm.errors.password}
                    </Typography>
                  </FormControl>
                  <FormControl
                    required
                    variant="outlined"
                    sx={{ width: { lg: 400, xs: "100%" }, mt: 2 }}
                  >
                    <Typography sx={{ mb: 1 }}>
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
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      value={
                        formikUserProfilePasswordForm.values.confirmPassword
                      }
                      onChange={formikUserProfilePasswordForm.handleChange}
                      onBlur={formikUserProfilePasswordForm.handleBlur}
                      error={
                        formikUserProfilePasswordForm.touched.confirmPassword &&
                        Boolean(
                          formikUserProfilePasswordForm.errors.confirmPassword
                        )
                      }
                    />
                    <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikUserProfilePasswordForm.touched.confirmPassword &&
                        formikUserProfilePasswordForm.errors.confirmPassword}
                    </Typography>
                  </FormControl>
                </Box>
              </Box>
            </Paper>
          </Grid>
          {/* End User Profile Password & Confirm Password Update */}
        </Grid>
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
              handleCloseUserProfile();
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

      {/* Start EditPhotoUpload Dialog */}
      <EditPhotoUpload
        open={openPhoto}
        setOpenPhoto={setOpenPhoto}
        handleClose={handleClosePhoto}
      />
      {/* End EditPhotoUpload Dialog */}
    </Box>
  );
};

export default MainProfileGrid;
