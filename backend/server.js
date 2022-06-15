const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "config/config.env" });
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const userRouter = require("./routes/user");
const subjectRouter = require("./routes/subject");
const courseRouter = require("./routes/course");
const enroleRouter = require("./routes/enrole");
const morgan = require("morgan");
const cookieparser = require("cookie-parser");
const app = express();

app.use(morgan("tiny"));

app.use(express.json());
app.use(cookieparser());

//user routes
app.use("/api/users", userRouter);
app.use("/api/subjects", subjectRouter);
app.use("/api/courses", courseRouter);
app.use("/api/users/enrole", enroleRouter);

//error handler middleware
app.use(errorHandler);
connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is connected on port ${process.env.PORT} `);
});
