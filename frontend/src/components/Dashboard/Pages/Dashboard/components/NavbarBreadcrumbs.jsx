import * as React from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Breadcrumbs, { breadcrumbsClasses } from "@mui/material/Breadcrumbs";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: "center",
  },
}));

const NavbarBreadcrumbs = () => {
  //? Change Navbar Breadcrumb Title
  const changeTitle = () => {
    switch (window.location.pathname) {
      case "/dashboard":
        return "Home";
      // case "/analytics":
      //   return "Analytics";
      case "/all-queries":
        return "Queries";
      case "/all-queries/view-applicant-details":
        return "Applicant Details";
      case "/all-users":
        return "Users";
      case "/my-profile":
        return "My Profile";
      case "/managed-account":
        return "Managed Account";
      case "/all-reports":
        return "Reports";
      default:
        return null;
    }
  };

  // Navbar Title
  const Navbar_Title = changeTitle();

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      <Typography variant="body1">Dashboard</Typography>
      <Typography
        variant="body1"
        sx={{ color: "text.primary", fontWeight: 600 }}
      >
        {Navbar_Title}
      </Typography>
    </StyledBreadcrumbs>
  );
};

export default NavbarBreadcrumbs;
