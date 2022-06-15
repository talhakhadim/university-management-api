const {
  addCourse,
  getCourse,
  getAllCourse,
  deleteCourse,
  updateCourse,
} = require("../controller/course");

const router = require("express").Router();

router.post("/", addCourse);
router.get("/:id", getCourse);
router.get("/", getAllCourse);
router.delete("/:id", deleteCourse);
router.put("/:id", updateCourse);

module.exports = router;
