import express from "express";
import {
  createItem,
  deleteItem,
  updateItem,
  addStoreToItem,
  removeStoreFromItem,
  addCollectionToItem,
  removeCollectionFromItem,
} from "../controllers/itemController.js";

import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create Item
router.post("/", protect, authorizeRoles("admin", "store"), createItem);

// Delete Item
router.delete("/:id", protect, authorizeRoles("admin", "store"), deleteItem);

// Update Item
router.put("/:id", protect, authorizeRoles("admin", "store"), updateItem);

// Add Store to Item
router.put("/:id/store", protect, authorizeRoles("admin", "store"), addStoreToItem);

// Remove Store from Item
router.delete(
  "/:id/store",
  protect,
  authorizeRoles("admin", "store"),
  removeStoreFromItem
);

// Add Collection to Item
router.put(
  "/:id/collection",
  protect,
  authorizeRoles("admin", "store"),
  addCollectionToItem
);

// Remove Collection from Item
router.delete(
  "/:id/collection",
  protect,
  authorizeRoles("admin", "store"),
  removeCollectionFromItem
);

export default router;
