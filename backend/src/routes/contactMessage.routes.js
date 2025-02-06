import express from "express";

import {
  createMessage,
  getAllMessages,
} from "../controllers/contactMessage.controllers.js";
import { validateMessage } from "../middleware/validateForm.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.post("/contact", validateMessage, createMessage);
router.get("/admin/messages", verifyToken, verifyAdmin, getAllMessages);

export default router;
