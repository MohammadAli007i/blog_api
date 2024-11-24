const jwt = require("jsonwebtoken");
const config = require("../config/config");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");
const { verifyToken } = require("../utils/jwt");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    console.log(token);
    if (!token) {
      throw new ApiError(401, "Please authenticate");
    }

    const decoded = verifyToken(token);
    console.log(decoded);
    const user = await User.findById(decoded.sub);
    console.log(user, "--user--");

    if (!user) {
      throw new ApiError(401, "Please authenticate");
    }

    req.user = user;
    next();
  } catch (error) {
    next(new ApiError(401, "Please authenticate"));
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, "Forbidden");
    }
    next();
  };
};

module.exports = {
  auth,
  authorize,
};
