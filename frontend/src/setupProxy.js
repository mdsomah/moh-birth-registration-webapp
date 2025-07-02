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

//? Applicants
const applicantsProxy = {
  target: `${process.env.REACT_APP_BACKEND_URL}/api/v1`,
  changeOrigin: true,
};

//? Appointments
const appointmentsProxy = {
  target: `${process.env.REACT_APP_BACKEND_URL}/api/v1`,
  changeOrigin: true,
};

//? Payments
const paymentsProxy = {
  target: `${process.env.REACT_APP_BACKEND_URL}/api/v1`,
  changeOrigin: true,
};

//? Images Upload
const imagesProxy = {
  target: `${process.env.REACT_APP_BACKEND_URL}/api/v1`,
  changeOrigin: true,
};

//? Uploads Upload
const uploadsProxy = {
  target: `${process.env.REACT_APP_BACKEND_URL}/api/v1`,
  changeOrigin: true,
};

//? NIR APIs
const nirAPIsProxy = {
  target: `${process.env.REACT_APP_NIR_APIS_URL}`,
  changeOrigin: true,
};

module.exports = function (app) {
  app.use("/auth", createProxyMiddleware(authProxy));
  app.use("/users", createProxyMiddleware(usersProxy));
  app.use("/user/roles", createProxyMiddleware(userRolesProxy));
  app.use("/applicants", createProxyMiddleware(applicantsProxy));
  app.use("/appointments", createProxyMiddleware(appointmentsProxy));
  app.use("/payments", createProxyMiddleware(paymentsProxy));
  app.use("/images", createProxyMiddleware(imagesProxy));
  app.use("/uploads", createProxyMiddleware(uploadsProxy));
  app.use("/api", createProxyMiddleware(nirAPIsProxy));
};
