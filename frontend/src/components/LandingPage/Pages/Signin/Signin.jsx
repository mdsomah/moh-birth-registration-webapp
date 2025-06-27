import React from "react";
import { Helmet } from "react-helmet-async";
import AppTheme from "../../../../shared-theme/AppTheme";
import { CssBaseline, Container } from "@mui/material";
import CopyRights from "../../CopyRights/CopyRights";
import SigninContent from "./SigninContent";
import ColorModeIconDropdown from "../../../../shared-theme/ColorModeIconDropdown";

//? Scroll to top of react route/page change
import ScrollToTop from "../../../ScrollToTop/ScrollToTop";

const Signin = (props) => {
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Sign In | Ministry of Health (MOH) Online Delayed Birth Registration
          Platform
        </title>
      </Helmet>
      <AppTheme {...props}>
        <CssBaseline enableColorScheme />
        <ColorModeIconDropdown
          sx={{ position: "fixed", top: "1rem", right: "1rem" }}
        />
        <Container maxWidth="lg" component="main" sx={{ my: 4 }}>
          <SigninContent />
        </Container>
        <CopyRights />
        <ScrollToTop />
      </AppTheme>
    </React.Fragment>
  );
};

export default Signin;
