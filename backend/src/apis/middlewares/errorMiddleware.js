const HTTPErrors = require("http-errors");
const HTTPStatuses = require("statuses");
const colors = require("colors");
const { Logger } = require("../libs/logger");

const errorsHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  Logger.error(colors.bold.red(err instanceof HTTPErrors.HttpError));
  const errStatus = err instanceof HTTPErrors.HttpError ? err?.status : 500;
  const errMsg =
    err instanceof HTTPErrors.HttpError && err?.message.includes("Error:")
      ? err?.message.slice(7)
      : err instanceof HTTPErrors.HttpError && !err?.message.includes("Error:")
      ? err?.message
      : "Something went wrong!";
  const statusCode = parseInt(errStatus, 10);
  const statusName = HTTPStatuses(statusCode);
  return res.status(statusCode).json({
    success: false,
    error: statusName,
    code: statusCode,
    method: req.method,
    message: errMsg,
    stack: process.env.NODE_ENV === "development" ? err?.stack : {},
  });
};

module.exports = { errorsHandler };
