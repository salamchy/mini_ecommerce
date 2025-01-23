import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

// Load environment variables from /src/.env
dotenv.config({ path: "./src/.env" });

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Export the configured Cloudinary instance
export default cloudinary;
