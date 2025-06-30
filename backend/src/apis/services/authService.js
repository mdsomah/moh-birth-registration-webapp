const bcrypt = require("bcrypt");
const crypto = require("crypto");
const ms = require("ms");
const { prisma } = require("../models/db/database");
const { mailTemplate, passwordResetEmail } = require("../emails/resetPassword");

//? Remember Me Token
const rememberMeToken = async (id, rememberMe_Token) => {
  //? Check if user id exist
  const user = await prisma.user.findUnique({
    where: { id: id },
  });
  if (!user) {
    throw new Error("User does not exist!");
  }

  //? Check if token exist
  const token = await prisma.rememberToken.findUnique({
    where: { userId: user.id },
  });
  if (token) {
    //? Delete token
    await prisma.rememberToken.delete({
      where: { userId: user.id },
    });
  }

  //? Creating 30 days from milliseconds
  const tokenExpiresAt = new Date(Date.now() + ms("30 days"));

  const rememberMe = await prisma.rememberToken.create({
    data: {
      userId: id,
      token: rememberMe_Token,
      expiresAt: `${tokenExpiresAt}`,
    },
  });

  return rememberMe;
};

//? User Refresh Token
const userRefreshToken = async (id) => {
  //? Find user by id
  const user = await prisma.user.findFirst({
    where: { id: id },
  });
  if (!user) {
    throw new Error("User not found!");
  }
  return user;
};

//? Forget User Password
const forgetUserPassword = async (email) => {
  //? Check if user email exist
  const user = await prisma.user.findUnique({
    where: { email: email },
  });
  if (!user) {
    throw new Error(
      "Email address does not exist! Please provide a valid email address!"
    );
  }

  //? Check if token exist
  const token = await prisma.passwordResetToken.findUnique({
    where: { userId: user.id },
  });
  if (token) {
    //? Delete token
    await prisma.passwordResetToken.delete({
      where: { userId: user.id },
    });
  }

  const resetToken = crypto.randomBytes(64).toString("hex");
  const tokenExpiresAt = new Date(Date.now() + ms("1h"));
  const forgetPassword = await prisma.passwordResetToken.create({
    data: {
      userId: user.id,
      token: (await bcrypt.hash(resetToken, 10)).toString(),
      expiresAt: `${tokenExpiresAt}`,
    },
  });

  const displayName = user.displayName;
  const link = `${process.env.FRONTEND_URL}/reset-password?userId=${forgetPassword.userId}&token=${forgetPassword.token}`;
  const mailOptions = {
    email: user.email,
    subject: "Reset Password Instructions",
    message: mailTemplate(
      `Hi ${displayName},`,
      "We have received a request to reset your password for your account. Please reset your password using the link below.",
      `${link}`,
      "Reset Password"
    ),
  };
  await passwordResetEmail(mailOptions);

  return forgetPassword;
};

//? Reset User Password
const resetUserPassword = async (userId, token, password, confirmPassword) => {
  //? Check if user id exist
  const user = await prisma.user.findFirst({
    where: { id: userId },
  });
  if (!user) {
    throw new Error("Invalid link or expired token!");
  }

  //? Check if token exist
  const passwordToken = await prisma.passwordResetToken.findFirst({
    where: { token: token },
  });
  if (!passwordToken) {
    throw new Error("Invalid link or expired token!");
  }

  //? Check if the token is invalid or expired
  const currentDate = new Date(Date.now() + ms("1h"));
  const expiredToken = await prisma.passwordResetToken.findFirst({
    where: { expiresAt: { gt: `${currentDate}` } },
  });
  if (expiredToken) {
    throw new Error("Invalid link or expired token!");
  }

  if (user.id === userId && passwordToken.token === token) {
    const resetPassword = await prisma.user.update({
      where: { id: userId },
      data: {
        password: (await bcrypt.hash(password, 10)).toString().trim(),
        confirmPassword: (await bcrypt.hash(confirmPassword, 10))
          .toString()
          .trim(),
      },
    });
    //? Delete Token
    await prisma.passwordResetToken.delete({
      where: { userId: userId },
    });

    return resetPassword;
  }
};

module.exports = {
  rememberMeToken,
  userRefreshToken,
  forgetUserPassword,
  resetUserPassword,
};
