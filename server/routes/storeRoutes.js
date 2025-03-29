import express from "express";
import {
  signupStore,
  loginStore,
  deleteStore,
  updateStore,
  addItem,
  deleteItem,
  addOrder,
  deleteOrder,
} from "../controllers/storeController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public Routes
router.post("/signup", signupStore);
router.post("/login", loginStore);

// Protected Routes
router
  .route("/:id")
  .put(protect, authorizeRoles("admin", "store"), updateStore)
  .delete(protect, authorizeRoles("admin", "store"), deleteStore);

router.post(
  "/:id/items",
  protect,
  authorizeRoles("admin", "store"),
  addItem
);
router.delete(
  "/:id/items",
  protect,
  authorizeRoles("admin", "store"),
  deleteItem
);

router.post(
  "/:id/orders",
  protect,
  authorizeRoles("admin", "customer", "store"),
  addOrder
);
router.delete(
  "/:id/orders",
  protect,
  authorizeRoles("admin", "customer", "store"),
  deleteOrder
);

export default router;
