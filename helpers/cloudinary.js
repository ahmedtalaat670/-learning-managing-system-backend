const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadMediaToCloudinary = async (file, userId) => {
  try {
    console.log(file.buffer, "file buffer");
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          asset_folder: "upload_profile", // Optional: specify a folder for the image
          resource_type: "auto",
          public_id: `${userId}`, // Set the public_id for the image
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      // Write the buffer to the stream
      uploadStream.end(file.buffer);
    });
    return uploadResult;
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
