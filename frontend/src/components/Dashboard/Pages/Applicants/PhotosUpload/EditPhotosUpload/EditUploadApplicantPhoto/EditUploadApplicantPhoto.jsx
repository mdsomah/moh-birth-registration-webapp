import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  forwardRef,
} from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  IconButton,
  Typography,
  Tooltip,
  Box,
  Paper,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { MdCancel } from "react-icons/md";
import { IoMdSave } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { useDropzone } from "react-dropzone";

//? MUI Dialog Responsive Query
import useMediaQuery from "@mui/material/useMediaQuery";

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

//? Dialog Transition
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//? Dialog Styles
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const EditUploadApplicantPhoto = ({
  open,
  handleClose,
  formikEditApplicantForm,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  //? files State
  const [files, setFiles] = useState([]);

  //? Handle Save
  const handleSave = (e) => {
    e.preventDefault();
    handleClose();
  };

  //? Handle Cancel
  const handleCancel = () => {
    handleClose();
    formikEditApplicantForm.setFieldValue("applicantPhoto", "");
    setFiles([]);
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      formikEditApplicantForm.setFieldValue("applicantPhoto", acceptedFiles[0]);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [formikEditApplicantForm]
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

  //? File Rejection
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

  //? File Preview
  const thumbs = files.map((file) => (
    <Box key={file.name}>
      <Typography sx={{ mb: 2, fontWeight: 500 }}>
        Photo Name: {file.name}
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

  //? clean up
  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <React.Fragment>
      {/* Start Dialog */}
      <BootstrapDialog
        // onClose={handleClose}
        // aria-labelledby="customized-dialog-title"
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        open={open}
        fullScreen={fullScreen}
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
            Upload Photo
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
        <DialogContent dividers>
          <Box component="form" noValidate>
            <Paper sx={{ p: 3 }}>
              <Box {...getRootProps({ style })}>
                <input
                  id="applicantPhoto"
                  name="applicantPhoto"
                  type="file"
                  accept=".jpeg, .jpg, .png, .jif, .jfif"
                  {...getInputProps()}
                  error={
                    formikEditApplicantForm.touched.applicantPhoto &&
                    Boolean(formikEditApplicantForm.errors.applicantPhoto)
                  }
                />
                <Typography>Click here to upload photo</Typography>
              </Box>
              <Box sx={{ mt: 2 }}>
                {fileRejectionItems}
                {thumbs}
              </Box>
            </Paper>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            size="large"
            sx={{
              color: "#fff",
            }}
            endIcon={<MdCancel size={20} color="#fff" />}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="large"
            endIcon={<IoMdSave size={20} color="#fff" />}
            sx={{ color: "#fff" }}
            onClick={handleSave}
          >
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
      {/* End Dialog */}
    </React.Fragment>
  );
};

export default React.memo(EditUploadApplicantPhoto);
