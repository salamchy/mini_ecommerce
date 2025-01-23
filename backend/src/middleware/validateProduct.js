import { body } from "express-validator";

export const validateProduct = [
  body("productName").notEmpty().withMessage("Product name is required"),
  body("price").isNumeric().withMessage("Price must be a number"),
  body("description").notEmpty().withMessage("Description is required"),
  body("category").notEmpty().withMessage("Category is required"),
  body("stockQuantity")
    .isNumeric()
    .withMessage("Stock quantity must be a number"),
];
