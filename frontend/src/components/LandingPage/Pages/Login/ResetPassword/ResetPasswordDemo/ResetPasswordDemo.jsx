import React from "react";
import ReactPlayer from "react-player/lazy";
import { Box, Typography } from "@mui/material";

const ResetPasswordDemo = () => {
  return (
    <Box sx={{ bgcolor: "rgba(0,0,0,0.1)", p: 3 }}>
      <ReactPlayer
        width={"540px"}
        height={"300px"}
        url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
        controls={true}
        loop={true}
        pip={true}
        stopOnUnmount={false}
        light={true}
        fallback={
          <Box>
            <Typography>Loading...</Typography>
          </Box>
        }
        style={{ display: "inline-block", border: "2px solid #fff" }}
      />
    </Box>
  );
};

export default ResetPasswordDemo;
