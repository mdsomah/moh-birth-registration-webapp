import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import AppTheme from "../../../../shared-theme/AppTheme.js";
import Header from "../../Header/Header";
import MainContent from "./MainContent";
import Latest from "./Latest";
import Footer from "../../Footer/Footer";

const Home = (props) => {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Header />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
      >
        <MainContent />
        <Latest />
      </Container>
      <Footer />
    </AppTheme>
  );
};

export default Home;
