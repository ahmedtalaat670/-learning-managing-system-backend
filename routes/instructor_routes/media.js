const express = require("express");
const multer = require("multer");
const {
  uploadMediaToCloudinary,
  deleteMediaFromCloudinary,
  deleteImageFromCloudinary,
} = require("../../helpers/cloudinary");
const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const result = await uploadMediaToCloudinary(req.file.path);
    res.status(200).json({
      success: true,
      data: result,
    });
    console.log(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to upload the media",
    });
  }
});

router.post("/bulk-upload", upload.array("files", 10), async (req, res) => {
  try {
    const uploadFiles = req.files.map((file) =>
      uploadMediaToCloudinary(file.path)
    );
    const result = await Promise.all(uploadFiles);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Failed to upload the media",
    });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({
        success: false,
        message: "There is no media has this id value",
      });
    }
    await deleteMediaFromCloudinary(id);
    res.status(200).json({
      success: true,
      message: "The media is deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete the media",
    });
  }
});

router.delete("/image/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({
        success: false,
        message: "There is no image has this id value",
      });
    }
    await deleteImageFromCloudinary(id);
    res.status(200).json({
      success: true,
      message: "The Image is deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete the image",
    });
  }
});

module.exports = router;
