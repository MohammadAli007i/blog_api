// src/routes/index.js
const express = require("express");
const authRoute = require("./auth.routes");
const blogRoute = require("./blog.route");
const commentRoute = require("./comment.route");
const docsRoute = require("./docs.route");
const config = require("../config/config");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/blogs",
    route: blogRoute,
  },
  {
    path: "/blogs",
    route: commentRoute,
  },
];

// Add documentation route in development environment
if (config.env === "development") {
  defaultRoutes.push({
    path: "/docs",
    route: docsRoute,
  });
}

// Register all routes
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
