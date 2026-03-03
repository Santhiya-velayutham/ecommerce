const express = require("express");
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  cancelOrder,
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createOrder);
router.get("/my-orders", protect, getUserOrders);
router.put("/cancel/:id", protect, cancelOrder);

module.exports = router;