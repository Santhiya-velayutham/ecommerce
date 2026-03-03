// routes/payment.js
const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");
const Payment = require("../models/Payment");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay order
router.post("/create-order", async (req, res) => {
  const { amount, userId, cartItems } = req.body;

  try {
    const options = {
      amount: amount * 100, // amount in paise
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);

    // Save order in DB with status 'pending'
    const newOrder = new Order({
      user: userId,
      items: cartItems,
      totalAmount: amount,
      razorpayOrderId: order.id,
      status: "pending",
    });
    await newOrder.save();

    res.status(200).json({ orderId: order.id, order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Error creating Razorpay order", error });
  }
});

// Verify payment
router.post("/verify-payment", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generatedSignature === razorpay_signature) {
    try {
      // Update order status to 'paid'
      const order = await Order.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { status: "paid", razorpayPaymentId: razorpay_payment_id },
        { new: true }
      );

      // Store payment transaction
      const payment = new Payment({
        order: order._id,
        paymentId: razorpay_payment_id,
        amount: order.totalAmount,
        status: "success",
      });
      await payment.save();

      res.status(200).json({ success: true, order });
    } catch (err) {
      res.status(500).json({ message: "Payment verification failed", err });
    }
  } else {
    res.status(400).json({ success: false, message: "Invalid signature" });
  }
});

module.exports = router;