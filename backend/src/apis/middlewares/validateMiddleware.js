const asyncHandler = require("express-async-handler");
const { HTTPErrors } = require("../utils/errorUtils");

const validateInputs = (schema) =>
  asyncHandler(async (req, _res, next) => {
    //? Decrypt the encryptedData
    const validateInputs = req.body;

    try {
      await schema.validate(validateInputs);
      return next();
    } catch (err) {
      return next(HTTPErrors(422, `${err.message}`));
    }
  });

module.exports = { validateInputs };
