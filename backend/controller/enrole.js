const Enrole = require("../models/enrole");
const User = require("../models/User");
const Course = require("../models/Course");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

//enrole a student to a course
//end point : api/users/enrole

const enrole = asyncHandler(async (req, res, next) => {
  const { studentId, courseId } = req.body;
  const student = await User.findById(studentId);
  if (!student) {
    return next(new ErrorResponse("student not found", 404));
  }
  if (student.role !== "student" || student.isBlocked) {
    return next(new ErrorResponse(`${student.name} can't be enrolled`, 400));
  }
  const course = await Course.findById(courseId);
  if (!course) {
    return next(
      new ErrorResponse(`course with id ${courseId} does not exist`, 400)
    );
  }
  const enrole = await Enrole.findOne({ student: studentId, course: courseId });
  if (enrole) {
    return next(
      new ErrorResponse(
        `${student.name} is already enroled to ${course.title}`,
        400
      )
    );
  }
  const newEnrole = await Enrole.create({
    student: studentId,
    course: courseId,
  });
  res.status(200).json({
    success: true,
    data: newEnrole,
  });
});

//get all enrole students
//endpoint : api/users/enrole
const getEnroles = asyncHandler(async (req, res, next) => {
  const enroles = await Enrole.find(req.query).populate([
    { path: "student", select: "name" },
    { path: "course", select: "title" },
  ]);
  res.status(200).json({ success: true, count: enroles.length, enroles });
});
//update enrole
//end point: api/users/enrole/:id
const updateEnrole = asyncHandler(async (req, res, next) => {
  const { studentId, courseId, status } = req.body;
  const enrole = await Enrole.findByIdAndUpdate(
    req.params.id,
    {
      studentId,
      courseId,
      status,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({ success: true, enrole });
});

module.exports = { enrole, getEnroles, updateEnrole };
