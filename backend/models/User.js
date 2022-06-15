const mongoose = require("mongoose");
const Subject = require("./Subject");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      unique: [true, "you are already registered."],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "please enter a valid email",
      ],
      required: [true, "please provide your email"],
    },
    password: {
      type: String,

      required: [true, "please enter a password"],
    },
    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      default: "student",
    },
    age: {
      type: Number,
    },
    phone: {
      type: Number,
      required: [true, "please provide your phone number"],
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "please write your gender"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

//when a teacher is deleted ,all his subjects should be null
userSchema.pre("remove", async function (next) {
  const user = this;
  await Subject.updateMany({ teacher: user._id }, { teacher: null });
  next();
});

module.exports = mongoose.model("User", userSchema);
