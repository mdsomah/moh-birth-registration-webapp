require("dotenv").config();
const passport = require("passport");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const RememberMeStrategy = require("passport-remember-me").Strategy;
const bcrypt = require("bcrypt");
const ms = require("ms");
const { Remember_Me_Token } = require("../utils/authUtils");
const { cookieExtractor } = require("../utils/authUtils");
const { HTTPErrors } = require("../utils/errorUtils");
const { decrypt } = require("../utils/decryptUtils");

//? Prisma Client Model
const { prisma } = require("../models/db/database");

//? JWT options
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: `${process.env.REFRESH_TOKEN_SECRET}`,
  issuer: `${process.env.REFRESH_TOKEN_SECRET}`,
};

//? Passport JWT Strategy for Authorization
passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    await prisma.user
      .findFirst({
        where: { id: payload?.sub },
        select: {
          id: true,
          firstName: true,
          middleName: true,
          lastName: true,
          displayName: true,
          userName: true,
          rememberMe: true,
          role: true,
          primaryPhoneNumber: true,
          secondaryPhoneNumber: true,
          email: true,
          password: true,
          photo: true,
          userRole: true,
        },
      })
      .then((user) => {
        if (user) {
          return done(null, user);
        } else {
          return done(HTTPErrors(401, "Not authenticated!"), false);
        }
      })
      .catch((err) => {
        if (err) {
          return done(HTTPErrors(500, `${err}`), false);
        }
      });
  })
);

//? Passport Local Strategy for Authentication
passport.use(
  new LocalStrategy(
    { usernameField: "Username", passwordField: "Password" },
    async (email_username, password, done) => {
      //? Decrypt the email_username and password
      const decryptedEmail = decrypt(
        email_username,
        process.env.ENCRYPTION_KEY,
        process.env.ENCRYPTION_IV
      );
      const decryptedUserName = decrypt(
        email_username,
        process.env.ENCRYPTION_KEY,
        process.env.ENCRYPTION_IV
      );
      const decryptedPassword = decrypt(
        password,
        process.env.ENCRYPTION_KEY,
        process.env.ENCRYPTION_IV
      );
      console.log(
        `Decrypted Email: ${decryptedEmail}, Decrypted UserName: ${decryptedUserName}, Decrypted Password: ${decryptedPassword}`
      );
      await prisma.user
        .findFirst({
          where: {
            OR: [{ email: decryptedEmail }, { userName: decryptedUserName }],
          },
          select: {
            id: true,
            firstName: true,
            middleName: true,
            lastName: true,
            displayName: true,
            userName: true,
            rememberMe: true,
            role: true,
            primaryPhoneNumber: true,
            secondaryPhoneNumber: true,
            email: true,
            password: true,
            photo: true,
            userRole: true,
          },
        })
        .then((user) => {
          if (!user) {
            return done(HTTPErrors(406, "Invalid username!"), false);
          }
          bcrypt.compare(decryptedPassword, user.password).then((result) => {
            if (result) {
              return done(null, user);
            } else {
              return done(HTTPErrors(406, "Invalid password!"), false);
            }
          });
        })
        .catch((err) => {
          if (err) {
            return done(HTTPErrors(500, `${err}`), false);
          }
        });
    }
  )
);

//? Passport RememberMe Strategy for Authentication
passport.use(
  new RememberMeStrategy(
    //? Verifier Async Function
    async (token, done) => {
      await prisma.rememberToken
        .findFirst({
          where: { token: token },
        })
        .then(async (user) => {
          if (user) {
            //? Delete token
            await prisma.rememberToken.delete({
              where: { userId: user.id },
            });
            return done(null, user);
          } else {
            return done(null, false);
          }
        })
        .catch((err) => {
          if (err) {
            return done(HTTPErrors(500, `${err}`), false);
          }
        });
    },

    //? Issuer Async Function
    async (user, done) => {
      const generateToken = Remember_Me_Token(user.id);
      //? Creating 30 days from milliseconds
      const tokenExpiresAt = new Date(Date.now() + ms("30 days"));
      await prisma.rememberToken
        .create({
          data: {
            userId: user.id,
            token: generateToken,
            expiresAt: `${tokenExpiresAt}`,
          },
        })
        .then((token) => {
          if (token) {
            return done(null, token);
          } else {
            return done(null, false);
          }
        })
        .catch((err) => {
          if (err) {
            return done(HTTPErrors(500, `${err}`), false);
          }
        });
    }
  )
);

//? Serialize User
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//? De_Serialize User
passport.deserializeUser(async (id, done) => {
  await prisma.user
    .findFirst({
      where: { id: id },
    })
    .then((user) => done(null, user))
    .catch((err) => done(HTTPErrors(500, `${err}`)));
});

module.exports = { passport };
