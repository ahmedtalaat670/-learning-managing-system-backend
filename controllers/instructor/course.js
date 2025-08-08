const Course = require("../../models/courses");

const addCourse = async (req, res) => {
  try {
    const courseData = req.body;
    const newCourse = new Course(courseData);
    const savedCourse = await newCourse.save();
    if (savedCourse) {
      res.status(201).json({
        success: true,
        message: "you added a new course successfully",
        data: savedCourse,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add a new course",
    });
  }
};

const getInstructorCourses = async (req, res) => {
  try {
    const { instructorId } = req.body;
    const allCourses = await Course.find({ instructorId });
    if (allCourses) {
      res.status(200).json({
        success: true,
        data: allCourses,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const getCourseDetailsById = async (req, res) => {
  try {
    const { id } = req.params;
    const courseDetails = await Course.findById(id);
    if (!courseDetails) {
      res.status(404).json({
        success: false,
        message: "There is no course with this id",
      });
    }
    res.status(200).json({
      success: true,
      data: courseDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get the course details",
    });
  }
};

const getCourseByIdAndUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const newDetailsOfTheCourse = req.body;
    const courseWithNewDetails = await Course.findByIdAndUpdate(
      id,
      newDetailsOfTheCourse,
      { new: true }
    );
    if (!courseWithNewDetails) {
      res.status(404).json({
        success: false,
        message: "Failed to find the course",
      });
    }
    res.status(200).json({
      success: true,
      message: "The course is updated successfully",
      data: courseWithNewDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update the course details",
    });
  }
};

const deleteCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(404).json({
        success: false,
        message: "There is no course has this id",
      });
    }
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (deletedCourse) {
      res.status(200).json({
        success: true,
        message: "you deleted the course successfully",
        data: deletedCourse,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete the course",
    });
  }
};

module.exports = {
  addCourse,
  getInstructorCourses,
  getCourseDetailsById,
  getCourseByIdAndUpdate,
  deleteCourseById,
};
