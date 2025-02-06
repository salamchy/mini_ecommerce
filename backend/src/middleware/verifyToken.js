import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    const token =
      req.cookies?.authToken || req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      console.log("No token found");
      return res.status(401).json({ message: "Token not found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      console.log("Invalid token");
      return res.status(401).json({ message: "Invalid token" });
    }

    // Set req.user to an object containing userId and role
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };
    next();
  } catch (error) {
    console.error("Middleware error:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
