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

router.post("/orders/create", verifyToken, createOrder);
router.get("/orders/all-orders", verifyToken, verifyAdmin, getOrders);
router.get("/orders/user-order", verifyToken, getUserOrders);
router.put("/orders/update/:id", verifyToken, verifyAdmin, updateOrderStatus);

export default router;
