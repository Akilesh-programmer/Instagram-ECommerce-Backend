import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    address: {
      street: String,
      city: String,
      state: String,
      zip: String,
    },
    role: { type: String, default: "customer" },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }], // Reference to Order model
  },
  { timestamps: true }
);

export default mongoose.model("Customer", customerSchema);
