const morgan = require("morgan");
const { Logger } = require("../libs/logger");

const stream = {
  //? Use the http severity
  write: (message) => Logger.http(message),
};

const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

const MorganMiddleware = morgan(
  ":remote-addr :method :url :status :res[content-length] - :response-time ms",
  { stream, skip }
);

module.exports = { MorganMiddleware };
