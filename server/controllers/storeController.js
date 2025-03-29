import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Store from "../models/Store.js";

const JWT_SECRET = process.env.JWT_SECRET;

// Store Signup
export const signupStore = async (req, res, next) => {
  const { name, email, password, phoneNumber, storeUrl, domain, address } =
    req.body;

  try {
    // Check if store already exists
    const existingStore = await Store.findOne({ email });
    if (existingStore) {
      return res.status(400).json({ message: "Store already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new store
    const newStore = await Store.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      storeUrl,
      domain,
      address,
    });

    // Generate JWT Token
    const token = jwt.sign(
      { id: newStore._id, role: newStore.role },
      JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const storeId = newStore._id;

    res.status(201).json({
      message: "Store registered successfully",
      token,
      storeId,
    });
  } catch (error) {
    next(error);
  }
};

// Store Login
export const loginStore = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const store = await Store.findOne({ email });
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, store.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: store._id, role: store.role }, JWT_SECRET, {
      expiresIn: "1d",
    });

    const storeId = store._id;

    res.status(200).json({
      message: "Login successful",
      token,
      storeId,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Store
export const deleteStore = async (req, res, next) => {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }
    await store.deleteOne();
    res.status(200).json({ message: "Store deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Update Store
export const updateStore = async (req, res, next) => {
  try {
    const { name, email, phoneNumber, storeUrl, domain, address } = req.body;
    const updatedStore = await Store.findByIdAndUpdate(
      req.params.id,
      { name, email, phoneNumber, storeUrl, domain, address },
      { new: true, runValidators: true }
    );

    if (!updatedStore) {
      return res.status(404).json({ message: "Store not found" });
    }

    res.status(200).json(updatedStore);
  } catch (error) {
    next(error);
  }
};

// Add Product to Store
export const addItem = async (req, res, next) => {
  try {
    const { itemId } = req.body;
    const store = await Store.findById(req.params.id);

    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    store.items.push(itemId);
    await store.save();

    res.status(200).json({ message: "Item added successfully", store });
  } catch (error) {
    next(error);
  }
};

// Delete Product from Store
export const deleteItem = async (req, res, next) => {
  try {
    const { itemId } = req.body;
    const store = await Store.findById(req.params.id);

    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    store.items = store.items.filter(
      (product) => product.toString() !== itemId
    );
    await store.save();

    res.status(200).json({ message: "Product removed successfully", store });
  } catch (error) {
    next(error);
  }
};

// Add Order to Store
export const addOrder = async (req, res, next) => {
  try {
    const { orderId } = req.body;
    const store = await Store.findById(req.params.id);

    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    store.orders.push(orderId);
    await store.save();

    res.status(200).json({ message: "Order added successfully", store });
  } catch (error) {
    next(error);
  }
};

// Delete Order from Store
export const deleteOrder = async (req, res, next) => {
  try {
    const { orderId } = req.body;
    const store = await Store.findById(req.params.id);

    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    store.orders = store.orders.filter((order) => order.toString() !== orderId);
    await store.save();

    res.status(200).json({ message: "Order removed successfully", store });
  } catch (error) {
    next(error);
  }
};
