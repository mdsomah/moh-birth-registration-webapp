const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

//? Applicant Photo Upload
const applicantStorage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "uploads");
  },
  filename: function (_req, file, cb) {
    const applicantPhotoExt = file.originalname.split(".").pop();
    const applicantPhotoURL = `${uuidv4()}_${Date.now()}.${applicantPhotoExt}`;
    cb(null, applicantPhotoURL);
  },
});

//? Parent or Guardian Photo Upload
const parentOrGuardianStorage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "uploads");
  },
  filename: function (_req, file, cb) {
    const parentOrGuardianPhotoExt = file.originalname.split(".").pop();
    const parentOrGuardianPhotoURL = `${uuidv4()}_${Date.now()}.${parentOrGuardianPhotoExt}`;
    cb(null, parentOrGuardianPhotoURL);
  },
});

//? File Filter
const fileFilter = (_req, file, cb) => {
  //? File Types
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/jif",
  ];
  if (allowedFileTypes.includes(file?.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type!"));
  }
};

//? File Size
const fileSize = (_req, file, cb) => {
  //? File Size
  const allowFileSize = 1024 * 1024 * 25;
  if (file?.size === allowFileSize) {
    cb(null, true);
  } else {
    cb(new Error("File size too large!"));
  }
};

//? Applicant Upload
const applicantUpload = multer({
  storage: applicantStorage,
  fileFilter,
  limits: { fileSize },
});

//? Parent or Guardian Upload
const parentOrGuardianUpload = multer({
  storage: parentOrGuardianStorage,
  fileFilter,
  limits: { fileSize },
});

module.exports = { applicantUpload, parentOrGuardianUpload };
