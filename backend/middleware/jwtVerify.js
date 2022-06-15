const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("./asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

const jwtVerify = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(new ErrorResponse("no token available", 400));
  }

  const decoded = jwt.verify(token, process.env.JWT_SIGNATURE);
  if (!decoded) {
    return next(new ErrorResponse("token is not valid", 400));
  }
  const user = await User.findById(decoded.id);
  req.user = user;
  if (req.user.isBlocked) {
    return next(new ErrorResponse("you are blocked", 401));
  }
  next();
});

module.exports = jwtVerify;
