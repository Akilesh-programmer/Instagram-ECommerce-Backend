import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    storeUrl: { type: String, required: true, unique: true },
    domain: { type: String, required: true, unique: true },
    address: {
      street: String,
      city: String,
      state: String,
      zip: String,
    },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    role: {
      type: String,
      default: 'store',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Store', storeSchema);
