const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDefinition = require("../docs/swaggerDef");

const router = express.Router();

const options = {
  swaggerDefinition,
  apis: ["src/docs/*.yml", "src/docs/components.yml", "src/docs/paths/*.yml"],
};

const specs = swaggerJsdoc(options);

router.use("/", swaggerUi.serve);
router.get(
  "/",
  swaggerUi.setup(specs, {
    explorer: true,
    customCss: ".swagger-ui .topbar { display: none }",
  })
);

module.exports = router;
