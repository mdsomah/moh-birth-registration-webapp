const asyncHandler = require("express-async-handler");
const { HTTPErrors } = require("../utils/errorUtils");
const { decrypt } = require("../utils/decryptUtils");

const validateInputs = (schema) =>
  asyncHandler(async (req, _res, next) => {
    //? Decrypt the encryptedData
    const decryptedData = !req.body.encryptedData
      ? null
      : decrypt(
          req.body.encryptedData,
          process.env.ENCRYPTION_KEY,
          process.env.ENCRYPTION_IV
        );

    //? Decrypt the encryptedUsername
    const decryptedUsername = !req.body.Username
      ? null
      : decrypt(
          req.body.Username,
          process.env.ENCRYPTION_KEY,
          process.env.ENCRYPTION_IV
        );

    //? Decrypt the encryptedPassword
    const decryptedPassword = !req.body.Password
      ? null
      : decrypt(
          req.body.Password,
          process.env.ENCRYPTION_KEY,
          process.env.ENCRYPTION_IV
        );

    //? Decrypt the encryptedRememberMe
    const decryptedRememberMe = !req.body.rememberMe
      ? null
      : decrypt(
          req.body.rememberMe,
          process.env.ENCRYPTION_KEY,
          process.env.ENCRYPTION_IV
        );

    //? User Login Details
    const userLoginDetails = {
      Username: decryptedUsername,
      Password: decryptedPassword,
      rememberMe: decryptedRememberMe,
    };

    // const validateInputs = req.body;
    const validateInputs = !userLoginDetails ? decryptedData : userLoginDetails;

    try {
      await schema.validate(validateInputs);
      return next();
    } catch (err) {
      return next(HTTPErrors(422, `${err.message}`));
    }
  });

module.exports = { validateInputs };
