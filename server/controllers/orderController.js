const Order = require("../models/Order");


// Create Order
exports.createOrder = async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    const order = await Order.create({
      user: req.user._id,
      items,
      totalAmount,
      paymentStatus: "Pending",
    });

    res.status(201).json(order);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Get User Orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product");

    res.json(orders);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Cancel Order
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order)
      return res.status(404).json({ message: "Order not found" });

    order.orderStatus = "Cancelled";
    await order.save();

    res.json({ message: "Order Cancelled" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};