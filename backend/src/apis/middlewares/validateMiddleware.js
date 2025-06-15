const asyncHandler = require("express-async-handler");
const { HTTPErrors } = require("../utils/errorUtils");

const validateInputs = (schema) =>
  asyncHandler(async (req, _res, next) => {
    const validateInputs = req.body;
    try {
      await schema.validate(validateInputs, {
        abortEarly: false,
        stripUnknown: true,
      });
      return next();
    } catch (err) {
      return next(HTTPErrors(422, `${err.errors}`));
    }
  });

module.exports = { validateInputs };
