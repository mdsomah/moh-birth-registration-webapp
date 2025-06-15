const { slowDown } = require("express-slow-down");
const ms = require("ms");

//? Rate Slow Down timeout in milliseconds
const rateSlowdownTimeout = 1 * 60 * 1000;

const rateSlowdown = slowDown({
  windowMs: ms(`${rateSlowdownTimeout}`),
  delayAfter: 1,
  delayMs: (hits) => hits * hits * 100,
});

module.exports = { rateSlowdown };
