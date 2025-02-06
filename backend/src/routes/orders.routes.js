import express from "express";
import {
  createOrder,
  getOrders,
  getUserOrders,
  updateOrderStatus,
} from "../controllers/orders.controllers.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = express.Router();

router.post("/create", verifyToken, createOrder);
router.get("/all-orders", verifyToken, verifyAdmin, getOrders);
router.get("/user-order", verifyToken, getUserOrders);
router.put("/update/:id", verifyToken, verifyAdmin, updateOrderStatus);

export default router;
