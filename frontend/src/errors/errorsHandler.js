import { Paper, Typography, Alert, AlertTitle, Button } from "@mui/material";
import React from "react";

const ErrorsHandler = ({ error, resetErrorBoundary }) => {
  return (
    <React.Fragment>
      <Paper
        sx={{
          width: 700,
          p: 5,
          mt: 3,
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Error Occur!
        </Typography>
        <Alert severity="error" sx={{ mt: 3, mb: 10 }}>
          <AlertTitle>Error</AlertTitle>
          <strong>{error.message}</strong>
        </Alert>
        <Button
          variant="contained"
          color="primary"
          onClick={resetErrorBoundary}
        >
          Refresh Page
        </Button>
      </Paper>
    </React.Fragment>
  );
};

export { ErrorsHandler };
