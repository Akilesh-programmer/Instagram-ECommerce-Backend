import express from "express";
import {
  createOrder,
  deleteOrder,
  updateOrderStatus,
  getOrderDetails,
  updateOrder,
  getAllOrders,
} from "../controllers/orderController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create Order
router.post("/", protect, authorizeRoles("admin", "customer") , createOrder);

// Delete Order
router.delete("/:id", protect, authorizeRoles("admin", "customer") , deleteOrder);

// Update Order Status
router.put("/:id/status", protect, authorizeRoles("admin", "store", "customer") , updateOrderStatus);

// Get Order Details
router.get("/:id", protect, authorizeRoles("admin", "customer", "store") ,getOrderDetails);

// Update Order
router.put("/:id", protect, authorizeRoles("admin", "store", "customer"), updateOrder);

// Get All Orders
router.get("/", protect, authorizeRoles("admin", "store"), getAllOrders);

export default router;
