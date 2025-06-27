import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const HomeContent = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, md: 6 }}>Hero Section</Grid>
      </Grid>
    </Box>
  );
};

export default HomeContent;
