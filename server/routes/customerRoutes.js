import express from "express";
import {
  registerCustomer,
  loginCustomer,
  getCustomerDetails,
  updateCustomerDetails,
  addOrderToCustomer,
  deleteOrderFromCustomer,
  getAllCustomers,
} from "../controllers/customerController.js";

import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get all customers (Admin only)
router.get("/", protect, authorizeRoles("admin"), getAllCustomers);

// Register Route
router.post("/signup", registerCustomer);

// Login Route
router.post("/login", loginCustomer);

// Get Customer Details Route
router.get(
  "/profile",
  protect,
  authorizeRoles("admin", "customer"),
  getCustomerDetails
);

// Update Customer Details
router.post(
  "/profile",
  protect,
  authorizeRoles("admin", "customer"),
  updateCustomerDetails
);

// Add order to customer
router.post(
  "/orders",
  protect,
  authorizeRoles("admin", "customer"),
  addOrderToCustomer
);

// Delete Order from Customer
router.delete(
  "/orders/:orderId",
  protect,
  authorizeRoles("admin", "customer"),
  deleteOrderFromCustomer
);

export default router;
