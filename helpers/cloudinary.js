const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadMediaToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    return result;
  } catch (e) {
    console.log(e);
    throw new Error("Failed to upload the media");
  }
};

const deleteMediaFromCloudinary = async (id) => {
  try {
    await cloudinary.uploader.destroy(id, {
      resource_type: "video",
    });
  } catch (e) {
    console.log(e);
    throw new Error("Failed to delete the media");
  }
};

const deleteImageFromCloudinary = async (id) => {
  try {
    await cloudinary.uploader.destroy(id, {
      resource_type: "image",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete the image");
  }
};

module.exports = {
  uploadMediaToCloudinary,
  deleteMediaFromCloudinary,
  deleteImageFromCloudinary,
};
