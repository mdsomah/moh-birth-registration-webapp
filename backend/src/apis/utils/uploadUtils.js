const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

//? Photos Upload
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "uploads");
  },
  filename: function (_req, file, cb) {
    const photosExtension = file.originalname.split(".").pop();
    const photosURL = `${uuidv4()}_${Date.now()}.${photosExtension}`;
    cb(null, photosURL);
  },
});

//? Files Filter
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

//? Files Size
const fileSize = (_req, file, cb) => {
  //? File Size
  const allowFileSize = 1024 * 1024 * 25;
  if (file?.size === allowFileSize) {
    cb(null, true);
  } else {
    cb(new Error("File size too large!"));
  }
};

const uploads = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: fileSize,
  },
});

module.exports = { uploads };
