const { createProxyMiddleware } = require("http-proxy-middleware");

//? Auth
const authProxy = {
  target: `${process.env.REACT_APP_BACKEND_URL}/api/v1`,
  changeOrigin: true,
};

//? Users
const usersProxy = {
  target: `${process.env.REACT_APP_BACKEND_URL}/api/v1`,
  changeOrigin: true,
};

//? User Roles
const userRolesProxy = {
  target: `${process.env.REACT_APP_BACKEND_URL}/api/v1`,
  changeOrigin: true,
};

//? Images Upload
const imagesProxy = {
  target: `${process.env.REACT_APP_BACKEND_URL}/api/v1`,
  changeOrigin: true,
};

//? Applicants
const applicantsProxy = {
  target: `${process.env.REACT_APP_BACKEND_URL}/api/v1`,
  changeOrigin: true,
};

module.exports = function (app) {
  app.use("/auth", createProxyMiddleware(authProxy));
  app.use("/users", createProxyMiddleware(usersProxy));
  app.use("/user/roles", createProxyMiddleware(userRolesProxy));
  app.use("/images", createProxyMiddleware(imagesProxy));
  app.use("/applicants", createProxyMiddleware(applicantsProxy));
};
