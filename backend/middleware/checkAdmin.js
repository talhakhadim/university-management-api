const ErrorResponse = require("../utils/errorResponse");
const checkAdmin = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(
      new ErrorResponse("you are not authorize to perform this action", 401)
    );
  }
  next();
};
module.exports = checkAdmin;
