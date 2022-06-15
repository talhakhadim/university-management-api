const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "please add a course title"],
  },
  //subjects is an array of subject ids
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
  ],
  teachers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

//when course is created ,teachers should be added to the course
courseSchema.pre("save", async function (next) {
  const course = this;
  //get teachers from subjects based on the subjects ids
  const teachers = await mongoose
    .model("Subject")
    .find({
      _id: { $in: course.subjects },
    })
    .distinct("teacher");
  course.teachers = teachers;
  next();
});

module.exports = mongoose.model("Course", courseSchema);
