const JWT = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { HTTPErrors } = require("../utils/errorUtils");
const { prisma } = require("../models/db/database");

const verifyToken = asyncHandler(async (req, _res, next) => {
  try {
    const refreshToken = req.cookies[`${process.env.TOKEN_NAME}`];
    if (!refreshToken) {
      return next(HTTPErrors(401, "Unauthorized! Refresh token required!"));
    }

    const authHeader = req.header("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return next(HTTPErrors(401, "Unauthorized! Access token required!"));
    }

    const accessToken = authHeader && authHeader.split("Bearer ")[1];

    //? Verify accessToken
    const decoded = JWT.verify(
      accessToken,
      `${process.env.ACCESS_TOKEN_SECRET}`
    );

    req.user = await prisma.user.findFirst({
      where: { id: decoded?.sub },
    });
    next();
  } catch (err) {
    return next(HTTPErrors(401, "Access token expired or invalid!"));
  }
});

module.exports = { verifyToken };
