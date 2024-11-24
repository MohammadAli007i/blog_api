const { version } = require("../../package.json");
const config = require("../config/config");

const swaggerDef = {
  openapi: "3.0.0",
  info: {
    title: "Blog API Documentation",
    version,
    description: "API documentation for Blog Management System",
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
    contact: {
      name: "Support",
      email: "support@example.com",
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/api`,
      description: "Development Server",
    },
  ],
  tags: [
    {
      name: "Auth",
      description: "Authentication and authorization operations",
    },
    {
      name: "Blogs",
      description: "Blog operations",
    },
    {
      name: "Comments",
      description: "Comment operations",
    },
  ],
};

module.exports = swaggerDef;
