import React, { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import {
  removeToken,
  removeRememberMeToken,
  removeUserProfile,
} from "../../../../../app/slices/authSlice";
import { removeAPIToken } from "../../../../../app/slices/nirAPIsTokenSlice";
import { authActions } from "../../../../../app/actions/authActions";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MenuContent from "./MenuContent";
import OptionsMenu from "./OptionsMenu";

//? Formik
import { useFormik } from "formik";

//? NSA Logo
import logo from "../../../../../images/NSA_Logo/NSA-LOGO.png";

//? Get Profile
import GetProfile from "../../../../../apis/GetProfile";

//? Endpoints
const getUserProfileURL = "/users/profile";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
  },
});

const SideMenu = () => {
  //? Destructure authActions
  const { logout } = authActions;

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

  console.log("userProfileData", userProfileData);

  //? My Account Object
  const MyAccountOBJ = {
    lastName: () => userProfileData?.lastName ?? currentUserProfile?.lastName,
    firstName: () =>
      userProfileData?.firstName ?? currentUserProfile?.firstName,
    middleName: () =>
      userProfileData?.middleName ?? currentUserProfile?.middleName,
    displayName: () =>
      userProfileData?.displayName ?? currentUserProfile?.displayName,
    role: () => userProfileData?.role ?? currentUserProfile?.role,
    email: () => userProfileData?.email ?? currentUserProfile?.email,
  };

  //? Formik View User Profile Form
  const formikViewUserProfileForm = useFormik({
    initialValues: {
      lastName: `${MyAccountOBJ.lastName()}`,
      firstName: `${MyAccountOBJ.firstName()}`,
      middleName: `${MyAccountOBJ.middleName()}`,
      displayName: `${MyAccountOBJ.displayName()}`,
      role: `${MyAccountOBJ.role()}`,
      email: `${MyAccountOBJ.email()}`,
    },
  });

  const Mutation = useMutation({
    mutationFn: () => dispatch(logout()),
    onSuccess: (data) => {
      if (data) {
        dispatch(removeToken());
        dispatch(removeRememberMeToken());
        // localStorage.removeItem("rememberMe_token");
        dispatch(removeAPIToken());
        dispatch(removeUserProfile());
        navigate("/", { replace: true });
        navigate(0);
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

  //? Logout Current User
  const handleLogout = useCallback(() => {
    Mutation.mutate();
  }, [Mutation]);

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: "background.paper",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          mt: "calc(var(--template-frame-height, 0px) + 4px)",
          p: 1.5,
        }}
      >
        <Link
          to="/dashboard"
          style={{
            textDecoration: "none",
            color: "inherit",
            cursor: "pointer",
          }}
        >
          <Avatar
            src={logo}
            alt="NSA Logo"
            sx={{ width: 100, height: 100 }}
            slotProps={{
              img: { loading: "lazy" },
            }}
          />
        </Link>
      </Box>
      <Divider />
      <Box
        sx={{
          overflow: "auto",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <MenuContent />
      </Box>
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: "center",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        {isAuthenticated
          ? currentUserProfile &&
            userProfileData?.photo !== "" && (
              <Avatar
                sizes="small"
                alt={`${formikViewUserProfileForm.values?.firstName} Photo`}
                src={`/images/${userProfileData?.photo}`}
                sx={{ width: 36, height: 36 }}
              />
            )
          : null}

        {isAuthenticated
          ? currentUserProfile &&
            userProfileData?.photo === "" && (
              // <Avatar
              //   sizes="small"
              //   alt={`${formikViewUserProfileForm.values?.firstName} Photo`}
              //   src={formikViewUserProfileForm.values?.photo}
              //   sx={{ width: 36, height: 36 }}
              // />
              <Avatar
                sx={{
                  display: "inline-block",
                  width: 36,
                  height: 36,
                }}
              >
                <Typography
                  sx={{
                    // position: "relative",
                    // top: 10,
                    textAlign: "center",
                    fontSize: "1rem",
                  }}
                >
                  {`${userProfileData?.firstName.charAt(0)}`}
                </Typography>
              </Avatar>
            )
          : null}
        <Box sx={{ mr: "auto" }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, lineHeight: "16px" }}
          >
            {formikViewUserProfileForm.values?.firstName}{" "}
            {formikViewUserProfileForm.values?.middleName.charAt(0)}{" "}
            {formikViewUserProfileForm.values?.lastName}
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            {formikViewUserProfileForm.values?.role}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {formikViewUserProfileForm.values?.email}
          </Typography>
        </Box>
        <OptionsMenu handleLogout={handleLogout} />
      </Stack>
    </Drawer>
  );
};

export default SideMenu;
