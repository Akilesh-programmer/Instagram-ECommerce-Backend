import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantityInStock: {
    type: Number,
    required: true,
    min: 0,
  },
  stores: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
    required: true,
  }],
  collections: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Collection",
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Item", itemSchema);
