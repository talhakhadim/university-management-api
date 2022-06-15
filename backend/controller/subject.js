const Subject = require("../models/Subject");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");

//add a subject
//end point: api/subjects
const addSubject = asyncHandler(async (req, res, next) => {
  const { title, teacher } = req.body;
  const subject = await Subject.create({
    title,
    teacher,
  });
  res.status(200).json({ success: true, subject });
});

//get all subjects
//end point: api/subjects
const allSubjects = asyncHandler(async (req, res, next) => {
  const subjects = await Subject.find({}).populate([
    { path: "teacher", select: "name" },
  ]);

  res.status(200).json({ success: true, subjects });
});

//update a subject
//end point :api/subjects/:id
const updateSubject = asyncHandler(async (req, res) => {
  const { title, teacher } = req.body;
  const { id } = req.params;
  const updatedSubject = await Subject.findByIdAndUpdate(
    id,
    { title, teacher },
    { runValidators: true, new: true }
  );

  res.status(200).json({ success: true, updatedSubject });
});
//delete a subject
//end point :api/subjects/:id
const deleteSubject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const subject = await Subject.findByIdAndDelete(id);

  res.status(200).json({ success: true, msg: `subject deleted with id ${id}` });
});

module.exports = {
  addSubject,
  allSubjects,
  updateSubject,
  deleteSubject,
};
