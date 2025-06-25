import React, { useState } from "react";
import { Link as URLLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { FaYoutube } from "react-icons/fa6";
import { responsiveTheme } from "../../../../utils/muiUtils";

//? Scroll to top of react route/page change
import ScrollToTop from "../../../ScrollToTop/ScrollToTop";

//? Images imports
import heroImage from "../../../../images/Hero-Image.png";

//? Components imports
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import CategoriesSection from "../Home/CategoriesSection/CategoriesSection";

// Accordion Customization
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={1} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
  // width: "80%",
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const Home = () => {
  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Home | Ministry of Health (MOH) Online Delayed Birth Registration
          System
        </title>
      </Helmet>
      <ThemeProvider theme={responsiveTheme}>
        <Header />
        <CssBaseline />
        <Box component="main">
          {/* Hero Section */}
          <Container
            maxWidth={false}
            sx={{ minHeight: "86vh", bgcolor: "#0047AB", py: 5 }}
          >
            <Box sx={{ px: 8, pt: 3, color: "#fff" }}>
              <Grid container spacing={5}>
                <Grid item xs={12} lg={6}>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        textTransform: "uppercase",
                        color: "#F5F5DC",
                        fontWeight: "bold",
                      }}
                    >
                      National Communications Bureau Annual Registration System
                    </Typography>
                    <Typography
                      variant="h3"
                      sx={{ mt: 3, color: "#fff", fontWeight: "bolder" }}
                    >
                      Be Counted As A Nation Builder. Pay Your Fees for Better
                      Ehancement
                    </Typography>
                    <Typography variant="h5" sx={{ mt: 3, color: "#F5F5DC" }}>
                      MICAT fees Sensitization Campaign. Fees are not
                      negotiable. Pay your fees for a better Liberia. Be a part
                      of positive change
                    </Typography>
                    <Box>
                      <URLLink to="/about-us">
                        <Button
                          variant="contained"
                          sx={{
                            mt: 4,
                            mr: 3,
                            fontSize: 20,
                            bgcolor: "buttonBGColor.main",
                          }}
                        >
                          Learn More
                        </Button>
                      </URLLink>
                      <URLLink to="/contact-us">
                        <Button
                          variant="outlined"
                          sx={{
                            mt: 4,
                            mr: 3,
                            fontSize: 20,
                            bgcolor: "#fff",
                            color: "#008080",
                            ":hover": {
                              bgcolor: "buttonBGColor.main",
                              color: "white",
                            },
                          }}
                          startIcon={<FaYoutube />}
                        >
                          Watch Demo
                        </Button>
                      </URLLink>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Box
                    sx={{
                      backgroundImage: `url(${heroImage})`,
                      backgroundRepeat: "no-repeat",
                      // backgroundSize: "cover",
                      backgroundPosition: "center",
                      // width: 600,
                      height: 400,
                      mx: 2,
                    }}
                  ></Box>
                </Grid>
              </Grid>
            </Box>
          </Container>
          {/* End Hero Section */}

          {/* Q&A Section */}
          <Container
            maxWidth={false}
            sx={{ minHeight: "86vh", backgroundColor: "#fff", py: 5, mt: 8 }}
          >
            <Box sx={{ px: 8, pt: 3, textAlign: "center" }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: "bolder" }}>
                  MICAT FAQ
                </Typography>
                <Typography variant="h6">
                  Over 1,000,000 businesses in 170 countries have registered
                  with Loyverse.
                </Typography>
              </Box>
              <Box sx={{ mt: 6, width: "80%", mx: "auto" }}>
                <Accordion
                  expanded={expanded === "panel1"}
                  onChange={handleChange("panel1")}
                >
                  <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        textTransform: "uppercase",
                      }}
                    >
                      Is Loyverse POS really free?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      You can use the Loyverse POS app for free. You can add
                      items, make sales, use analytics, and many other
                      functionalities without any payment. However, we have a
                      set of additional features in the Back Office where
                      additional charges will apply: Employee Management,
                      Advanced Inventory, Integrations. These add-on services
                      have a 14-day free trial. Please check our pricing page
                      for more info.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === "panel2"}
                  onChange={handleChange("panel2")}
                >
                  <AccordionSummary
                    aria-controls="panel2d-content"
                    id="panel2d-header"
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        textTransform: "uppercase",
                      }}
                    >
                      How to use Loyverse POS system?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Download and install Loyverse POS on Android or iOS mobile
                      devices from the Play Market or App Store. Create your
                      account by filling in the simple registration form. Make
                      the necessary settings in the Back Office. Here, you can
                      also manage your items, discounts, taxes, etc. as well as
                      see reports about your sales. Add items at the POS or Back
                      Office and start selling!
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === "panel3"}
                  onChange={handleChange("panel3")}
                >
                  <AccordionSummary
                    aria-controls="panel3d-content"
                    id="panel3d-header"
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        textTransform: "uppercase",
                      }}
                    >
                      Does Loyverse work offline?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      The Loyverse POS app works offline. Your device can
                      continue to make sales and work with shifts even when it
                      is not connected to the Internet. However, some features
                      such as refunds, new customer registration, adding items,
                      and few other will be unavailable or restricted while
                      offline. Check details in the help center: Offline Use of
                      Loyverse POS
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === "panel4"}
                  onChange={handleChange("panel4")}
                >
                  <AccordionSummary
                    aria-controls="panel4d-content"
                    id="panel4d-header"
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        textTransform: "uppercase",
                      }}
                    >
                      What kind of hardware can work with Loyverse?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Loyverse POS app lets you connect and use barcode
                      scanners, receipt printers, cash drawers, and other
                      hardware. Please, check the supported hardware list.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === "panel5"}
                  onChange={handleChange("panel5")}
                >
                  <AccordionSummary
                    aria-controls="panel5d-content"
                    id="panel5d-header"
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        textTransform: "uppercase",
                      }}
                    >
                      Does Loyverse have the functionality of loyalty cards?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Loyverse POS has a built-in loyalty program that allows
                      rewarding your regular customers for visiting your outlet.
                      You can issue your own loyalty cards with the printed
                      barcode. When the customer visits your store, the cashier
                      can quickly identify him/her by scanning the barcode from
                      the loyalty card with a separate barcode scanner or
                      built-in device camera. Another way of identification of
                      the customer is by his/her phone number.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Box>
          </Container>
          {/* End Q&A Section */}

          <Footer />
        </Box>
      </ThemeProvider>
      <ScrollToTop />
    </React.Fragment>
  );
};

export default Home;
