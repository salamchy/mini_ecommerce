import CarouselModel from "../models/carousel.model.js";
import cloudinary from "../cloudinary/index.js";
import streamifier from "streamifier";

export const addCarouselImage = async (req, res) => {
  try {
    const existingImages = await CarouselModel.countDocuments();
    if (existingImages >= 4) {
      return res.status(400).json({ message: "Maximum 4 images allowed" });
    }

    let imageUrl = null;
    let public_id;

    // Check if an image file is provided
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "carousels" },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });

      // Ensure result contains the correct data
      if (!result || !result.secure_url || !result.public_id) {
        throw new Error("Error uploading image to Cloudinary.");
      }

      imageUrl = result.secure_url;
      public_id = result.public_id;
    }

    const newImage = new CarouselModel({
      imageUrl,
      public_id,
    });

    await newImage.save();
    res.status(201).json(newImage);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//#delete carousel image
export const deleteCarouselImage = async (req, res) => {
  try {
    // Find the image in the database
    const image = await CarouselModel.findById(req.params.id);
    if (!image) return res.status(404).json({ message: "Image not found" });

    // Delete from Cloudinary first
    const cloudinaryResponse = await cloudinary.uploader.destroy(
      image.public_id
    );

    if (cloudinaryResponse.result !== "ok") {
      return res
        .status(500)
        .json({ message: "Failed to delete image from Cloudinary" });
    }

    // Delete from MongoDB after Cloudinary deletion
    await CarouselModel.findByIdAndDelete(req.params.id);

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getCarouselImages = async (req, res) => {
  try {
    const images = await CarouselModel.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
