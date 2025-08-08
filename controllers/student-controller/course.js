const Course = require("../../models/courses");

const getAllCourses = async (req, res) => {
  try {
    const {
      category = [],
      level = [],
      primaryLanguage = [],
      sortBy = "price-lowtohigh",
    } = req.query;
    let filters = {};
    if (category.length) filters.category = { $in: category.split(",") };
    if (level.length) filters.level = { $in: level.split(",") };
    if (primaryLanguage.length)
      filters.primaryLanguage = { $in: primaryLanguage.split(",") };
    let sortParam = {};
    switch (sortBy) {
      case "price-lowtohigh":
        sortParam.pricing = 1;
        break;
      case "price-hightolow":
        sortParam.pricing = -1;
        break;
      case "title-atoz":
        sortParam.title = 1;
        break;
      case "title-ztoa":
        sortParam.title = -1;
        break;
      default:
        sortParam.pricing = 1;
        break;
    }
    console.log(filters, sortParam);

    const allCourses = await Course.find(filters).sort(sortParam);
    if (!allCourses) {
      res.status(404).json({
        success: false,
        message: "failed to find the courses",
      });
    }
    res.status(200).json({
      success: true,
      message: "you fetched the courses successfully",
      data: allCourses,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "failed to get all courses",
    });
  }
};

const getCourseDetailsById = async (req, res) => {
  try {
    const { id } = req.params;
    const specificCourse = await Course.findById(id);
    if (!specificCourse) {
      res.status(404).json({
        success: false,
        message: "failed to find the course",
      });
    }
    res.status(200).json({
      success: true,
      message: "you fetched the course detials successfully",
      data: specificCourse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "failed to get all courses",
    });
  }
};

module.exports = { getAllCourses, getCourseDetailsById };
