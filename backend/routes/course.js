const {
  addCourse,
  getCourse,
  getAllCourse,
  deleteCourse,
  updateCourse,
} = require("../controller/course");
const jwtVerify = require("../middleware/jwtVerify");

const router = require("express").Router();

router.post("/", jwtVerify, addCourse);
router.get("/:id", jwtVerify, getCourse);
router.get("/", jwtVerify, getAllCourse);
router.delete("/:id", jwtVerify, deleteCourse);
router.put("/:id", jwtVerify, updateCourse);

module.exports = router;
