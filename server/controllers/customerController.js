import Customer from "../models/Customer.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// Register Customer
export const registerCustomer = async (req, res, next) => {
  const { name, email, password, phoneNumber } = req.body;

  try {
    // Check if user exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      res.status(400);
      throw new Error("Customer already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new customer
    const newCustomer = await Customer.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      role: "customer",
    });

    // JWT Token
    const token = jwt.sign(
      { id: newCustomer._id, role: newCustomer.role },
      JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(201).json({
      message: "Customer registered successfully",
      token,
    });
  } catch (error) {
    next(error);
  }
};

// Login Customer
export const loginCustomer = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const customer = await Customer.findOne({ email });
    if (!customer) {
      res.status(404);
      throw new Error("Customer not found");
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // JWT Token
    const token = jwt.sign(
      { id: customer._id, role: customer.role },
      JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    next(error);
  }
};

// Get Customer Details
export const getCustomerDetails = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.user.id).populate("orders");

    if (!customer) {
      res.status(404);
      throw new Error("Customer not found");
    }

    res.status(200).json(customer);
  } catch (error) {
    next(error);
  }
};

// Update Customer Details
export const updateCustomerDetails = async (req, res, next) => {
  try {
    const updates = req.body;

    const customer = await Customer.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!customer) {
      res.status(404);
      throw new Error("Customer not found");
    }

    res.status(200).json(customer);
  } catch (error) {
    next(error);
  }
};

// Add Order to Customer
export const addOrderToCustomer = async (req, res, next) => {
  try {
    const { orderId } = req.body;

    const customer = await Customer.findById(req.user.id);
    if (!customer) {
      res.status(404);
      throw new Error("Customer not found");
    }

    customer.orders.push(orderId);
    await customer.save();

    res.status(200).json({ message: "Order added to customer", customer });
  } catch (error) {
    next(error);
  }
};

// Delete Order from Customer
export const deleteOrderFromCustomer = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    const customer = await Customer.findById(req.user.id);
    if (!customer) {
      res.status(404);
      throw new Error("Customer not found");
    }

    customer.orders = customer.orders.filter(
      (order) => order.toString() !== orderId
    );
    await customer.save();

    res.status(200).json({ message: "Order removed from customer", customer });
  } catch (error) {
    next(error);
  }
};

export const getAllCustomers = async (req, res, next) => {
  try {
    // Fetch all customers, excluding passwords
    const customers = await Customer.find()
      .select("-password")
      .populate("orders");

    if (!customers) {
      res.status(404);
      throw new Error("No users found");
    }

    res.status(200).json({
      totalCustomers: customers.length,
      customers,
    });
  } catch (error) {
    next(error);
  }
};
