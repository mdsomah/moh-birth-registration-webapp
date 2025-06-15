const router = require("express").Router();
const { passportAuthenticateJWT } = require("../middlewares/jwtMiddleware");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { verifyToken } = require("../middlewares/authMiddleware");
const { validateInputs } = require("../middlewares/validateMiddleware");
const { validateAddUserSchema } = require("../validations/validateAddUser");
const { validateEditUserSchema } = require("../validations/validateEditUser");
const {
  validateUserProfilePasswordSchema,
} = require("../validations/validateUserProfilePassword");
const {
  validateUserProfilePhotoSchema,
} = require("../validations/validateUserProfilePhoto");
const {
  validateUserProfileSchema,
} = require("../validations/validateUserProfile");
const {
  validateUserPasswordSchema,
} = require("../validations/validateUserPassword");
const { validateUserPhotoSchema } = require("../validations/validateUserPhoto");
const usersController = require("../controllers/usersController");

//? User Image Upload
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "images");
  },
  filename: (_req, file, cb) => {
    const userPhotoExtension = file.originalname.split(".").pop();
    const userPhotoURL = `${uuidv4()}_${Date.now()}.${userPhotoExtension}`;
    cb(null, userPhotoURL);
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

const upload = multer({ storage, fileFilter, limits: { fileSize } });

router.post(
  "/create-new-user",
  passportAuthenticateJWT,
  verifyToken,
  upload.single("photo"),
  validateInputs(validateAddUserSchema),
  usersController.CreateNewUser
);
router.get(
  "/profile",
  passportAuthenticateJWT,
  verifyToken,
  usersController.GetUserProfile
);
router.post(
  "/profile/password",
  passportAuthenticateJWT,
  verifyToken,
  validateInputs(validateUserProfilePasswordSchema),
  usersController.UpdateUserProfilePassword
);
router.post(
  "/profile/photo",
  passportAuthenticateJWT,
  verifyToken,
  upload.single("photo"),
  validateInputs(validateUserProfilePhotoSchema),
  usersController.UpdateUserProfilePhoto
);
router.post(
  "/profile",
  passportAuthenticateJWT,
  verifyToken,
  validateInputs(validateUserProfileSchema),
  usersController.UpdateUserProfile
);
router.get(
  "/",
  passportAuthenticateJWT,
  verifyToken,
  usersController.GetAllUsers
);
router.get(
  "/:id",
  passportAuthenticateJWT,
  verifyToken,
  usersController.GetUserById
);
router.put(
  "/user-password/:id",
  passportAuthenticateJWT,
  verifyToken,
  validateInputs(validateUserPasswordSchema),
  usersController.UpdateUserPassword
);
router.put(
  "/user-photo/:id",
  passportAuthenticateJWT,
  verifyToken,
  upload.single("photo"),
  validateInputs(validateUserPhotoSchema),
  usersController.UpdateUserPhoto
);
router.put(
  "/:id",
  passportAuthenticateJWT,
  verifyToken,
  validateInputs(validateEditUserSchema),
  usersController.UpdateUserById
);
router.delete(
  "/:id",
  passportAuthenticateJWT,
  verifyToken,
  usersController.DeleteUserById
);

module.exports = router;
