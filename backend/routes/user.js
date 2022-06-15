const express = require("express");
const jwtVerify = require("../middleware/jwtVerify");
const checkAdmin = require("../middleware/checkAdmin");
const {
  createUser,
  verifyUser,
  loginUser,
  forgotPassword,
  verifyForgotPassowdToken,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controller/user");
const router = express.Router();

router.post("/", createUser);
router.get("/", jwtVerify, checkAdmin, getUsers);
router.get("/verify/:id/:token", verifyUser);
router.post("/login", loginUser);
router.post("/forgot_password", jwtVerify, forgotPassword);
router.put("/forgot_password/:id/:token", verifyForgotPassowdToken);
router.put("/:id", jwtVerify, updateUser);
router.delete("/:id", jwtVerify, checkAdmin, deleteUser);

module.exports = router;
