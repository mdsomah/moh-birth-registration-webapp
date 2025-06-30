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
  try {
    Logger.info("Logging In User: Status success!");

    //? Destructure req.user
    const {
      id,
      lastName,
      firstName,
      middleName,
      displayName,
      primaryPhoneNumber,
      secondaryPhoneNumber,
      email,
      userName,
      rememberMe,
      role,
      photo,
    } = req.user;

    //? Decrypt rememberMe from req.body
    const decryptedRememberMe = decrypt(
      req.body.rememberMe,
      process.env.ENCRYPTION_KEY,
      process.env.ENCRYPTION_IV
    );

    if (req.isAuthenticated()) {
      const accessToken = Access_Token(id);
      const refreshToken = Refresh_Token(id);
      let rememberMe_Token = null;

      if (decryptedRememberMe === true) {
        rememberMe_Token = Remember_Me_Token(id);
        await rememberMeToken(id, rememberMe_Token);
        res.cookie(`${process.env.REMEMBER_TOKEN_NAME}`, rememberMe_Token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          maxAge: cookieExpiresAt,
        });
      }

      //? User Object
      const userOBJ = {
        id: id,
        lastName: lastName,
        firstName: firstName,
        middleName: middleName,
        displayName: displayName,
        primaryPhoneNumber: primaryPhoneNumber,
        secondaryPhoneNumber: secondaryPhoneNumber,
        email: email,
        userName: userName,
        rememberMe: rememberMe,
        role: role,
        photo: photo,
        accessToken: accessToken,
        rememberMe_Token: rememberMe_Token,
      };

      //? Encrypt the userOBJ data
      const encryptedUserOBJ = encrypt(
        userOBJ,
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
          message: "User login successfully!",
          user: encryptedUserOBJ,
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
        message: "User logout successful!",
        user: { id: "", userName: "", role: "" },
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
      lastName,
      firstName,
      middleName,
      displayName,
      primaryPhoneNumber,
      secondaryPhoneNumber,
      email,
      userName,
      rememberMe,
      role,
      photo,
    } = req.user;

    if (req.isAuthenticated()) {
      return res.status(200).json({
        success: true,
        isAuthenticated: true,
        method: req.method,
        message: "User is authenticated!",
        user: {
          id: id,
          lastName: lastName,
          firstName: firstName,
          middleName: middleName,
          displayName: displayName,
          primaryPhoneNumber: primaryPhoneNumber,
          secondaryPhoneNumber: secondaryPhoneNumber,
          email: email,
          userName: userName,
          rememberMe: rememberMe,
          role: role,
          photo: photo,
        },
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
    Logger.info("Refreshing Token: Status failed!");
    return next(HTTPErrors(401, "Refresh token expired or invalid!"));
  }
});

//? Forget User Password
const ForgetUserPassword = asyncHandler(async (req, res, next) => {
  //? Destructure req.body
  const { email } = req.body;
  try {
    Logger.info("Resetting User Password: Status is OK");
    const forgetPassword = await forgetUserPassword(email);
    return res.status(200).json({
      success: true,
      isAuthenticated: false,
      method: req.method,
      message: "A password reset link has been sent to your email address!",
      forgetPassword: forgetPassword,
    });
  } catch (err) {
    Logger.error("Resetting User Password: Status failed!");
    return next(HTTPErrors(404, `${err}`));
  }
});

//? Reset User Password
const ResetUserPassword = asyncHandler(async (req, res, next) => {
  //? Destructure req.body
  const { userId, token, password, confirmPassword } = req.body;
  try {
    Logger.info("Resetting User Password: Status is OK");
    const resetPassword = await resetUserPassword(
      userId,
      token,
      password,
      confirmPassword
    );
    return res.status(200).json({
      success: true,
      isAuthenticated: false,
      method: req.method,
      message: "Password reset successfully!",
      resetPassword: resetPassword,
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
