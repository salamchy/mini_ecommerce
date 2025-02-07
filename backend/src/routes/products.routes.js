import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllCategories,
  getAllProducts,
  getProductsByCategory,
  getSingleProduct,
  updateProduct,
} from "../controllers/products.controllers.js";
import upload from "../multer/upload.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";
import { validateProduct } from "../middleware/validateProduct.js";
import { handleValidationErrors } from "../middleware/errorHandler.js";

const router = express.Router();

// Routes for products
router
  .route("/products")
  .post(
    verifyToken,
    verifyAdmin,
    upload.single("image"),
    validateProduct,
    handleValidationErrors,
    createProduct
  ); // Admin only
router.route("/products").get(getAllProducts);
// Route to get all categories
router.get("/categories", getAllCategories);
router.get("/products/category/:category", getProductsByCategory);

// Single product routes (Now moved **after** `/categories`)
router.route("/products/:id").get(getSingleProduct);
router
  .route("/products/update/:id")
  .put(
    verifyToken,
    verifyAdmin,
    upload.single("image"),
    handleValidationErrors,
    updateProduct
  ); // Admin only
router.route("/products/:id").delete(verifyToken, verifyAdmin, deleteProduct); // Admin only

export default router;
