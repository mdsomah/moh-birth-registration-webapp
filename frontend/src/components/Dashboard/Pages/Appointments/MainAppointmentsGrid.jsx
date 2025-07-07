import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Copyright from "../Dashboard/internals/components/Copyright";
import AppointmentsTable from "./AppointmentsTable/AppointmentsTable";
import NavbarBreadcrumbs from "../Dashboard/components/NavbarBreadcrumbs";

//? React Responsive Media Queries
import { useMediaQuery } from "react-responsive";

const MainAppointmentsGrid = () => {
  //? Tablet or Mobile Responsive Media Queries
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* cards */}
      {isTabletOrMobile && <NavbarBreadcrumbs />}
      <Typography
        component="h2"
        variant="h6"
        sx={{ mt: { xs: 3, md: 0 }, mb: 2 }}
      >
        Appointments
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={{ xs: 12, lg: 12 }}>
          <AppointmentsTable />
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
};

export default MainAppointmentsGrid;
