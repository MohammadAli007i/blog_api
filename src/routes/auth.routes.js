const express = require("express");
const validate = require("../middleware/validate");
const authValidation = require("../validators/auth.validator");
const authController = require("../controllers/authController");
const { auth } = require("../middleware/auth");
const { authLimiter } = require("../middleware/rateLimiter");

const router = express.Router();

router.post(
  "/register",
  authLimiter,
  validate(authValidation.register),
  authController.register
);
router.post(
  "/login",
  authLimiter,
  validate(authValidation.login),
  authController.login
);
router.get("/profile", auth, authController.getProfile);

module.exports = router;
