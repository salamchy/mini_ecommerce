import ProductModel from "../models/products.model.js";
import cloudinary from "../cloudinary/index.js";
import streamifier from "streamifier";

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
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "products" },
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

      imageUrl = result.secure_url;
    }

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

// Controller for fetching all unique categories
export const getAllCategories = async (req, res) => {
  try {
    // Fetch all categories and use Set to get unique values
    const categories = await ProductModel.distinct("category");
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// #Controller for fetching products by category
export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    // Validate category
    if (!category) {
      return res
        .status(400)
        .json({ success: false, message: "Category is required" });
    }

    // Fetch products for the given category
    const products = await ProductModel.find({ category: category });

    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found for this category",
      });
    }

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// #Controller for updating a product
export const updateProduct = async (req, res) => {
  try {
    // Find the product by ID
    const product = await ProductModel.findById(req.params.id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Prepare an object to hold the updated fields
    const updatedFields = {};

    // Check each field in the request body and add it if provided
    if (req.body.productName) updatedFields.productName = req.body.productName;
    if (req.body.price) updatedFields.price = req.body.price;
    if (req.body.description) updatedFields.description = req.body.description;
    if (req.body.category) updatedFields.category = req.body.category;
    if (req.body.stockQuantity)
      updatedFields.stockQuantity = req.body.stockQuantity;

    // Handle image upload if a new image is provided
    let imageUrl = product.imageUrl; // Default to the existing image URL
    if (req.file) {
      // Delete the existing image from Cloudinary if it exists
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

    if (imageUrl) updatedFields.imageUrl = imageUrl; // Include the new image URL if it was updated

    // Update the product with only the provided fields
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Send back the updated product as a response
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    // Handle errors
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
