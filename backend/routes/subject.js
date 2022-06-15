const express = require("express");
const jwtVerify = require("../middleware/jwtVerify");
const checkAdmin = require("../middleware/checkAdmin");
const {
  addSubject,
  allSubjects,
  updateSubject,
  deleteSubject,
} = require("../controller/subject");

const router = express.Router();

router.post("/", jwtVerify, checkAdmin, addSubject);
router.get("/", allSubjects);
router.put("/:id", jwtVerify, checkAdmin, updateSubject);
router.delete("/:id", jwtVerify, checkAdmin, deleteSubject);

module.exports = router;
