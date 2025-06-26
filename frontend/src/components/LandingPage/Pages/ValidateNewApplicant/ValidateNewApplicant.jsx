import React from "react";
import { Helmet } from "react-helmet-async";
import AppTheme from "../../../../shared-theme/AppTheme";
import { CssBaseline, Container } from "@mui/material";
import CopyRights from "../../CopyRights/CopyRights";
import ValidateNewApplicantContent from "./ValidateNewApplicantContent";

//? Scroll to top of react route/page change
import ScrollToTop from "../../../ScrollToTop/ScrollToTop";

const ValidateNewApplicant = (props) => {
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Validate New Applicant | Ministry of Health (MOH) Online Delayed Birth
          Registration Platform
        </title>
      </Helmet>
      <AppTheme {...props}>
        <CssBaseline enableColorScheme />
        <Container maxWidth="lg" component="main" sx={{ my: 4 }}>
          <ValidateNewApplicantContent />
        </Container>
        <CopyRights />
        <ScrollToTop />
      </AppTheme>
    </React.Fragment>
  );
};

export default ValidateNewApplicant;
