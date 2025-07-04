import React from "react";
import { Helmet } from "react-helmet-async";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import AppTheme from "../../../../shared-theme/AppTheme";
import Header from "../../Header/Header";
import HomeContent from "./HomeContent";
import CopyRights from "../../CopyRights/CopyRights";

//? Scroll to top of react route/page change
import ScrollToTop from "../../../ScrollToTop/ScrollToTop";

const Home = (props) => {
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Home | Ministry of Health (MOH) Online Delayed Birth Registration
          Platform
        </title>
      </Helmet>
      <AppTheme {...props}>
        <CssBaseline enableColorScheme />
        <Header />
        <Container
          maxWidth="lg"
          component="main"
          sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
        >
          <HomeContent />
        </Container>
        <CopyRights />
        <ScrollToTop />
      </AppTheme>
    </React.Fragment>
  );
};

export default Home;
