const express = require("express");
const {
  getStudentCoursesById,
} = require("../../controllers/student-controller/studentCourses");

const router = express.Router();

router.post("/bought-courses", getStudentCoursesById);

module.exports = router;
