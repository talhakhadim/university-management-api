const Course = require("../models/Course");
const Subject = require("../models/Subject");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");

//add a course
//end point: api/courses
const addCourse = asyncHandler(async (req, res, next) => {
  const { title, subject } = req.body;
  const course = await Course.create(req.body);
  res.status(200).json({ success: true, course });
});

//get a course
//end point: api/courses/:id
const getCourse = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const course = await Course.findById(id).populate([
    { path: "subjects", select: "title" },
    { path: "teachers", select: "name" },
  ]);
  if (!course) {
    return next(new ErrorResponse("course not found", 400));
  }
  res.status(200).json({ success: true, course });
});

//get all courses
//end point: api/courses

const getAllCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.find({}).populate([
    { path: "subjects", select: "title" },
    { path: "teachers", select: "name" },
  ]);
  if (!course) {
    return next(new ErrorResponse("course not found", 400));
  }
  res.status(200).json({ success: true, course });
});
//delete a course
//end point: api/courses/:id
const deleteCourse = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const course = await Course.findByIdAndDelete(id);
  if (!course) {
    return next(new ErrorResponse("course not found", 400));
  }
  res.status(200).json({ success: true, msg: `course deleted with id ${id}` });
});
//update a course
//end point :api/courses/:id
const updateCourse = asyncHandler(async (req, res, next) => {
  const { title, subject, teacher } = req.body;
  const { id } = req.params;
  const teachers = await Subject.find({
    _id: { $in: subject },
  }).distinct("teacher");

  const updatedCourse = await Course.findByIdAndUpdate(
    id,
    {
      title,
      $addToSet: { subjects: subject },
      $addToSet: { teachers: teachers },
    },
    { runValidators: true, new: true }
  );

  res.status(200).json({ success: true, updatedCourse });
});

module.exports = {
  addCourse,
  getCourse,
  getAllCourse,
  deleteCourse,
  updateCourse,
};
