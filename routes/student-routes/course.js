const express = require("express");
const {
  getAllCourses,
  getCourseDetailsById,
} = require("../../controllers/student-controller/course");
const router = express.Router();

router.get("/allCourses", getAllCourses);
router.get("/course/:id", getCourseDetailsById);

module.exports = router;
