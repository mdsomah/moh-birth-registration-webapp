import React from "react";
import { Link as URLLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

// eSalesPOS Logo import
import logo from "../../../images/MICAT_Logo/MICAT-LOGO.png";

const Header = () => {
  return (
    <AppBar
      position="static"
      color="default"
      elevation={5}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <URLLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <img src={logo} width="50" alt="MICAT Logo" loading="lazy" />
        </URLLink>
        <Typography variant="h6" sx={{ ml: 1, mr: 6, color: "#212121" }}>
          MICAT
        </Typography>
        <URLLink
          to="/"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Typography
            variant="h6"
            color="#212121"
            noWrap
            sx={{
              my: 1,
              mx: 1.5,
              ":hover": {
                color: "#008080",
              },
            }}
          >
            Home
          </Typography>
        </URLLink>
        <URLLink to="/about-us" style={{ textDecoration: "none" }}>
          <Typography
            variant="h6"
            color="#212121"
            noWrap
            sx={{
              my: 1,
              mx: 1.5,
              ":hover": {
                color: "#008080",
              },
            }}
          >
            About Us
          </Typography>
        </URLLink>
        <URLLink to="/contact-us" style={{ textDecoration: "none" }}>
          <Typography
            variant="h6"
            color="#212121"
            noWrap
            sx={{
              my: 1,
              mx: 1.5,
              ":hover": {
                color: "#008080",
              },
            }}
          >
            Contact Us
          </Typography>
        </URLLink>
        <URLLink to="/track-application" style={{ textDecoration: "none" }}>
          <Typography
            variant="h6"
            color="#212121"
            noWrap
            sx={{
              my: 1,
              mx: 1.5,
              flexGrow: 1,
              ":hover": {
                color: "#008080",
              },
            }}
          >
            Track Application
          </Typography>
        </URLLink>
        <Typography sx={{ my: 1, mx: 1.5, flexGrow: 1 }} />
        <URLLink to="/login" style={{ textDecoration: "none" }}>
          <Typography
            variant="h6"
            color="#212121"
            noWrap
            sx={{
              my: 1,
              mx: 1.5,
              ":hover": {
                color: "#008080",
              },
            }}
          >
            Login
          </Typography>
        </URLLink>
        <URLLink to="/registration-info" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            sx={{ my: 1, mx: 1.5, bgcolor: "buttonBGColor.main" }}
          >
            Register
          </Button>
        </URLLink>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
