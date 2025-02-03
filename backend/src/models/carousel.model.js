import mongoose from "mongoose";

const carouselSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const CarouselModel = mongoose.model("Carousel", carouselSchema);
export default CarouselModel;
