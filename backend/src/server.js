require("dotenv").config();
const { Debug } = require("./apis/helpers/debug");
const { errorsHandler } = require("./apis/middlewares/errorMiddleware");
const express = require("express");
const { createServer } = require("node:http");
const compression = require("compression");
const { MorganMiddleware } = require("./apis/middlewares/morganMiddleware");
const { Logger } = require("./apis/libs/logger");
const { passport } = require("./apis/config/passportConfig");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const keygrip = require("keygrip");
const keygen = require("keygen");
const cors = require("cors");
const colors = require("colors");
const ms = require("ms");
const PORT = process.env.PORT || 4000;
const app = express();
const server = createServer(app);

//? Rate limitter
const { rateLimitter } = require("./apis/middlewares/rateLimitMiddleware");

//? Rate Slowdown
const { rateSlowdown } = require("./apis/middlewares/rateSlowdownMiddleware");

//? Routes
const authRouter = require("./apis/routes/authRoute");
const usersRoute = require("./apis/routes/usersRoute");
const userRolesRoute = require("./apis/routes/userRolesRoute");
const applicantsRoute = require("./apis/routes/applicantsRoute");
const paymentsRoute = require("./apis/routes/paymentsRoute");
const appointmentsRoute = require("./apis/routes/appointmentsRoute");

//? Prisma Client Model
const { prisma } = require("./apis/models/db/database");

//? CORS Configuration Options
const corsOptions = {
  origins: `${process.env.FRONTEND_URL}`,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
  optionsSuccessStatus: 200,
  credentials: true,
};

//? Keys Generator
const key1 = keygen.url(keygen.medium);
const key2 = keygen.url(keygen.medium);

//? Async Function
async function main() {
  app.set("trust proxy", 1); //? trust first proxy

  //? Initializing and Using Express Middlewares
  app.use(express.json({ type: "application/json" }));
  app.use(express.urlencoded({ extended: false }));
  app.use(compression());
  app.use(MorganMiddleware);
  app.use(cors(corsOptions));
  app.use(cookieParser(`${process.env.COOKIE_SECRET}`));

  //? Creating 30 days from milliseconds
  const cookieSessionExpiresAt = new Date(Date.now() + ms("30 days"));

  //? Initialize cookie session
  app.use(
    cookieSession({
      name: `${process.env.SESSION_NAME}`,
      secret: `${process.env.SESSION_SECRET}`,
      keys: new keygrip([key1, key2], "SHA384", "base64"),
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: cookieSessionExpiresAt,
    })
  );

  //? PassportJS Init
  app.use(passport.initialize());
  app.use(passport.authenticate("session")); //? Authenticate Session
  app.use(passport.session());

  //? Debugging Route
  if (process.env.NODE_ENV === "development") {
    app.use("/api/v1/debugs", Debug);
  }

  //? Rate Limit & Slowdown Test
  app.get("/api/v1/rate-limit-test", rateLimitter, rateSlowdown, (req, res) => {
    res.send({
      success: true,
      isAuthenticated: false,
      method: req.method,
      message: "Testing Express Rate Limit & Rate Slowdown Library!",
    });
  });

  //? Registered APIs Routes
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/users", usersRoute);
  app.use("/api/v1/user/roles", userRolesRoute);
  app.use("/api/v1/applicants", applicantsRoute);
  app.use("/api/v1/payments", paymentsRoute);
  app.use("/api/v1/appointments", appointmentsRoute);
  app.use("/api/v1/images", express.static("images"));
  app.use("/api/v1/uploads", express.static("uploads"));

  //? Catch All Unregistered APIs Routes
  app.all("/*splat", (req, res) => {
    res.status(404).json({
      statusCode: 404,
      method: `${req.method}`,
      message: `Route ${req.originalUrl} not found!`,
    });
  });

  //? Global Error Handler Middleware
  app.use(errorsHandler);

  //? Check if the URL is development
  if (process.env.NODE_ENV === "development") {
    const devBaseURL = `http://localhost:${PORT}`;

    //? Listening on Port 5000
    server.listen(PORT, () =>
      Logger.info(colors.rainbow(`🚀 Server started on ${devBaseURL}`))
    );
  }

  //? Check if the URL is production
  if (process.env.NODE_ENV === "production") {
    const prodBaseURL = `https://birth-registration.moh.gov.lr/:${PORT}`;

    //? Listening on Port 5000
    server.listen(PORT, () =>
      Logger.info(colors.rainbow(`🚀 Server started on ${prodBaseURL}`))
    );
  }
}

main()
  .then(async () => {
    Logger.info(colors.bold.bgBlue("Database Connection Successful!"));
    await prisma.$connect();
  })
  .catch(async (e) => {
    Logger.error(colors.red(e));
    await prisma.$disconnect();
    process.exit(1);
  });
