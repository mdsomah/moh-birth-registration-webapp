require("dotenv").config();
const { Logger } = require("../libs/logger");
const JWT = require("jsonwebtoken");
const ms = require("ms");
const asyncHandler = require("express-async-handler");
const { HTTPErrors } = require("../utils/errorUtils");
const {
  Access_Token,
  Refresh_Token,
  Remember_Me_Token,
} = require("../utils/authUtils");
const {
  rememberMeToken,
  userRefreshToken,
  forgetUserPassword,
  resetUserPassword,
} = require("../services/authService");
const { encrypt } = require("../utils/encryptUtils");
const { decrypt } = require("../utils/decryptUtils");

//? Creating 30 days from milliseconds
const cookieExpiresAt = new Date(
  Date.now() + ms(`${process.env.REFRESH_TOKEN_LIFE}`)
);

//? Authenticate & Login User
const Login = asyncHandler(async (req, res, next) => {
  //? Destructure req.body
  const { rememberMe } = req.body;

  //? Decrypt the encryptedData
  const decryptedRemembeMe = decrypt(
    rememberMe,
    process.env.ENCRYPTION_KEY,
    process.env.ENCRYPTION_IV
  );

  //? Destructure req.user
  const {
    id,
    firstName,
    middleName,
    lastName,
    displayName,
    userName,
    role,
    primaryPhoneNumber,
    secondaryPhoneNumber,
    email,
    photo,
    uiLanguage,
    uiLanguageCode,
    userRole,
    myAccountId,
  } = req.user;

  try {
    Logger.info("Logging In User: Status success!");
    if (req.isAuthenticated()) {
      const accessToken = Access_Token(id);
      const refreshToken = Refresh_Token(id);

      if (decryptedRemembeMe === true) {
        const generateToken = Remember_Me_Token(id);
        await rememberMeToken(id, generateToken);
        res.cookie(`${process.env.REMEMBER_TOKEN_NAME}`, generateToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          maxAge: cookieExpiresAt,
        });
      }
      //? Create user object
      const user = {
        id: id,
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        displayName: displayName,
        userName: userName,
        rememberMe: decryptedRemembeMe,
        role: role,
        primaryPhoneNumber: primaryPhoneNumber,
        secondaryPhoneNumber: secondaryPhoneNumber,
        email: email,
        photo: photo,
        uiLanguage: uiLanguage,
        uiLanguageCode: uiLanguageCode,
        userRole: userRole,
        myAccountId: myAccountId,
        accessToken: accessToken,
      };
      //? Encrypt user object
      const encryptedUser = encrypt(
        user,
        process.env.ENCRYPTION_KEY,
        process.env.ENCRYPTION_IV
      );
      req.session[`${process.env.TOKEN_NAME}`] = refreshToken;
      return res
        .cookie(`${process.env.TOKEN_NAME}`, refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          maxAge: cookieExpiresAt,
        })
        .header("Authorization", accessToken)
        .status(200)
        .json({
          success: true,
          isAuthenticated: true,
          method: req.method,
          message: `${displayName} login successfully!`,
          user: encryptedUser,
        });
    }
  } catch (err) {
    Logger.error("Logging In User: Status failed!");
    return next(HTTPErrors(500, `${err}`));
  }
});

//? Logout Authenticated User
const Logout = asyncHandler(async (req, res, next) => {
  try {
    Logger.info("Logging Out User: Status success!");

    req.session = null;
    return res
      .clearCookie(`${process.env.REMEMBER_TOKEN_NAME}`, { httpOnly: true })
      .clearCookie(`${process.env.TOKEN_NAME}`, { httpOnly: true })
      .status(200)
      .json({
        success: true,
        isAuthenticated: false,
        method: req.method,
        message: "Logout successful!",
        user: {
          id: "",
          userName: "",
          role: "",
          userRole: "",
          myAccountId: "",
          accessToken: "",
        },
      });
  } catch (err) {
    Logger.error("Logging Out User: Status failed!");
    return next(HTTPErrors(500, `${err}`));
  }
});

//? Get Authenticated User
const GetAuthenticatedUser = asyncHandler(async (req, res, next) => {
  try {
    Logger.info("Getting Authenticated User: Status success!");
    if (!req.user) {
      return next(HTTPErrors(401, "Unauthenticated!"));
    }

    //? Destructure req.user
    const {
      id,
      firstName,
      middleName,
      lastName,
      displayName,
      userName,
      rememberMe,
      role,
      primaryPhoneNumber,
      secondaryPhoneNumber,
      email,
      photo,
      uiLanguage,
      uiLanguageCode,
      userRole,
      myAccountId,
    } = req.user;

    if (req.isAuthenticated()) {
      //? Create user object
      const user = {
        id: id,
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        displayName: displayName,
        userName: userName,
        rememberMe: rememberMe,
        role: role,
        primaryPhoneNumber: primaryPhoneNumber,
        secondaryPhoneNumber: secondaryPhoneNumber,
        email: email,
        photo: photo,
        uiLanguage: uiLanguage,
        uiLanguageCode: uiLanguageCode,
        userRole: userRole,
        myAccountId: myAccountId,
      };
      //? Encrypt user object
      const encryptedAuthUser = encrypt(
        user,
        process.env.ENCRYPTION_KEY,
        process.env.ENCRYPTION_IV
      );
      return res.status(200).json({
        success: true,
        isAuthenticated: true,
        method: req.method,
        message: `${displayName} is authenticated!`,
        user: encryptedAuthUser,
      });
    }
  } catch (err) {
    Logger.error("Getting Authenticated User: Status failed!");
    return next(HTTPErrors(401, `${err}`));
  }
});

//? Refresh Token
const RefreshToken = asyncHandler(async (req, res, next) => {
  try {
    Logger.info("Refreshing Token: Status success!");
    const refreshToken = req.cookies[`${process.env.TOKEN_NAME}`];
    if (!refreshToken) {
      return next(HTTPErrors(401, "Access denied! Refresh token missing!"));
    }

    const authHeader = req.header("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return next(HTTPErrors(401, "Access denied! Access token missing!"));
    }

    //? Verify refreshToken
    const decodedRefreshToken = JWT.verify(
      refreshToken,
      `${process.env.REFRESH_TOKEN_SECRET}`
    );

    const user = await userRefreshToken(decodedRefreshToken?.sub);

    //? Remove stale token
    res.clearCookie(`${process.env.TOKEN_NAME}`, { httpOnly: true });

    const newAccessToken = Access_Token(decodedRefreshToken?.sub);
    const newRefreshToken = Refresh_Token(user?.id);

    req.session[`${process.env.TOKEN_NAME}`] = newRefreshToken;
    return res
      .cookie(`${process.env.TOKEN_NAME}`, newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: cookieExpiresAt,
      })
      .header("Authorization", newAccessToken)
      .status(200)
      .json({
        success: true,
        isAuthenticated: true,
        method: req.method,
        message: "New access token generated!",
        newAccessToken,
      });
  } catch (err) {
    Logger.error("Refreshing Token: Status failed!");
    return next(HTTPErrors(401, "Refresh token expired or invalid!"));
  }
});

//? Forget User Password
const ForgetUserPassword = asyncHandler(async (req, res, next) => {
  //? Destructure req.body
  const { encryptedData } = req.body;

  //? Decrypt the encryptedData
  const decryptedEmail = decrypt(
    encryptedData,
    process.env.ENCRYPTION_KEY,
    process.env.ENCRYPTION_IV
  );

  //? Destructure decryptedEmail
  const { email } = decryptedEmail;

  try {
    Logger.info("Resetting User Password: Status success!");
    const forgetPassword = await forgetUserPassword(email);
    //? Encrypt the forgetPassword data
    const encryptedForgetPassword = encrypt(
      forgetPassword,
      process.env.ENCRYPTION_KEY,
      process.env.ENCRYPTION_IV
    );
    return res.status(200).json({
      success: true,
      isAuthenticated: false,
      method: req.method,
      message: "A password reset link has been sent to your email address!",
      encryptedForgetPassword: encryptedForgetPassword,
    });
  } catch (err) {
    Logger.error("Resetting User Password: Status failed!");
    return next(HTTPErrors(404, `${err}`));
  }
});

//? Reset User Password
const ResetUserPassword = asyncHandler(async (req, res, next) => {
  //? Destructure req.body
  const { encryptedData } = req.body;

  //? Decrypt the encryptedData
  const decryptedResetPassword = decrypt(
    encryptedData,
    process.env.ENCRYPTION_KEY,
    process.env.ENCRYPTION_IV
  );

  //? Destructure decryptedResetPassword
  const { userId, token, password, confirmPassword } = decryptedResetPassword;

  try {
    Logger.info("Resetting User Password: Status success!");
    const resetPassword = await resetUserPassword(
      userId,
      token,
      password,
      confirmPassword
    );
    //? Encrypt the resetPassword data
    const encryptedResetPassword = encrypt(
      resetPassword,
      process.env.ENCRYPTION_KEY,
      process.env.ENCRYPTION_IV
    );
    return res.status(200).json({
      success: true,
      isAuthenticated: false,
      method: req.method,
      message: "Password reset successfully!",
      encryptedResetPassword: encryptedResetPassword,
    });
  } catch (err) {
    Logger.error("Resetting User Password: Status failed!");
    return next(HTTPErrors(400, `${err}`));
  }
});

module.exports = {
  Login,
  Logout,
  GetAuthenticatedUser,
  RefreshToken,
  ForgetUserPassword,
  ResetUserPassword,
};
