import OrderModel from "../models/orders.model.js";
import ProductModel from "../models/products.model.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { products, totalPrice, shippingDetails } = req.body;

    if (!userId || !products || !totalPrice || !shippingDetails) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Ensure each product includes the selected size
    const productsWithSize = products.map((product) => ({
      ...product,
      selectedSize: product.selectedSize || "S",
    }));

    const newOrder = new OrderModel({
      userId,
      products: productsWithSize,
      totalPrice,
      shippingDetails,
      status: "Pending",
    });

    await newOrder.save();

    res
      .status(201)
      .json({ message: "Order created successfully", orderId: newOrder._id });
  } catch (error) {
    console.error("Error creating order:", error.message);
    res
      .status(500)
      .json({ message: "Error creating order", error: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find()
      .populate({
        path: "products.productId",
        select: "name imageUrl",
        model: ProductModel,
      })
      .select("userId products totalPrice shippingDetails createdAt status");

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await OrderModel.find({ userId }).populate({
      path: "products.productId",
      select: "productName price imageUrl selectedSize",
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching user orders", error: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order status:", error);
    res
      .status(500)
      .json({ message: "Error updating order status", error: error.message });
  }
};
