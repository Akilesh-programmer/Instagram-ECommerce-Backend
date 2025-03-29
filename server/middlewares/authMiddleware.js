import jwt from "jsonwebtoken";
import Customer from "../models/Customer.js";
import Store from "../models/Store.js";
import Admin from "../models/Admin.js";

// Protect Routes
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      let user;

      // Check which model to query based on role
      if (decoded.role === "customer") {
        user = await Customer.findById(decoded.id).select("-password");
      } else if (decoded.role === "store") {
        user = await Store.findById(decoded.id).select("-password");
      } else if (decoded.role === "admin") {
        user = await Admin.findById(decoded.id).select("-password");
      }

      if (!user) {
        return res.status(401).json({ message: "Not authorized, user not found" });
      }

      req.user = user; // Attach user to the request
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "No token, authorization denied" });
  }
};

// Role-Based Access Control
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: `Role ${req.user.role} is not authorized to access this route` });
    }
    next();
  };
};
