const express = require("express");
const router = express.Router();
const {
  addCourse,
  getInstructorCourses,
  getCourseDetailsById,
  getCourseByIdAndUpdate,
  deleteCourseById,
} = require("../../controllers/instructor/course");
router.post("/add", addCourse);
router.post("/get", getInstructorCourses);
router.get("/course/get/:id", getCourseDetailsById);
router.put("/update/:id", getCourseByIdAndUpdate);
router.delete("/delete/:id", deleteCourseById);

module.exports = router;
