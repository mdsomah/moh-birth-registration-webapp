import React, { useState, useEffect, useMemo, useCallback } from "react";
import { styled } from "@mui/material/styles";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Tooltip,
  Box,
  Paper,
  Input,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { LoadingButton } from "@mui/lab";
import { IoMdClose } from "react-icons/io";
import { useDropzone } from "react-dropzone";
import { TbCameraUp } from "react-icons/tb";
import { MdCancel } from "react-icons/md";
import { IoMdSave } from "react-icons/io";

// React RC SlimScroll Bar
import { Scrollbars } from "rc-scrollbars";

const baseStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  transition: "border .3s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

// Dialog Styles
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const DocumentUpload = (props) => {
  // Destructure props
  const {
    formikProductForm,
    handleProductImage,
    files,
    setFiles,
    handleCancelProductImage,
  } = props;

  // Dialog State
  const [open, setOpen] = useState(false);

  // Loading State
  const [loading, setLoading] = useState(false);

  // Dialog Functions
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Save Photo
  const handleSavePhoto = () => {
    setLoading(true);
    setTimeout(() => {
      handleProductImage(files);
      handleClose();
      setLoading(false);
    }, 2000);
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      formikProductForm.setFieldValue("photo", acceptedFiles[0]);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [formikProductForm, setFiles]
  );

  const {
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop: onDrop,
    accept: {
      "image/jpeg": [".jpeg"],
      "image/jpg": [".jpg"],
      "image/png": [".png"],
      "image/jif": [".jif"],
      "image/jfif": [".jfif"],
    },
    maxFiles: 1,
  });

  // File Rejection
  const fileRejectionItems = fileRejections.map(({ file, errors }) => {
    return (
      <Box key={file.path}>
        <Typography sx={{ mb: 2, fontWeight: 500 }}>
          Image Name: {file.name}
        </Typography>
        <Typography sx={{ mb: 2, fontWeight: 500 }}>
          Size: {file.size} bytes
        </Typography>
        <Typography sx={{ mb: 2, fontWeight: 500 }}>
          Type: {file.type}
        </Typography>
        {errors.map((e) => (
          <Typography
            key={e.code}
            sx={{ mb: 2, fontWeight: 500, color: red.A400 }}
          >
            Error Occur: <Typography>{e.message}</Typography>
          </Typography>
        ))}
      </Box>
    );
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragAccept, isDragReject]
  );

  // File Preview
  const thumbs = files.map((file) => (
    <Box key={file.name}>
      <Typography sx={{ mb: 2, fontWeight: 500 }}>
        Image Name: {file.name}
      </Typography>
      <Typography sx={{ mb: 2, fontWeight: 500 }}>
        Size: {file.size} bytes
      </Typography>
      <Typography sx={{ mb: 2, fontWeight: 500 }}>Type: {file.type}</Typography>
      <Box sx={{ textAlign: "center" }}>
        <img src={file.preview} alt={file.name} width="80%" />
      </Box>
    </Box>
  ));

  // clean up
  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <React.Fragment>
      <Tooltip title="Upload Image">
        <IconButton onClick={handleClickOpen}>
          <TbCameraUp
            size={100}
            style={{ color: "#acb5c3", cursor: "pointer" }}
          />
        </IconButton>
      </Tooltip>
      {/* Start Dialog */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <Typography
            sx={{
              color: "#00A4EF",
              fontWeight: "bold",
              fontSize: "1rem",
              textTransform: "uppercase",
            }}
          >
            Upload Product Image
          </Typography>
        </DialogTitle>
        <Tooltip title="Close">
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <IoMdClose size={20} color="#acb5c3" />
          </IconButton>
        </Tooltip>
        <Scrollbars
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          autoHeightMin={0}
          style={{ width: 600, height: 440 }}
        >
          <DialogContent dividers>
            <Paper sx={{ p: 3 }}>
              <Box {...getRootProps({ style })}>
                <Input
                  id="photo"
                  name="photo"
                  type="file"
                  accept=".jpeg, .jpg, .png, .jif, .jfif"
                  {...getInputProps()}
                />
                <Typography>
                  Drag and drop file or click to select product image file.
                </Typography>
              </Box>
              <Box sx={{ mt: 2 }}>
                {fileRejectionItems}
                {thumbs}
              </Box>
            </Paper>
          </DialogContent>
        </Scrollbars>
        <DialogActions>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#acb5c3",
              color: "#fff",
            }}
            endIcon={<MdCancel size={20} />}
            onClick={() => {
              handleCancelProductImage();
              handleClose();
            }}
          >
            Cancel
          </Button>
          <LoadingButton
            disabled={!files.length > 0}
            variant="contained"
            loading={loading}
            loadingPosition="end"
            endIcon={<IoMdSave size={20} />}
            onClick={() => handleSavePhoto()}
          >
            <span>Save</span>
          </LoadingButton>
        </DialogActions>
      </BootstrapDialog>
      {/* End Dialog */}
    </React.Fragment>
  );
};

export default React.memo(DocumentUpload);
