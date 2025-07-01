const { Logger } = require("../libs/logger");
const asyncHandler = require("express-async-handler");
const fs = require("fs");
const { HTTPErrors } = require("../utils/errorUtils");
const {
  createNewUser,
  getUserProfile,
  updateUserProfilePassword,
  updateUserProfilePhoto,
  updateUserProfile,
  getAllUsers,
  getUserById,
  updateUserPassword,
  updateUserPhoto,
  updateUserById,
  deleteUserById,
} = require("../services/usersService");
const { encrypt } = require("../utils/encryptUtils");
const { decrypt } = require("../utils/decryptUtils");

//? Delete User Photo
const deleteUserPhoto = (fullPath) => {
  fs.unlink(fullPath, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

//? Create New User
const CreateNewUser = asyncHandler(async (req, res, next) => {
  //? Destructure req.body
  const { encryptedData } = req.body;

  //? Decrypt the encryptedData
  const decryptedNewUser = decrypt(
    encryptedData,
    process.env.ENCRYPTION_KEY,
    process.env.ENCRYPTION_IV
  );

  //? Destructure decryptedNewUser data
  const {
    lastName,
    firstName,
    middleName,
    displayName,
    primaryPhoneNumber,
    secondaryPhoneNumber,
    email,
    userName,
    role,
    password,
    confirmPassword,
    userRoleId,
  } = decryptedNewUser;

  try {
    //? Define photo
    const photo = req.file?.filename;

    Logger.info("Creating New User: Status success!");
    const newUser = await createNewUser(
      lastName,
      firstName,
      middleName,
      displayName,
      primaryPhoneNumber,
      secondaryPhoneNumber,
      email,
      userName,
      role,
      password,
      confirmPassword,
      photo,
      userRoleId
    );
    //? Encrypt the newUser data
    const encryptedNewUser = encrypt(
      newUser,
      process.env.ENCRYPTION_KEY,
      process.env.ENCRYPTION_IV
    );
    return res.status(201).json({
      success: true,
      isAuthenticated: true,
      method: req.method,
      message: "User created successfully!",
      encryptedNewUser: encryptedNewUser,
    });
  } catch (err) {
    Logger.info("Creating New User: Status failed!");
    return next(HTTPErrors(500, `${err}`));
  }
});

//? Get User Profile
const GetUserProfile = asyncHandler(async (req, res, next) => {
  //? Destructure id from req.user
  const { id } = req.user;

  try {
    Logger.info("Getting User Profile: Status success!");
    const userProfile = await getUserProfile(id);
    //? Encrypt the userProfile data
    const encryptedUserProfile = encrypt(
      userProfile,
      process.env.ENCRYPTION_KEY,
      process.env.ENCRYPTION_IV
    );
    return res.status(200).json(encryptedUserProfile);
  } catch (err) {
    Logger.info("Getting User Profile: Status failed!");
    return next(HTTPErrors(404, `${err}`));
  }
});

//? Update User Profile Password
const UpdateUserProfilePassword = asyncHandler(async (req, res, next) => {
  //? Destructure req.body
  const { password, confirmPassword } = req.body;

  //? Destructure id from req.user
  const { id } = req.user;

  try {
    Logger.info("Updating User Profile Password: Status success!");
    const updateProfilePassword = await updateUserProfilePassword(
      id,
      password,
      confirmPassword
    );
    return res.status(200).json({
      success: true,
      isAuthenticated: true,
      method: req.method,
      message: "Password updated successfully!",
      updateProfilePassword: updateProfilePassword,
    });
  } catch (err) {
    Logger.info("Updating User Profile Password: Status failed!");
    return next(HTTPErrors(404, `${err}`));
  }
});

//? Update User Profile Photo
const UpdateUserProfilePhoto = asyncHandler(async (req, res, next) => {
  //? Destructure id from req.user
  const { id } = req.user;

  //? Define photo
  const photo = req.file?.filename;

  try {
    Logger.info("Updating User Profile Photo: Status success!");
    const updateProfilePhoto = await updateUserProfilePhoto(id, photo);
    // filePath
    // const filePath = "images/users-photos/";
    // fileName
    // const fileName = `${updateProfilePhoto.photo}`;
    // fullPath
    // const fullPath = filePath + fileName;
    // deleteFile
    // if (fullPath) {
    //   deleteUserPhoto(`${fullPath}`);
    // }
    return res.status(200).json({
      success: true,
      isAuthenticated: true,
      method: req.method,
      message: "Photo updated successfully!",
      updateProfilePhoto: updateProfilePhoto,
    });
  } catch (err) {
    Logger.info("Updating User Profile Photo: Status failed!");
    return next(HTTPErrors(404, `${err}`));
  }
});

//? Update User Profile
const UpdateUserProfile = asyncHandler(async (req, res, next) => {
  //? Destructure id from req.user
  const { id } = req.user;

  //? Destructure req.body
  const {
    lastName,
    firstName,
    middleName,
    displayName,
    primaryPhoneNumber,
    secondaryPhoneNumber,
    email,
    userName,
    role,
    userRoleId,
  } = req.body;
  try {
    Logger.info("Updating User Profile: Status success!");
    const updateProfile = await updateUserProfile(
      id,
      lastName,
      firstName,
      middleName,
      displayName,
      primaryPhoneNumber,
      secondaryPhoneNumber,
      email,
      userName,
      role,
      userRoleId
    );
    return res.status(200).json({
      success: true,
      isAuthenticated: true,
      method: req.method,
      message: "Profile updated successfully!",
      updateProfile: updateProfile,
    });
  } catch (err) {
    Logger.info("Updating User Profile: Status failed!");
    return next(HTTPErrors(404, `${err}`));
  }
});

//? Get All Users
const GetAllUsers = asyncHandler(async (_req, res, next) => {
  try {
    Logger.info("Getting All Users: Status success!");
    const users = await getAllUsers();
    return res.status(200).json(users);
  } catch (err) {
    Logger.info("Getting All Users: Status failed!");
    return next(HTTPErrors(404, `${err}`));
  }
});

//? Get User ById
const GetUserById = asyncHandler(async (req, res, next) => {
  //? Destructure id from req.params
  const { id } = req.params;

  try {
    Logger.info("Getting User ById: Status success!");
    const user = await getUserById(id);
    return res.status(200).json(user);
  } catch (err) {
    Logger.info("Getting User ById: Status failed!");
    return next(HTTPErrors(404, `${err}`));
  }
});

//? Update User Password
const UpdateUserPassword = asyncHandler(async (req, res, next) => {
  //? Destructure id from req.params
  const { id } = req.params;

  //? Destructure req.body
  const { password, confirmPassword } = req.body;
  try {
    Logger.info("Updating User Password: Status success!");
    const updatePassword = await updateUserPassword(
      id,
      password,
      confirmPassword
    );
    return res.status(200).json({
      success: true,
      isAuthenticated: true,
      method: req.method,
      message: "User password updated successfully!",
      updatePassword: updatePassword,
    });
  } catch (err) {
    Logger.info("Updating User Password: Status failed!");
    return next(HTTPErrors(404, `${err}`));
  }
});

//? Update User Photo
const UpdateUserPhoto = asyncHandler(async (req, res, next) => {
  //? Destructure id from req.params
  const { id } = req.params;

  try {
    //? Define photo
    const photo = req.file?.filename;

    Logger.info("Updating User Photo: Status success!");
    const updatePhoto = await updateUserPhoto(id, photo);
    // filePath
    // const filePath = "images/users-photos/";
    // fileName
    // const fileName = `${updatePhoto.photo}`;
    // fullPath
    // const fullPath = filePath + fileName;
    // deleteFile
    // if (fullPath) {
    //   deleteUserPhoto(`${fullPath}`);
    // }
    return res.status(200).json({
      success: true,
      isAuthenticated: true,
      method: req.method,
      message: "User photo updated successfully!",
      updatePhoto: updatePhoto,
    });
  } catch (err) {
    Logger.info("Updating User Photo: Status failed!");
    return next(HTTPErrors(404, `${err}`));
  }
});

//? Update User ById
const UpdateUserById = asyncHandler(async (req, res, next) => {
  //? Destructure id from req.params
  const { id } = req.params;

  //? Destructure req.body
  const {
    lastName,
    firstName,
    middleName,
    displayName,
    primaryPhoneNumber,
    secondaryPhoneNumber,
    email,
    userName,
    role,
    userRoleId,
  } = req.body;
  try {
    Logger.info("Updating User ById: Status success!");
    const updateUser = await updateUserById(
      id,
      lastName,
      firstName,
      middleName,
      displayName,
      primaryPhoneNumber,
      secondaryPhoneNumber,
      email,
      userName,
      role,
      userRoleId
    );
    return res.status(200).json({
      success: true,
      isAuthenticated: true,
      method: req.method,
      message: "User updated successfully!",
      updateUser: updateUser,
    });
  } catch (err) {
    Logger.info("Updating User ById: Status failed!");
    return next(HTTPErrors(404, `${err}`));
  }
});

//? Delete User ById
const DeleteUserById = asyncHandler(async (req, res, next) => {
  //? Destructure id from req.params
  const { id } = req.params;

  try {
    Logger.info("Deleting User ById: Status success!");
    const deleteUser = await deleteUserById(id);
    //? destructure photo from deleteEmployee
    const { photo } = deleteUser;
    //? filePath
    const filePath = "images/";
    //? fileName
    const fileName = `${photo}`;
    //? fullPath
    const fullPath = filePath + fileName;
    //? deleteFile
    if (fullPath) {
      deleteUserPhoto(`${fullPath}`);
    }
    return res.status(200).json({
      success: true,
      isAuthenticated: true,
      method: req.method,
      message: "User deleted successfully!",
      deleteUser: deleteUser,
    });
  } catch (err) {
    Logger.info("Deleting User ById: Status failed!");
    return next(HTTPErrors(404, `${err}`));
  }
});

module.exports = {
  CreateNewUser,
  GetUserProfile,
  UpdateUserProfilePassword,
  UpdateUserProfilePhoto,
  UpdateUserProfile,
  GetAllUsers,
  GetUserById,
  UpdateUserPassword,
  UpdateUserPhoto,
  UpdateUserById,
  DeleteUserById,
};
