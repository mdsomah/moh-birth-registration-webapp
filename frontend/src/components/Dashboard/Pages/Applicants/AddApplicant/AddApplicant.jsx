import * as React from "react";
import { Helmet } from "react-helmet-async";
import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppNavbar from "../../Dashboard/components/AppNavbar";
import Header from "../../Dashboard/components/Header";
import MainAddApplicantGrid from "./MainAddApplicantGrid";
import SideMenu from "../../Dashboard/components/SideMenu";
import AppTheme from "../../Dashboard/shared-theme/AppTheme";
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from "../../Dashboard/theme/customizations";

//? Scroll to top of react route/page change
import ScrollToTop from "../../../../ScrollToTop/ScrollToTop";

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

const AddApplicant = (props) => {
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Add Applicant | Ministry of Health (MOH) Online Delayed Birth
          Registration Platform
        </title>
      </Helmet>
      <AppTheme {...props} themeComponents={xThemeComponents}>
        <CssBaseline enableColorScheme />
        <Box sx={{ display: "flex" }}>
          <SideMenu />
          <AppNavbar />
          <Box
            component="main"
            sx={(theme) => ({
              flexGrow: 1,
              backgroundColor: theme.vars
                ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                : alpha(theme.palette.background.default, 1),
              overflow: "auto",
            })}
          >
            <Stack
              spacing={{ xs: 5, md: 2 }}
              sx={{
                mx: 3,
                pb: 5,
                mt: { xs: 4, md: 0 },
              }}
            >
              <Header />
              <MainAddApplicantGrid />
            </Stack>
          </Box>
        </Box>
      </AppTheme>
      <ScrollToTop />
    </React.Fragment>
  );
};

export default AddApplicant;
