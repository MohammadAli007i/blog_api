const jwt = require("jsonwebtoken");
const config = require("../config/config");
const ApiError = require("./ApiError");

const generateToken = (
  userId,
  expiresInMinutes = config.jwt.accessExpirationMinutes,
  secret = config.jwt.secret
) => {
  const payload = {
    sub: userId,
    iat: Math.floor(Date.now() / 1000), // current time in seconds
    exp: Math.floor(Date.now() / 1000) + expiresInMinutes * 60, // expires in seconds
  };
  return jwt.sign(payload, secret);
};

const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, config.jwt.secret);
    return payload;
  } catch (error) {
    throw new ApiError(401, "Invalid token");
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
