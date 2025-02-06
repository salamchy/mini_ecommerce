import express from "express";
import {
  addCarouselImage,
  deleteCarouselImage,
  getCarouselImages,
} from "../controllers/carousel.controllers.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";
import upload from "../multer/upload.js";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  upload.single("image"),
  verifyAdmin,
  addCarouselImage
);
router.delete("/:id", verifyToken, verifyAdmin, deleteCarouselImage);
router.get("/", getCarouselImages);

export default router;
