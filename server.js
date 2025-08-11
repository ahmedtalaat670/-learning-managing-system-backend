require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const authRoutes = require("./routes/auth-routes/index");
const mediaRoutes = require("./routes/instructor_routes/media");
const courseRoutes = require("./routes/instructor_routes/course");
const studentRoutes = require("./routes/student-routes/course");
const studentOrderRoutes = require("./routes/student-routes/order");
const studentBoughtCoursesRoute = require("./routes/student-routes/StudentCourses");
const studentCourseProgressRoutes = require("./routes/student-routes/course-progress");

app.use(
  cors({
    origin: "https://learning-managing-system-frontend-sage.vercel.app/",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// middleware
app.use(express.json());

// DataBase connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("DataBase is connected successfully"))
  .catch((e) => console.log(e));

// handling routes
app.use("/auth", authRoutes);
app.use("/media", mediaRoutes);
app.use("/instructor", courseRoutes);
app.use("/student", studentRoutes);
app.use("/student/order", studentOrderRoutes);
app.use("/student", studentBoughtCoursesRoute);
app.use("/student/course-progress", studentCourseProgressRoutes);

// handling errors
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
});
console.log(authRoutes);
//   Running the server
app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
