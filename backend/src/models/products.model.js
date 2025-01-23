import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Product name is required"],
      trim: true, // Removes extra whitespace
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"], // Ensure price is non-negative
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    stockQuantity: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock quantity cannot be negative"], // Ensure stock is non-negative
    },
    imageUrl: {
      type: String,
      default: null, // Allows products without an image
      validate: {
        validator: function (value) {
          // Validate URL format if provided
          return value === null || /^https?:\/\/.+\..+/.test(value);
        },
        message: "Invalid URL format for imageUrl",
      },
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;
