import express from "express";
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controllers.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { validateLogin, validateUser } from "../middleware/validateUser.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = express.Router();

// User registration route
router.route("/register").post(validateUser, validateRequest, registerUser); // Add validation

// User login route
router.route("/login").post(validateLogin, validateRequest, loginUser); // Add validation

// User logout route (protected)
router.route("/logout").post(verifyToken, logoutUser);

router.get("/me", verifyToken, getUser);

export default router;
