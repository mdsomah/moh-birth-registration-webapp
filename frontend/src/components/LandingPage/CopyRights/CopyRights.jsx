import React from "react";
import { Link, Typography, Box } from "@mui/material";

const CopyRights = (props) => {
  return (
    <Box
      sx={{
        textAlign: "center",
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",
        width: 450,
        mt: 8,
        mb: 8,
      }}
      {...props}
    >
      <Box>
        <Typography
          variant="body2"
          sx={{ color: "#a4a8ac", fontSize: 13, mt: 3 }}
        >
          {"©"} {new Date().getFullYear()} MICAT Online Registration System. All
          rights reserved. Design and build by{" "}
          <Link
            color="inherit"
            href="https://www.linkedin.com/in/mdsomah/"
            target={"_blank"}
            rel="noopener"
            sx={{ textDecoration: "none" }}
          >
            <span
              style={{
                color: "#00A4EF",
                borderBottom: "1px solid #00A4EF",
              }}
            >
              ROMMTech
            </span>
          </Link>
        </Typography>
      </Box>
      <Box>
        <Typography
          variant="body2"
          sx={{ color: "#a4a8ac", fontSize: 13, mt: 3 }}
        >
          The Ministry of Information, Cultural Affairs and Tourism (MICAT),
          develops and disseminates information about the Government of Liberia,
          its policies and programs.
        </Typography>
      </Box>
      <Box>
        <Typography
          variant="body2"
          sx={{ color: "#a4a8ac", fontSize: 13, mt: 3 }}
        >
          By accessing and using this page you agree to the Terms and
          Conditions.
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <Link
          href="https://www.linkedin.com/in/mdsomah/"
          target={"_blank"}
          rel="noopener"
          sx={{ textDecoration: "none", color: "#a4a8ac" }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#00A4EF",
              borderBottom: "1px solid #00A4EF",
              fontSize: 13,
              mt: 3,
            }}
          >
            Terms of Conditions
          </Typography>
        </Link>
        <Link
          href="https://www.linkedin.com/in/mdsomah/"
          target={"_blank"}
          rel="noopener"
          sx={{ textDecoration: "none", color: "#a4a8ac" }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#00A4EF",
              borderBottom: "1px solid #00A4EF",
              fontSize: 13,
              mt: 3,
            }}
          >
            Contact Us
          </Typography>
        </Link>
        <Link
          href="https://www.linkedin.com/in/mdsomah/"
          target={"_blank"}
          rel="noopener"
          sx={{ textDecoration: "none", color: "#a4a8ac" }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#00A4EF",
              borderBottom: "1px solid #00A4EF",
              fontSize: 13,
              mt: 3,
            }}
          >
            Visit Our Webstie
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};

export default CopyRights;
