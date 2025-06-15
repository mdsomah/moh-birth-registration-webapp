const { rateLimit } = require("express-rate-limit");
const ms = require("ms");

//? Rate limit timeout in milliseconds
const rateLimitTimeout = 1 * 60 * 1000;

//? Rate limit middleware
const rateLimitter = rateLimit({
  windowMs: ms(`${rateLimitTimeout}`),
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many request, please try again later!",
});

module.exports = { rateLimitter };
