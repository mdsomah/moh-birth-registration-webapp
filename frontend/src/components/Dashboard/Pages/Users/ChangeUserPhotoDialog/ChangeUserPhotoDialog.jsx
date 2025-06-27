import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  forwardRef,
} from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { LoadingButton } from "@mui/lab";
import { MdCancel } from "react-icons/md";
import { IoMdSave } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { useDropzone } from "react-dropzone";
import ButtonLoader from "../../../../ButtonLoader/ButtonLoader";

//? MUI Dialog Responsive Query
import useMediaQuery from "@mui/material/useMediaQuery";

//? Formik and Yup
import { useFormik } from "formik";
import * as Yup from "yup";

//? Update User Photo
import UpdateData from "../../../../../apis/UpdateData";

//? Endpoints
const updateUserURL = "/users/user-photo";

//? User Photo Upload Formats
const SUPPORTED_FORMATS = ["image/jpeg, image/jpg, image/png, image/jif"];

//? User Photo Upload Size
const FILE_SIZE = 1024 * 1024 * 25;

//? Validate User Photo Schema
const ValidateUserPhotoSchema = Yup.object()
  .shape({
    photo: Yup.mixed()
      .notRequired()
      .test(
        "fileFormat",
        "File type not supported! Supported types: (.jpeg, .jpg, .png or .jif)",
        (value) =>
          !value || ((value) => value && SUPPORTED_FORMATS.includes(value.type))
      )
      .test(
        "fileSize",
        "File is too large! Supported size: (2MB)",
        (value) => !value || (value && value.size <= FILE_SIZE)
      ),
  })
  .required();

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

const ChangeUserPhotoDialog = ({ row, closeMenu, open, handleClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  //? Loading State
  const [loading, setLoading] = useState(false);

  //? files State
  const [files, setFiles] = useState([]);

  //? Formik User Photo Form
  const formikUserPhotoForm = useFormik({
    initialValues: {
      photo: "",
    },
    validationSchema: ValidateUserPhotoSchema,
    onSubmit: () => {
      updateUserPhoto();
    },
  });

  //? Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    formikUserPhotoForm.handleSubmit();
  };

  //? Handle Cancel
  const handleCancel = () => {
    handleClose();
    formikUserPhotoForm.resetForm();
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      formikUserPhotoForm.setFieldValue("photo", acceptedFiles[0]);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [formikUserPhotoForm]
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

  //? clean up
  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  //? User Data
  const UserData = {
    photo: formikUserPhotoForm.values.photo,
  };

  console.log(UserData);

  //? useQueryClient
  const queryClient = useQueryClient();

  const Mutation = useMutation({
    mutationFn: (updatedData) =>
      UpdateData(
        `${updateUserURL}/${row?.original?.id}`,
        updatedData,
        closeMenu
      ),
    onSuccess: (data) => {
      if (data) {
        handleClose();
        formikUserPhotoForm.resetForm();
        queryClient.invalidateQueries({
          queryKey: ["usersData"],
        });
      }
      return data;
    },
    onError: (error) => {
      return error;
    },
  });

  //? Loading Effect
  useEffect(() => {
    if (Mutation.isPending) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [Mutation]);

  //? Update User Profile Photo
  const updateUserPhoto = async () => {
    //? Destructure UserData
    const { photo } = UserData;

    //? Create FormData
    const formData = new FormData();
    formData.append("photo", photo);

    Mutation.mutate(formData);
  };

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
            Change Photo
          </Typography>
        </DialogTitle>
        <Tooltip title="Close">
          <IconButton
            aria-label="close"
            onClick={handleCancel}
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
          <Box component="form" noValidate encType="multipart/form-data">
            <Paper sx={{ p: 3 }}>
              <Box {...getRootProps({ style })}>
                <input
                  id="photo"
                  name="photo"
                  type="file"
                  accept=".jpeg, .jpg, .png, .jif, .jfif"
                  {...getInputProps()}
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
              color: "#d4bf79",
            }}
            endIcon={<MdCancel size={20} color="#d4bf79" />}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <LoadingButton
            variant="contained"
            size="large"
            loading={loading}
            loadingIndicator={<ButtonLoader />}
            loadingPosition="end"
            endIcon={<IoMdSave size={20} color="#d4bf79" />}
            sx={{ color: "#d4bf79" }}
            onClick={handleSubmit}
          >
            {loading ? (
              <span style={{ color: "#d4bf79" }}>Saving</span>
            ) : (
              <spa>Save</spa>
            )}
          </LoadingButton>
        </DialogActions>
      </BootstrapDialog>
      {/* End Dialog */}
    </React.Fragment>
  );
};

export default React.memo(ChangeUserPhotoDialog);
