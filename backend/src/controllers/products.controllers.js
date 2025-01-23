import ProductModel from "../models/products.model.js";
import cloudinary from "../cloudinary/index.js";
import streamifier from "streamifier";

cloudinary.config({
  cloud_name: "dp6jkp5kx",
  api_key: "747316749161883",
  api_secret: "CKT9B3rLTwss6L9cU-iNtc2Z3Pw",
});

// #controller for create product
export const createProduct = async (req, res) => {
  try {
    const { productName, price, description, category, stockQuantity } =
      req.body;

    if (!productName || !price || !description || !category || !stockQuantity) {
      return res.status(422).json({
        success: false,
        message: "All fields are required",
      });
    }

    let imageUrl = null;

    // Check if an image file is provided
    if (req.file) {
      // Use a Promise to handle the asynchronous nature of the upload_stream
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "products" }, // Optional: Save in a specific folder
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

      imageUrl = result.secure_url; // Set the image URL
    }

    // Create a new product
    const newProduct = new ProductModel({
      productName,
      price,
      description,
      category,
      stockQuantity,
      imageUrl,
    });

    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// #Controller for retrieving all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// #Controller for retrieving a specific product by ID
export const getSingleProduct = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// #Controller for updating a product
export const updateProduct = async (req, res) => {
  try {
    const { productName, price, description, category, stockQuantity } =
      req.body;
    const product = await ProductModel.findById(req.params.id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Handle new image upload if provided
    let imageUrl = product.imageUrl; // Keep the existing image URL
    if (req.file) {
      // Delete the old image from Cloudinary
      if (imageUrl) {
        const publicId = imageUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`products/${publicId}`);
      }

      // Upload the new image to Cloudinary
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "products" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });

      imageUrl = result.secure_url; // Update the image URL
    }

    // Update product details
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      { productName, price, description, category, stockQuantity, imageUrl },
      { new: true }
    );

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Controller for deleting a product
export const deleteProduct = async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Delete the image from Cloudinary if it exists
    if (product.imageUrl) {
      const publicId = product.imageUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`products/${publicId}`);
    }

    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
