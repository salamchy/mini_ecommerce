import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/products.controllers.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";
import upload from "../middleware/upload.js"; // Import the Multer middleware

const router = express.Router();

// Routes for products
router
  .route("/products")
  .post(verifyToken, verifyAdmin, upload.single("image", 1), createProduct); // Admin only
router.route("/products").get(getAllProducts); // Get all products
router.route("/products/:id").get(getSingleProduct); // Get a single product by ID
router
  .route("/products/update/:id")
  .put(verifyToken, verifyAdmin, upload.single("image"), updateProduct); // Admin only
router.route("/products/:id").delete(verifyToken, verifyAdmin, deleteProduct); // Admin only

export default router;
