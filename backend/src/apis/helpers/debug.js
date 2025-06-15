const debug = require("debug")("MOH-Birth-Registration-System-Backend"),
  name = `${process.env.DEBUG}`;

//? Check if the URL is development
if (process.env.NODE_ENV === "development") {
  debug("booting %o", name);

  const Debug = (req, res) => {
    debug({ method: req.method, url: req.originalUrl });
    res.send({ content: `Welcome to, ${name || "World"}` });
  };

  module.exports = { Debug };
}
