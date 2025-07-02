import React, { useMemo } from "react";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Groups2Icon from "@mui/icons-material/Groups2";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";

//? RBAC
import { IfAnyGranted } from "react-authorization";

//? Get All Data
import GetAllData from "../../../../../apis/GetAllData";

//? Endpoints
const getAllUsersURL = "/users/";

//? ListItemButton Hover State
const listItemButtonSX = {
  "&:hover": {
    bgcolor: "#0B0E14",
    color: "#fff",
    "& .listItemIcon": {
      color: "#fff",
    },
    "& .listItemText": {
      color: "#fff",
    },
  },
};

//? ListItemButton Background Color
const listItemButtonBgColor = {
  bgcolor: "#E7EAF0",
};

const MenuContent = () => {
  //? Destructure useSelector
  const {
    user: { user: currentUser },
  } = useSelector((state) => state.auth);

  //? Destructure useQuery
  const { isLoading: usersLoading, data: usersData } = useQuery({
    queryKey: ["usersData"],
    queryFn: () => GetAllData(`${getAllUsersURL}`),
  });

  console.log("usersData", usersData);

  //? SuperAdmin Role
  const isSuperAdmin = useMemo(
    () =>
      usersData
        ?.filter(
          (user) =>
            user?.id === currentUser?.id &&
            user?.userRole?.roleName === "SuperAdmin"
        )
        .map((user) => user?.userRole?.roleName) ?? [],
    [usersData, currentUser?.id]
  );

  //? Administrator Role
  const isAdministrator = useMemo(
    () =>
      usersData
        ?.filter(
          (user) =>
            user?.id === currentUser?.id &&
            user?.userRole?.roleName === "Administrator"
        )
        .map((user) => user?.userRole?.roleName) ?? [],
    [usersData, currentUser?.id]
  );

  //? User Role
  const isUser = useMemo(
    () =>
      usersData
        ?.filter(
          (user) =>
            user?.id === currentUser?.id && user?.userRole?.roleName === "User"
        )
        .map((user) => user?.userRole?.roleName) ?? [],
    [usersData, currentUser?.id]
  );

  //? SuperAdmin Or Administrator Role
  const isSuperAdminOrisAdmin = isSuperAdmin.concat(...isAdministrator);

  //? SuperAdmin Or Administrator Or User Role
  const isSuperAdminOrisAdminOrisUser = isSuperAdmin.concat(
    ...isAdministrator,
    ...isUser
  );

  if (usersLoading) {
    return (
      <Stack
        sx={{
          flexGrow: 1,
          p: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Loading...</h1>
      </Stack>
    );
  }

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        <IfAnyGranted
          expected={["SuperAdmin", "Administrator", "User"]}
          actual={isSuperAdminOrisAdminOrisUser}
        >
          <NavLink
            to="/dashboard"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {({ isActive }) => (
              <ListItem disablePadding>
                <ListItemButton
                  sx={isActive ? listItemButtonBgColor : listItemButtonSX}
                >
                  <ListItemIcon
                    sx={{ color: `${isActive ? "#0B0E14" : "#7B8396"}` }}
                    className={`${isActive ? "" : "listItemIcon"}`}
                  >
                    <HomeRoundedIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Home"
                    sx={{ color: `${isActive ? "#0B0E14" : "#7B8396"}` }}
                    className={`${isActive ? "" : "listItemText"}`}
                  />
                </ListItemButton>
              </ListItem>
            )}
          </NavLink>
        </IfAnyGranted>
        <IfAnyGranted
          expected={["SuperAdmin", "Administrator", "User"]}
          actual={isSuperAdminOrisAdminOrisUser}
        >
          <NavLink
            to="/all-applicants"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {({ isActive }) => (
              <ListItem disablePadding>
                <ListItemButton
                  sx={isActive ? listItemButtonBgColor : listItemButtonSX}
                >
                  <ListItemIcon
                    sx={{ color: `${isActive ? "#000" : "#7B8396"}` }}
                    className={`${isActive ? "" : "listItemIcon"}`}
                  >
                    <Groups2Icon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Applicants"
                    sx={{ color: `${isActive ? "#000" : "#7B8396"}` }}
                    className={`${isActive ? "" : "listItemText"}`}
                  />
                </ListItemButton>
              </ListItem>
            )}
          </NavLink>
        </IfAnyGranted>
        <IfAnyGranted
          expected={["SuperAdmin", "Administrator", "User"]}
          actual={isSuperAdminOrisAdminOrisUser}
        >
          <NavLink
            to="/all-appointments"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {({ isActive }) => (
              <ListItem disablePadding>
                <ListItemButton
                  sx={isActive ? listItemButtonBgColor : listItemButtonSX}
                >
                  <ListItemIcon
                    sx={{ color: `${isActive ? "#000" : "#7B8396"}` }}
                    className={`${isActive ? "" : "listItemIcon"}`}
                  >
                    <Groups2Icon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Appointments"
                    sx={{ color: `${isActive ? "#000" : "#7B8396"}` }}
                    className={`${isActive ? "" : "listItemText"}`}
                  />
                </ListItemButton>
              </ListItem>
            )}
          </NavLink>
        </IfAnyGranted>
        <IfAnyGranted
          expected={["SuperAdmin", "Administrator", "User"]}
          actual={isSuperAdminOrisAdminOrisUser}
        >
          <NavLink
            to="/all-payments"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {({ isActive }) => (
              <ListItem disablePadding>
                <ListItemButton
                  sx={isActive ? listItemButtonBgColor : listItemButtonSX}
                >
                  <ListItemIcon
                    sx={{ color: `${isActive ? "#000" : "#7B8396"}` }}
                    className={`${isActive ? "" : "listItemIcon"}`}
                  >
                    <Groups2Icon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Payments"
                    sx={{ color: `${isActive ? "#000" : "#7B8396"}` }}
                    className={`${isActive ? "" : "listItemText"}`}
                  />
                </ListItemButton>
              </ListItem>
            )}
          </NavLink>
        </IfAnyGranted>
        <IfAnyGranted
          expected={["SuperAdmin", "Administrator"]}
          actual={isSuperAdminOrisAdmin}
        >
          <NavLink
            to="/all-users"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {({ isActive }) => (
              <ListItem disablePadding>
                <ListItemButton
                  sx={isActive ? listItemButtonBgColor : listItemButtonSX}
                >
                  <ListItemIcon
                    sx={{ color: `${isActive ? "#000" : "#7B8396"}` }}
                    className={`${isActive ? "" : "listItemIcon"}`}
                  >
                    <PeopleRoundedIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Users"
                    sx={{ color: `${isActive ? "#000" : "#7B8396"}` }}
                    className={`${isActive ? "" : "listItemText"}`}
                  />
                </ListItemButton>
              </ListItem>
            )}
          </NavLink>
        </IfAnyGranted>
        <IfAnyGranted
          expected={["SuperAdmin", "Administrator", "User"]}
          actual={isSuperAdminOrisAdminOrisUser}
        >
          <NavLink
            to="/all-reports"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {({ isActive }) => (
              <ListItem disablePadding>
                <ListItemButton
                  sx={isActive ? listItemButtonBgColor : listItemButtonSX}
                >
                  <ListItemIcon
                    sx={{ color: `${isActive ? "#000" : "#7B8396"}` }}
                    className={`${isActive ? "" : "listItemIcon"}`}
                  >
                    <AssignmentRoundedIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Reports"
                    sx={{ color: `${isActive ? "#000" : "#7B8396"}` }}
                    className={`${isActive ? "" : "listItemText"}`}
                  />
                </ListItemButton>
              </ListItem>
            )}
          </NavLink>
        </IfAnyGranted>
      </List>
    </Stack>
  );
};

export default MenuContent;
