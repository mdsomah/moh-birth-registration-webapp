import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import MuiToolbar from "@mui/material/Toolbar";
import { tabsClasses } from "@mui/material/Tabs";
// import Typography from "@mui/material/Typography";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SideMenuMobile from "./SideMenuMobile";
import MenuButton from "./MenuButton";
import ColorModeIconDropdown from "../shared-theme/ColorModeIconDropdown";
// import CustomDatePicker from "./CustomDatePicker";

//? NSA Logo
import logo from "../../../../../images/NSA_Logo/NSA-LOGO.png";

const Toolbar = styled(MuiToolbar)({
  width: "100%",
  padding: "12px",
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  justifyContent: "center",
  gap: "12px",
  flexShrink: 0,
  [`& ${tabsClasses.flexContainer}`]: {
    gap: "8px",
    p: "8px",
    pb: 0,
  },
});

export default function AppNavbar() {
  const [open, setOpen] = useState(false);

  const toggleOpenDrawer = () => {
    setOpen(true);
  };

  const toggleCloseDrawer = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        display: { xs: "auto", md: "none" },
        boxShadow: 0,
        bgcolor: "background.paper",
        backgroundImage: "none",
        borderBottom: "1px solid",
        borderColor: "divider",
        top: "var(--template-frame-height, 0px)",
      }}
    >
      <Toolbar variant="regular">
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            flexGrow: 1,
            width: "100%",
            gap: 2,
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{ justifyContent: "center", mr: "auto" }}
          >
            <MenuButton aria-label="menu" onClick={toggleOpenDrawer}>
              <MenuRoundedIcon />
            </MenuButton>
            <SideMenuMobile open={open} toggleCloseDrawer={toggleCloseDrawer} />
            <ColorModeIconDropdown />
            {/* <CustomDatePicker /> */}
          </Stack>
          <CustomIcon />
          {/* <Typography
            variant="h4"
            component="h1"
            sx={{ color: "text.primary" }}
          >
            Dashboard
          </Typography> */}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export function CustomIcon() {
  return (
    <Box
      sx={{
        width: "1.5rem",
        height: "1.5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
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
          alt="MICAT Logo"
          slotProps={{
            img: { loading: "lazy" },
          }}
        />
      </Link>
    </Box>
  );
}
