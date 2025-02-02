import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";  // Use fs.promises to handle asynchronous unlink
import dotenv from "dotenv"
dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto"
    });

    // Delete the local file after upload
    await fs.unlink(localFilePath);  // Using fs.promises.unlink for async file deletion
    return response;
  } catch (error) {
    console.error("Error during upload or file deletion:", error);

    // Attempt to delete the local file if it exists even after an error
    try {
      await fs.unlink(localFilePath);  // Clean up local file
    } catch (unlinkError) {
      console.error("Error deleting local file:", unlinkError);
    }
    return null;
  }
};

export default uploadOnCloudinary;
