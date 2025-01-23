import { body } from "express-validator";

// Validation for user registration
export const validateUser = [
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email address.")
    .notEmpty()
    .withMessage("Email is required."),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long.")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter.")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter.")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one digit.")
    .notEmpty()
    .withMessage("Password is required."),
];

// Validation for user login
export const validateLogin = [
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email address.")
    .notEmpty()
    .withMessage("Email is required."),
  body("password").notEmpty().withMessage("Password is required."),
];
