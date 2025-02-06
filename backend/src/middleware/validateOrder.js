export const validateOrder = (req, res, next) => {
  const { products, totalPrice } = req.body;

  if (!products || !Array.isArray(products) || products.length === 0) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Products are required and must be an array.",
      });
  }

  if (typeof totalPrice !== "number" || totalPrice <= 0) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Total price must be a positive number.",
      });
  }

  for (const product of products) {
    if (!product.productId || !product.quantity || product.quantity <= 0) {
      return res.status(400).json({
        success: false,
        message:
          "Each product must have a valid productId and quantity greater than 0.",
      });
    }
  }

  next();
};
