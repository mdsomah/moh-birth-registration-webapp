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
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
// import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
// import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
// import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
// import HelpRoundedIcon from "@mui/icons-material/HelpRounded";

//? RBAC
import { IfAnyGranted } from "react-authorization";

//? Get All Data
import GetAllData from "../../../../../apis/GetAllData";

//? Endpoints
const getAllUsersURL = "/users/";

// const mainListItems = [
//   { text: "Home", icon: <HomeRoundedIcon />, link: "/dashboard" },
//   { text: "Analytics", icon: <AnalyticsRoundedIcon />, link: "/analytics" },
//   { text: "Queries", icon: <PeopleRoundedIcon />, link: "/all-queries" },
//   { text: "Users", icon: <PeopleRoundedIcon />, link: "/all-users" },
//   {
//     text: "Reports",
//     icon: <AssignmentRoundedIcon />,
//     link: "/all-reports",
//   },
// ];

// const secondaryListItems = [
//   { text: "Settings", icon: <SettingsRoundedIcon /> },
//   { text: "About", icon: <InfoRoundedIcon /> },
//   { text: "Feedback", icon: <HelpRoundedIcon /> },
// ];

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
        {/* <IfAnyGranted
          expected={["SuperAdmin", "Administrator", "User"]}
          actual={isSuperAdminOrisAdminOrisUser}
        >
          <NavLink
            to="/analytics"
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
                    <AnalyticsRoundedIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Analytics"
                    sx={{ color: `${isActive ? "#000" : "#7B8396"}` }}
                    className={`${isActive ? "" : "listItemText"}`}
                  />
                </ListItemButton>
              </ListItem>
            )}
          </NavLink>
        </IfAnyGranted> */}
        <IfAnyGranted
          expected={["SuperAdmin", "Administrator", "User"]}
          actual={isSuperAdminOrisAdminOrisUser}
        >
          <NavLink
            to="/all-queries"
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
                    primary="Queries"
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
        {/* {mainListItems.map((item, index) => (
          <IfAnyGranted
            expected={["SuperAdmin", "Administrator", "User"]}
            actual={isSuperAdminOrisAdminOrisUser}
          >
            <Link
              to={item.link}
              style={{
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
              }}
            >
              <ListItem key={index} disablePadding sx={{ display: "block" }}>
                <ListItemButton selected={index === 0}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            </Link>
          </IfAnyGranted>
        ))} */}
      </List>
      {/* <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Stack>
  );
};

export default MenuContent;
