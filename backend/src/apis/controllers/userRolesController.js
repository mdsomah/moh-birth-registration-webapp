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

//? Create New User Role
const CreateNewUserRole = asyncHandler(async (req, res, next) => {
  //? Destructure req.body
  const { roleName } = req.body;

  try {
    Logger.info("Creating New User Role: Status success!");
    const newUserRole = await createNewUserRole(roleName);
    return res.status(201).json({
      success: true,
      isAuthenticated: true,
      method: req.method,
      message: "Role created successfully!",
      newUserRole: newUserRole,
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
    return res.status(200).json(usersRoles);
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
    return res.status(200).json(userRole);
  } catch (err) {
    Logger.info("Getting User Role ById: Status failed!");
    return next(HTTPErrors(404, `${err}`));
  }
});

//? Update User Role ById
const UpdateUserRoleById = asyncHandler(async (req, res, next) => {
  //? Destructure req.body
  const { roleName } = req.body;

  //? Destructure id from req.params
  const { id } = req.params;

  try {
    Logger.info("Updating User Role ById: Status success!");
    const updateUserRole = await updateUserRoleById(id, roleName);
    return res.status(200).json({
      success: true,
      message: "Role updated successfully!",
      updateUserRole: updateUserRole,
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
    return res.status(200).json({
      success: true,
      message: "Role deleted successfully!",
      deleteUserRole: deleteUserRole,
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
