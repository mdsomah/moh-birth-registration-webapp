const bcrypt = require("bcrypt");
const { prisma } = require("../models/db/database");

//? Create New User
const createNewUser = async (
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
) => {
  //? Check if email exist
  const emailExist = await prisma.user.findUnique({
    where: { email: email },
  });
  if (emailExist) {
    throw new Error("Email already exist!");
  }

  //? Check if userName exist
  const userNameExist = await prisma.user.findUnique({
    where: { userName: userName },
  });
  if (userNameExist) {
    throw new Error("User name already exist!");
  }

  const newUser = await prisma.user.create({
    data: {
      lastName: lastName.trim(),
      firstName: firstName.trim(),
      middleName: middleName.trim(),
      displayName: displayName,
      primaryPhoneNumber: primaryPhoneNumber.trim(),
      secondaryPhoneNumber: secondaryPhoneNumber.trim(),
      email: email.toLowerCase().trim(),
      userName: userName.trim(),
      role: role,
      password: (await bcrypt.hash(password, 10)).toString().trim(),
      confirmPassword: (await bcrypt.hash(confirmPassword, 10))
        .toString()
        .trim(),
      photo: photo,
      userRole: {
        connect: { id: userRoleId },
      },
    },
    include: { userRole: true },
  });
  return newUser;
};

//? Get User Profile
const getUserProfile = async (id) => {
  const userProfile = await prisma.user.findFirst({
    where: { id: id },
    include: { userRole: true },
  });
  if (!userProfile) {
    throw new Error(`User profile with this id: ${id} not found!`);
  }
  return userProfile;
};

//? Update User Profile Password
const updateUserProfilePassword = async (id, password, confirmPassword) => {
  const updateProfilePassword = await prisma.user.update({
    where: { id: id },
    data: {
      password: (await bcrypt.hash(password, 10)).toString().trim(),
      confirmPassword: (await bcrypt.hash(confirmPassword, 10))
        .toString()
        .trim(),
    },
    include: { userRole: true },
  });
  if (!updateProfilePassword) {
    throw new Error(`User with this id: ${id} not found!`);
  }
  return updateProfilePassword;
};

//? Update User Profile Photo
const updateUserProfilePhoto = async (id, photo) => {
  const updateProfilePhoto = await prisma.user.update({
    where: { id: id },
    data: {
      photo: photo,
    },
    include: { userRole: true },
  });
  if (!updateProfilePhoto) {
    throw new Error(`User with this id: ${id} not found!`);
  }
  return updateProfilePhoto;
};

//? Update User Profile
const updateUserProfile = async (
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
) => {
  const updateProfile = await prisma.user.update({
    where: { id: id },
    data: {
      lastName: lastName.trim(),
      firstName: firstName.trim(),
      middleName: middleName.trim(),
      displayName: displayName,
      primaryPhoneNumber: primaryPhoneNumber.trim(),
      secondaryPhoneNumber: secondaryPhoneNumber.trim(),
      email: email.toLowerCase().trim(),
      userName: userName.trim(),
      role: role,
      userRole:
        userRoleId !== ""
          ? {
              connect: { id: userRoleId },
            }
          : {},
    },
    include: { userRole: true },
  });
  if (!updateProfile) {
    throw new Error(`User with this id: ${id} not found!`);
  }
  return updateProfile;
};

//? Get All Users
const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    include: { userRole: true },
  });
  if (!users) {
    throw new Error("Users not found!");
  }
  return users;
};

//? Get User ById
const getUserById = async (id) => {
  const user = await prisma.user.findFirst({
    where: { id: id },
    include: { userRole: true },
  });
  if (!user) {
    throw new Error(`User with this id: ${id} not found!`);
  }
  return user;
};

//? Update User Password
const updateUserPassword = async (id, password, confirmPassword) => {
  const updatePassword = await prisma.user.update({
    where: { id: id },
    data: {
      password: (await bcrypt.hash(password, 10)).toString().trim(),
      confirmPassword: (await bcrypt.hash(confirmPassword, 10))
        .toString()
        .trim(),
    },
    include: { userRole: true },
  });
  if (!updatePassword) {
    throw new Error(`User with this id: ${id} not found!`);
  }
  return updatePassword;
};

//? Update User Photo
const updateUserPhoto = async (id, photo) => {
  const updatePhoto = await prisma.user.update({
    where: { id: id },
    data: {
      photo: photo,
    },
    include: { userRole: true },
  });
  if (!updatePhoto) {
    throw new Error(`User with this id: ${id} not found!`);
  }
  return updatePhoto;
};

//? Update User ById
const updateUserById = async (
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
) => {
  const updateUser = await prisma.user.update({
    where: { id: id },
    data: {
      lastName: lastName.trim(),
      firstName: firstName.trim(),
      middleName: middleName.trim(),
      displayName: displayName,
      primaryPhoneNumber: primaryPhoneNumber.trim(),
      secondaryPhoneNumber: secondaryPhoneNumber.trim(),
      email: email.toLowerCase().trim(),
      userName: userName.trim(),
      role: role,
      userRole:
        userRoleId !== ""
          ? {
              connect: { id: userRoleId },
            }
          : {},
    },
    include: { userRole: true },
  });
  if (!updateUser) {
    throw new Error(`User with this id: ${id} not found!`);
  }
  return updateUser;
};

//? Delete User ById
const deleteUserById = async (id) => {
  const deleteUser = await prisma.user.delete({
    where: { id: id },
    include: { userRole: true },
  });
  if (!deleteUser) {
    throw new Error(`User with this id: ${id} not found!`);
  }
  return deleteUser;
};

module.exports = {
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
};
