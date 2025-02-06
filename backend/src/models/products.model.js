import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    category: {
      type: String,
      enum: [
        "phone",
        "laptop",
        "keyboard",
        "camera",
        "drone",
        "watch",
        "mouse",
        "headphone",
      ],
      required: [true, "Category is required"],
      trim: true,
    },
    stockQuantity: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock quantity cannot be negative"],
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
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;
