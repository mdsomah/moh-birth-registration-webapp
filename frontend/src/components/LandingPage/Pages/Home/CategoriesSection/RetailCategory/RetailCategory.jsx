import React from "react";
import { Link as URLLink } from "react-router-dom";
import { Box, Button, Grid, Typography } from "@mui/material";

const RetailCategory = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={6}>
        <Box>
          <Typography variant="h3" sx={{ mt: 3, fontWeight: "bolder" }}>
            Retail
          </Typography>
          <Typography variant="h5" sx={{ mt: 3, color: "inherit" }}>
            eSalesPOS software a leading cloud point of sales and e-commerce
            platform. Turn your smartphone or tablet into a powerful POS. Manage
            sales, inventory and employees with ease; engage customers and
            increase your revenue. Whether you have single or multiple stores,
            our tools help run your business
          </Typography>
          <Box>
            <URLLink to="/signup">
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 4, mr: 3, fontSize: 20 }}
              >
                Learn More
              </Button>
            </URLLink>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Box>
          <Typography>Images</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default RetailCategory;
