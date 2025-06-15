const asyncHandler = require("express-async-handler");
const { HTTPErrors } = require("../utils/errorUtils");

const validateInputs = (schema) =>
  asyncHandler(async (req, _res, next) => {
    //? Destructure req.body
    const { encryptedData } = req.body;

    //? Decrypt the encryptedData
    const decryptedData = decrypt(
      encryptedData,
      process.env.ENCRYPTION_KEY,
      process.env.ENCRYPTION_IV
    );

    const validateInputs = decryptedData;

    try {
      await schema.validate(validateInputs);
      return next();
    } catch (err) {
      return next(HTTPErrors(422, `${err.message}`));
    }
  });

module.exports = { validateInputs };
