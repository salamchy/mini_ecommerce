import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

// Example usage
cloudinary.uploader.upload("path/to/image.jpg", (error, result) => {
  if (error) {
    console.error(error);
  } else {
    console.log(result);
  }
});
