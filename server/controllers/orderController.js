import Order from "../models/Order.js";

// Create Order
export const createOrder = async (req, res, next) => {
  try {
    const { items, totalAmount, store } = req.body;
    const customer = req.user.id;

    const newOrder = await Order.create({
      customer,
      store,
      items,
      totalAmount,
    });

    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
};

// Delete Order
export const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await order.deleteOne();
    res.status(200).json({ message: "Order removed" });
  } catch (error) {
    next(error);
  }
};

// Update Order Status
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

// Get Order Details
export const getOrderDetails = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "customer store items.product"
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

// Update Order
export const updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

// Get All Orders
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate("customer store");
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};
