const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const genToken = crypto.randomBytes(64).toString("hex");
const hashToken = () => bcrypt.hash(genToken, 10).toString();
//? console.log(hashToken());

//? Cookie Extractor Function
const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies[`${process.env.TOKEN_NAME}`];
  }
  return token;
};

//? JWT Sign Access_Token
const Access_Token = (userId) => {
  return JWT.sign(
    {
      iss: `${process.env.ACCESS_TOKEN_SECRET}`,
      sub: userId,
    },
    `${process.env.ACCESS_TOKEN_SECRET}`,
    { expiresIn: `${process.env.ACCESS_TOKEN_LIFE}` }
  );
};

//? JWT Sign Refresh_Token
const Refresh_Token = (userId) => {
  return JWT.sign(
    {
      iss: `${process.env.REFRESH_TOKEN_SECRET}`,
      sub: userId,
    },
    `${process.env.REFRESH_TOKEN_SECRET}`,
    { expiresIn: `${process.env.REFRESH_TOKEN_LIFE}` }
  );
};

//? JWT Sign Refresh_Token
const Remember_Me_Token = (userId) => {
  return JWT.sign(
    {
      iss: `${process.env.REMEMBER_ME_TOKEN_SECRET}`,
      sub: userId,
    },
    `${process.env.REMEMBER_ME_TOKEN_SECRET}`,
    { expiresIn: `${process.env.REMEMBER_ME_TOKEN_LIFE}` }
  );
};

module.exports = {
  cookieExtractor,
  Access_Token,
  Refresh_Token,
  Remember_Me_Token,
};
