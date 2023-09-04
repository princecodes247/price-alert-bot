import { v2 as cloudinary } from "cloudinary";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "../config";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

// Helper function to upload image to Cloudinary
const uploadImageToCloudinary = async (file: Buffer) => {
  const base64Image = file.toString("base64"); // Convert the buffer to a Base64 string
  try {
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${base64Image}`,
      {
        upload_preset: "ml_default",
      }
    );

    return result.secure_url;
    // return result.url;
  } catch (error) {
    throw new Error("Error uploading image to Cloudinary");
  }
};

export { cloudinary, uploadImageToCloudinary };
