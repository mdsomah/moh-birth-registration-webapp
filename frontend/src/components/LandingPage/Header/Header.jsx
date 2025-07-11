import * as React from "react";
import { Link as URLLink } from "react-router-dom";
import { alpha, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ColorModeIconDropdown from "../../../shared-theme/ColorModeIconDropdown";

//? MOH Logo
import MOHLogo from "../../../images/MOH_Logo/MOH-LOGO.png";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: "8px 12px",
}));

const Header = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 28px)",
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
          >
            <URLLink
              to="/"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img src={MOHLogo} width="50" alt="MOH Logo" loading="lazy" />
            </URLLink>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <URLLink
                to="/"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Button variant="text" color="info" size="small">
                  Home
                </Button>
              </URLLink>
              {/* <URLLink
                to="/track-application-status"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Button variant="text" color="info" size="small">
                  Track Application
                </Button>
              </URLLink> */}
              {/* <URLLink
                to="/schedule-appointment"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Button
                  variant="text"
                  color="info"
                  size="small"
                  sx={{ minWidth: 0 }}
                >
                  Schedule Appointment
                </Button>
              </URLLink> */}
              {/* <URLLink
                to="/make-payment"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Button
                  variant="text"
                  color="info"
                  size="small"
                  sx={{ minWidth: 0 }}
                >
                  Make Payment
                </Button>
              </URLLink> */}
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            <URLLink
              to="/sign-in"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button color="primary" variant="text" size="small">
                Sign in
              </Button>
            </URLLink>
            <URLLink
              to="/validate-new-applicant"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button color="primary" variant="contained" size="small">
                Register
              </Button>
            </URLLink>
            <ColorModeIconDropdown />
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: "var(--template-frame-height, 0px)",
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <URLLink
                  to="/"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <MenuItem>Home</MenuItem>
                </URLLink>
                {/* <URLLink
                  to="/track-application-status"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <MenuItem>Track Application</MenuItem>
                </URLLink> */}
                {/* <URLLink
                  to="/schedule-appointment"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <MenuItem>Schedule Appointment</MenuItem>
                </URLLink> */}
                {/* <URLLink
                  to="/make-payment"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <MenuItem>Make Payment</MenuItem>
                </URLLink> */}
                <Divider sx={{ my: 3 }} />
                <URLLink
                  to="/sign-in"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <MenuItem>
                    <Button color="primary" variant="outlined" fullWidth>
                      Sign In
                    </Button>
                  </MenuItem>
                </URLLink>
                <URLLink
                  to="/validate-new-applicant"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <MenuItem>
                    <Button color="primary" variant="contained" fullWidth>
                      Register
                    </Button>
                  </MenuItem>
                </URLLink>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
