const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");
const sendEmail = require("../utils/sendEmail");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const {
  genHashedPassword,
  comparePassword,
} = require("../utils/bcryptFunctions");
const Token = require("../models/Token");

//create a user
//endpoint: api/users

const createUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, gender, age, phone } = req.body;
  const hashedPassword = await genHashedPassword(password);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    gender,
    age,
    phone,
  });

  //generate token
  const token = crypto.randomBytes(32).toString("hex");
  //save token
  await Token.create({
    userId: user.id,
    token,
  });

  verifyLink = `${process.env.BASE_URL}/api/users/verify/${user.id}/${token}`;
  const msg = "Account verification ";

  sendEmail(user.email, verifyLink, msg);

  res
    .status(200)
    .json({ msg: `we sent you a verify link at email: ${user.email} ` });
});

//verify user by email
//endpoint: api/user/verify/:id/:token
const verifyUser = asyncHandler(async (req, res, next) => {
  const { id, token } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return next(new ErrorResponse(`user not found`, 404));
  }
  //match the token in token model
  const matchToken = await Token.findOne({ userId: id, token });
  if (!matchToken) {
    return next(new ErrorResponse(`token not found`, 404));
  }
  //update user isVerified
  await User.findByIdAndUpdate(id, { isVerified: true });
  //delete token after verification
  await Token.findOneAndDelete({ userId: id });
  //redirect to login page

  res.status(200).json({ msg: "user verified, please login" });
});

//login user
//endPoint: api/users/login

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorResponse("invalid email", 400));
  }

  //compare user entered password with the hashed one from database

  const matchPassowrd = await comparePassword(password, user.password);
  if (!matchPassowrd) {
    return next(new ErrorResponse("invalid password", 400));
  }
  //check if user is verified
  if (!user.isVerified) {
    return next(new ErrorResponse("you are not verified", 400));
  }
  //sign jwt token
  const jwtToken = jwt.sign({ id: user.id }, process.env.JWT_SIGNATURE);
  console.log(jwtToken);
  const cookieOptions = { httpOnly: true };

  res
    .status(200)
    .cookie("token", jwtToken, cookieOptions)
    .json({ success: true, msg: `welcome ${user.email}`, jwtToken });
});

//forgot password
//endPoint :api/users/forgot_password
const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  //check if user exists in database
  const user = await User.findOne({ email }).select("id");
  if (!user) {
    return next(new ErrorResponse("invalid email", 400));
  }
  const token = crypto.randomBytes(32).toString("hex");
  const verifyLink = `${process.env.BASE_URL}/api/users/forgot_password/${user.id}/${token}`;
  const msg = "Forgot Password";
  sendEmail(email, verifyLink, msg);
  //save the token
  await Token.findOneAndUpdate(
    { userId: user.id },
    { token },
    { upsert: true }
  );
  res.status(200).json({
    success: true,
    msg: "please check your email to create new password",
  });
});
//verify forgot password token and create new one
//endPoint : api/users/forgot_password/:id/:token:
const verifyForgotPassowdToken = asyncHandler(async (req, res, next) => {
  const { id, token } = req.params;
  const { password } = req.body;
  if (!password) {
    return next(new ErrorResponse("please enter new Password", 400));
  }
  const user = await Token.findOne({ userId: id });
  if (!user || user.token !== token) {
    return next(new ErrorResponse("invalid link", 400));
  }
  const hashedPassword = await genHashedPassword(password);

  const updatePassword = await User.findOneAndUpdate(
    { id },
    { password: hashedPassword },
    { new: true, runValidators: true }
  );
  res
    .status(200)
    .json({ success: true, msg: "password updated", updatePassword });
});

//get all users
//endPoint :api/users
const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find(req.query);
  if (!URLSearchParams) {
    return next(new ErrorResponse("no user found", 400));
  }
  res.status(200).json({ success: true, users });
});

//update user
//endPoint :api/users/:id

const updateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, email, password, gender, age, phone, role } = req.body;

  const hashedPassword = await genHashedPassword(password);
  const updatedUser = await User.findByIdAndUpdate(
    id,
    {
      name,
      email,
      password: hashedPassword,
      gender,
      age,
      phone,
      role,
    },
    {
      runValidators: true,
      new: true,
    }
  );
  if (!updatedUser) {
    return next(new ErrorResponse("user not updated", 400));
  }
  res.status(200).json({ success: true, user: updatedUser });
});

//delete a user
//endPoint : api/users/:id

const deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  await user.remove();
  res.status(200).json({ success: true, msg: `user deleted with id ${id}` });
});

//get one user
//endPoint : api/users/one
const getUser = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findById(id);
  if (!user) {
    return next(new ErrorResponse("user not found", 400));
  }
  res.status(200).json({ success: true, user });
});

module.exports = {
  createUser,
  getUser,
  verifyUser,
  loginUser,
  forgotPassword,
  verifyForgotPassowdToken,
  getUsers,
  updateUser,
  deleteUser,
};
