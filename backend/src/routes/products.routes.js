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
  .route("/")
  .post(
    verifyToken,
    verifyAdmin,
    upload.single("image"),
    validateProduct,
    handleValidationErrors,
    createProduct
  ); // Admin only
router.route("/").get(getAllProducts); // Get all products
router.route("/:id").get(getSingleProduct); // Get a single product by ID

// Route to get all categories
router.get("/categories", getAllCategories);
// Route to get products by category
router.get("/category/:category", getProductsByCategory);
router
  .route("/update/:id")
  .put(
    verifyToken,
    verifyAdmin,
    upload.single("image"),
    handleValidationErrors,
    updateProduct
  ); // Admin only
router.route("/:id").delete(verifyToken, verifyAdmin, deleteProduct); // Admin only

export default router;
