import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const CopyRights = (props) => {
  return (
    <Typography
      variant="body2"
      align="center"
      {...props}
      sx={[
        {
          color: "text.secondary",
          mb: 4,
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.nsa.gov.lr/" target="_blank">
        Ministry of Health
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
};

export default CopyRights;
