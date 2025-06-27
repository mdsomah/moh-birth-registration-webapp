import React from "react";
import { Link as URLLink } from "react-router-dom";
import Link from "@mui/material/Link";
import { Box, Grid, Typography, Button } from "@mui/material";
import { LuTabletSmartphone } from "react-icons/lu";

import Image1 from "../../../../images/Carousel-Images/Image-1.jpeg";

const HomeContent = () => {
  return (
    <React.Fragment>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, md: 6, lg: 6 }}>
          <Box>
            <Typography
              variant="h6"
              sx={{
                textTransform: "uppercase",
                color: "#0047AB",
                fontWeight: "bold",
              }}
            >
              Ministry of Health, Republic of Liberia
            </Typography>
            <Typography
              variant="h3"
              sx={{ mt: 3, color: "#36454F", fontWeight: "bolder" }}
            >
              Bureau of Vital & Health Statistics. Delayed Birth Registration
              Platform
            </Typography>
            <Typography sx={{ fontSize: 18, mt: 3, color: "	#696969" }}>
              Every child born in Liberia is entitled to birth registration and
              certification, regardless parents nationality and social -economic
              status.
            </Typography>
            <Typography sx={{ fontSize: 18, color: "	#696969" }}>
              A child who is not registered at birth is in danger of being shut
              out of society – denied the right to an official identity, a
              recognized name and nationality.
            </Typography>
            <Box>
              <Button
                variant="contained"
                sx={{
                  mt: 4,
                  mr: 3,
                  fontSize: 20,
                }}
              >
                <Link
                  color="inherit"
                  href="https://moh.gov.lr/civil-registration/"
                  target="_blank"
                  sx={{ textDecoration: "none" }}
                >
                  Learn More
                </Link>
              </Button>
              <Button
                variant="outlined"
                sx={{
                  mt: 4,
                  mr: 3,
                  fontSize: 20,
                  bgcolor: "#0047AB",
                  color: "#fff",
                }}
                startIcon={<LuTabletSmartphone />}
              >
                <URLLink
                  to="/validate-new-applicant"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Register Now
                </URLLink>
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 6 }}>
          <Box
            sx={{
              backgroundImage: `url(${Image1})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              // width: 600,
              height: 400,
              mx: 2,
            }}
          ></Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default HomeContent;
