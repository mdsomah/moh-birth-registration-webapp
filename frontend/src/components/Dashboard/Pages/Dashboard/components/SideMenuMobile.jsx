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
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer, { drawerClasses } from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import MenuContent from "./MenuContent";
import CardAlert from "./CardAlert";

//? Formik
import { useFormik } from "formik";

//? Get Profile
import GetProfile from "../../../../../apis/GetProfile";

//? Endpoints
const getUserProfileURL = "/users/profile";

//? React Sweet Alert Initialization
const MySwal = withReactContent(Swal);

const SideMenuMobile = ({ open, toggleCloseDrawer }) => {
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

  const logoutCurrentUser = async () => {
    return await MySwal.fire({
      title: "Confirm Logout",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DC143C",
      cancelButtonColor: "#acb5c3",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        return handleLogout();
      }
    });
  };

  //? Logout Current User
  const LogoutCurrentUser = () => {
    toggleCloseDrawer();
    logoutCurrentUser();
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={toggleCloseDrawer}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        [`& .${drawerClasses.paper}`]: {
          backgroundImage: "none",
          backgroundColor: "background.paper",
        },
      }}
    >
      <Stack
        sx={{
          maxWidth: "70dvw",
          height: "100%",
        }}
      >
        <Stack direction="row" sx={{ p: 2, pb: 0, gap: 1 }}>
          <Stack
            direction="row"
            sx={{ gap: 1, alignItems: "center", flexGrow: 1, p: 1 }}
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
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, lineHeight: "16px" }}
            >
              {formikViewUserProfileForm.values?.firstName}{" "}
              {formikViewUserProfileForm.values?.middleName.charAt(0)}{" "}
              {formikViewUserProfileForm.values?.lastName}
            </Typography>
          </Stack>
        </Stack>
        <Divider />
        <Stack sx={{ flexGrow: 1 }}>
          <MenuContent />
          <Divider />
        </Stack>
        <CardAlert formikViewUserProfileForm={formikViewUserProfileForm} />
        <Stack sx={{ p: 2 }}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<LogoutRoundedIcon />}
            onClick={LogoutCurrentUser}
          >
            Logout
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
};

SideMenuMobile.propTypes = {
  open: PropTypes.bool,
  toggleDrawer: PropTypes.func.isRequired,
};

export default SideMenuMobile;
