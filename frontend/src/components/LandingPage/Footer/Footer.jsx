import React from "react";
import { Link as URLLink } from "react-router-dom";
import { Box, Container, Typography, Link } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

// eSalesPOS Logo import
import logo from "../../../images/MOH_Logo/MOH-LOGO.png";

// Components Imports
import CopyRights from "../CopyRights/CopyRights";

const Footer = () => {
  // Scroll To Top Page
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container
      maxWidth={false}
      sx={{ minHeight: "86vh", backgroundColor: "#00008E", py: 5, mt: 8 }}
    >
      <hr />
      <Box
        sx={{
          pl: 12,
          pr: 12,
          mt: 2,
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <URLLink
            to="/sitemap"
            style={{ textDecoration: "none", color: "#fff" }}
          >
            <Typography variant="h6">Follow Us</Typography>
          </URLLink>
        </Box>
        <Box>
          <Link
            href="https://www.facebook.com/"
            target={"_blank"}
            rel="noopener"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <FacebookIcon
              sx={{ color: "#fff", fontSize: 30, marginRight: 3 }}
            />
          </Link>
          <Link
            href="https://www.linkedin.com/"
            target={"_blank"}
            rel="noopener"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <LinkedInIcon
              sx={{ color: "#fff", fontSize: 30, marginRight: 3 }}
            />
          </Link>
          <Link
            href="https://twitter.com/"
            target={"_blank"}
            rel="noopener"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <XIcon sx={{ color: "#fff", fontSize: 30, marginRight: 3 }} />
          </Link>
          <Link
            href="https://instagram.com/"
            target={"_blank"}
            rel="noopener"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <InstagramIcon
              sx={{ color: "#fff", fontSize: 30, marginRight: 3 }}
            />
          </Link>
          <Link
            href="https://www.youtube.com/"
            target={"_blank"}
            rel="noopener"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <YouTubeIcon sx={{ color: "#fff", fontSize: 30 }} />
          </Link>
        </Box>
      </Box>
      <hr />
      <Box
        sx={{
          pl: 12,
          pr: 12,
          mt: 8,
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Link
            href="https://www.rommtech.com/nl-nl/"
            target={"_blank"}
            rel="noopener"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
              Visit Our Website
            </Typography>
          </Link>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Box>
            <Box
              component="span"
              onClick={handleScrollToTop}
              sx={{ cursor: "pointer" }}
            >
              <img src={logo} width="60" alt="MICAT Logo" loading="lazy" />
            </Box>
            <Typography variant="h6" sx={{ color: "#fff" }}>
              MICAT
            </Typography>
          </Box>
          <CopyRights />
        </Box>
        <Box sx={{ display: "flex" }}>
          <URLLink
            to="/legal"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography
              variant="h6"
              sx={{ color: "#fff", mr: 1, fontSize: 14 }}
            >
              Legal |
            </Typography>
          </URLLink>
          <URLLink
            to="/privacy"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography
              variant="h6"
              sx={{ color: "#fff", mr: 1, fontSize: 14 }}
            >
              Privacy |
            </Typography>
          </URLLink>
          <URLLink
            to="/security"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography variant="h6" sx={{ color: "#fff", fontSize: 14 }}>
              Security
            </Typography>
          </URLLink>
        </Box>
      </Box>
    </Container>
  );
};

export default Footer;
