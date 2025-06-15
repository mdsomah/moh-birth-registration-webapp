const httpErrors = require("http-errors");

const HTTPErrors = (errStatus, errMessage) => {
  return httpErrors(errStatus, `${errMessage}`);
};

module.exports = { HTTPErrors };
