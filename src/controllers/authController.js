const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { generateToken } = require("../utils/jwt");
const User = require("../models/User");

const register = catchAsync(async (req, res) => {
  const { email } = req.body;

  if (await User.findOne({ email })) {
    throw new ApiError(400, "Email already taken");
  }

  const user = await User.create(req.body);
  const token = generateToken(user.id);

  res.status(200).send({ user, token });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(401, "Incorrect email or password");
  }

  const token = generateToken(user.id);
  res.send({ user, token });
});

const getProfile = catchAsync(async (req, res) => {
  res.send(req.user);
});

module.exports = {
  register,
  login,
  getProfile,
};
