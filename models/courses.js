const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema({
  title: String,
  freePreview: Boolean,
  videoUrl: String,
  public_id: String,
});

const courseSchema = new mongoose.Schema({
  instructorId: String,
  instructorName: String,
  date: Date,
  title: String,
  category: String,
  level: String,
  primaryLanguage: String,
  subtitle: String,
  description: String,
  pricing: String,
  objectives: String,
  welcomeMessage: String,
  image: String,
  image_id: String,
  students: [
    {
      studentId: String,
      studentName: String,
      studentEmail: String,
      paidAmount: String,
    },
  ],
  lectures: [lectureSchema],
  isPublished: Boolean,
});

module.exports = mongoose.model("Course", courseSchema);
