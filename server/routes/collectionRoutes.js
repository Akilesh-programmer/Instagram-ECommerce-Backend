import express from "express";
import {
  createCollection,
  removeCollection,
  updateCollection,
  addStoreToCollection,
  removeStoreFromCollection,
  addItemToCollection,
  removeItemFromCollection,
} from "../controllers/collectionController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create Collection
router.post("/", protect, authorizeRoles("admin", "store"), createCollection);

// Remove Collection
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin", "store"),
  removeCollection
);

// Update Collection
router.put("/:id", protect, authorizeRoles("admin", "store"), updateCollection);

// Add Store to Collection
router.post(
  "/:id/store",
  protect,
  authorizeRoles("admin", "store"),
  addStoreToCollection
);

// Remove Store from Collection
router.delete(
  "/:id/store",
  protect,
  authorizeRoles("admin", "store"),
  removeStoreFromCollection
);

// Add Item to Collection
router.post(
  "/:id/item",
  protect,
  authorizeRoles("admin", "store"),
  addItemToCollection
);

// Remove Item from Collection
router.delete(
  "/:id/item",
  protect,
  authorizeRoles("admin", "store"),
  removeItemFromCollection
);

export default router;
