const { prisma } = require("../models/db/database");

//? Create New User Role
const createNewUserRole = async (roleName) => {
  const newUserRole = await prisma.userRole.create({
    data: {
      roleName: roleName,
    },
    include: { users: true },
  });
  return newUserRole;
};

//? Get All Users Roles
const getAllUsersRoles = async () => {
  const usersRoles = await prisma.userRole.findMany({
    include: { users: true },
  });
  if (!usersRoles) {
    throw new Error("Users roles not found!");
  }
  return usersRoles;
};

//? Get User Role ById
const getUserRoleById = async (id) => {
  const userRole = await prisma.userRole.findFirst({
    where: { id: id },
    include: { users: true },
  });
  if (!userRole) {
    throw new Error(`User role with this id: ${id} not found!`);
  }
  return userRole;
};

//? Update User Role ById
const updateUserRoleById = async (id, roleName) => {
  const updateUserRole = await prisma.userRole.update({
    where: { id: id },
    data: {
      roleName: roleName,
    },
    include: { users: true },
  });
  if (!updateUserRole) {
    throw new Error(`User role with this id: ${id} not found!`);
  }
  return updateUserRole;
};

//? Delete User Role ById
const deleteUserRoleById = async (id) => {
  const deleteUserRole = await prisma.userRole.delete({
    where: { id: id },
    include: { users: true },
  });
  if (!deleteUserRole) {
    throw new Error(`User role with this id: ${id} not found!`);
  }
  return deleteUserRole;
};

module.exports = {
  createNewUserRole,
  getAllUsersRoles,
  getUserRoleById,
  updateUserRoleById,
  deleteUserRoleById,
};
