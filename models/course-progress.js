const mongoose = require("mongoose");

const lectureProgressSchema = new mongoose.Schema({
  lectureId: String,
  viewed: Boolean,
  viewDate: Date,
});

const courseProgressSchema = new mongoose.Schema({
  userId: String,
  courseId: String,
  completed: Boolean,
  completionDate: Date,
  lecturesProgress: [lectureProgressSchema],
});

module.exports = mongoose.model("CourseProgress", courseProgressSchema);
