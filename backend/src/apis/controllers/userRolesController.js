require("dotenv").config();
const { Logger } = require("../libs/logger");
const asyncHandler = require("express-async-handler");
const { HTTPErrors } = require("../utils/errorUtils");
const {
  createNewUserRole,
  getAllUsersRoles,
  getUserRoleById,
  updateUserRoleById,
  deleteUserRoleById,
} = require("../services/userRolesService");
const { encrypt } = require("../utils/encryptUtils");
const { decrypt } = require("../utils/decryptUtils");

//? Create New User Role
const CreateNewUserRole = asyncHandler(async (req, res, next) => {
  //? Destructure req.body
  const { encryptedData } = req.body;

  //? Decrypt the encryptedData
  const decryptedNewUserRole = decrypt(
    encryptedData,
    process.env.ENCRYPTION_KEY,
    process.env.ENCRYPTION_IV
  );

  //? Destructure decryptedNewUserRole data
  const { roleName } = decryptedNewUserRole;

  try {
    Logger.info("Creating New User Role: Status success!");
    const newUserRole = await createNewUserRole(roleName);
    //? Encrypt the newUserRole data
    const encryptedNewUserRole = encrypt(
      newUserRole,
      process.env.ENCRYPTION_KEY,
      process.env.ENCRYPTION_IV
    );
    return res.status(201).json({
      success: true,
      isAuthenticated: true,
      method: req.method,
      message: "Role created successfully!",
      encryptedNewUserRole: encryptedNewUserRole,
    });
  } catch (err) {
    Logger.error("Creating New User Role: Status failed!");
    return next(HTTPErrors(500, `${err}`));
  }
});

//? Get All Users Roles
const GetAllUsersRoles = asyncHandler(async (_req, res, next) => {
  try {
    Logger.info("Getting All Users Roles: Status success!");
    const usersRoles = await getAllUsersRoles();
    //? Encrypt the usersRoles data
    const encryptedUsersRoles = encrypt(
      usersRoles,
      process.env.ENCRYPTION_KEY,
      process.env.ENCRYPTION_IV
    );
    return res.status(200).json(encryptedUsersRoles);
  } catch (err) {
    Logger.info("Getting All Users Roles: Status failed!");
    return next(HTTPErrors(404, `${err}`));
  }
});

//? Get User Role ById
const GetUserRoleById = asyncHandler(async (req, res, next) => {
  //? Destructure id from req.params
  const { id } = req.params;

  try {
    Logger.info("Getting User Role ById: Status success!");
    const userRole = await getUserRoleById(id);
    //? Encrypt the userRole data
    const encryptedUserRole = encrypt(
      userRole,
      process.env.ENCRYPTION_KEY,
      process.env.ENCRYPTION_IV
    );
    return res.status(200).json(encryptedUserRole);
  } catch (err) {
    Logger.info("Getting User Role ById: Status failed!");
    return next(HTTPErrors(404, `${err}`));
  }
});

//? Update User Role ById
const UpdateUserRoleById = asyncHandler(async (req, res, next) => {
  //? Destructure req.body
  const { encryptedData } = req.body;

  //? Decrypt the encryptedData
  const decryptedUpdateRole = decrypt(
    encryptedData,
    process.env.ENCRYPTION_KEY,
    process.env.ENCRYPTION_IV
  );

  //? Destructure decryptedUpdateRole data
  const { roleName } = decryptedUpdateRole;

  //? Destructure id from req.params
  const { id } = req.params;

  try {
    Logger.info("Updating User Role ById: Status success!");
    const updateUserRole = await updateUserRoleById(id, roleName);
    //? Encrypt the updatedUserRole data
    const encryptedUpdateUserRole = encrypt(
      updateUserRole,
      process.env.ENCRYPTION_KEY,
      process.env.ENCRYPTION_IV
    );
    return res.status(200).json({
      success: true,
      message: "Role updated successfully!",
      encryptedUpdateUserRole: encryptedUpdateUserRole,
    });
  } catch (err) {
    Logger.info("Updating User Role ById: Status failed!");
    return next(HTTPErrors(500, `${err}`));
  }
});

//? Delete User Role ById
const DeleteUserRoleById = asyncHandler(async (req, res, next) => {
  //? Destructure id from req.params
  const { id } = req.params;

  try {
    Logger.info("Deleting User Role ById: Status success!");
    const deleteUserRole = await deleteUserRoleById(id);
    //? Encrypt the deleteUserRole data
    const encryptedDeleteUserRole = encrypt(
      deleteUserRole,
      process.env.ENCRYPTION_KEY,
      process.env.ENCRYPTION_IV
    );
    return res.status(200).json({
      success: true,
      message: "Role deleted successfully!",
      encryptedDeleteUserRole: encryptedDeleteUserRole,
    });
  } catch (err) {
    Logger.info("Deleting User Role ById: Status failed!");
    return next(HTTPErrors(400, `${err}`));
  }
});

module.exports = {
  CreateNewUserRole,
  GetAllUsersRoles,
  GetUserRoleById,
  UpdateUserRoleById,
  DeleteUserRoleById,
};
