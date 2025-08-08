const StudentCourses = require("../../models/studentCourses");

const getStudentCoursesById = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await StudentCourses.findOne({ userId });
    console.log(userId);
    if (user) {
      res.status(200).json({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};

module.exports = { getStudentCoursesById };
