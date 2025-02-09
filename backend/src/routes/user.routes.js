import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controllers.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { validateLogin, validateUser } from "../middleware/validateUser.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = express.Router();

// User registration route
router
  .route("/users/register")
  .post(validateUser, validateRequest, registerUser);

// User login route
router.route("/users/login").post(validateLogin, validateRequest, loginUser);

// User logout route
router.route("/users/logout").post(verifyToken, logoutUser);

export default router;
