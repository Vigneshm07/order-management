const express = require('express');
const router = express.Router();
const Order = require('../models/Order');  // Order model

router.get('/orders', async (req, res) => {
  const { from, to } = req.query; // Get date range from query params

  try {
    // Convert from and to dates to Date objects
    const fromDate = new Date(from);
    const toDate = new Date(to);

    // Fetch orders and populate both customer and salesperson details
    const orders = await Order.find({
      orderDate: { $gte: fromDate, $lte: toDate }
    })
    .populate('salesPersonId', 'name city')  // Populate the salesPersonId field
    .populate('customerId', 'name city')  // Populate the customerId field
    .exec();

    // Format the response to include order details
    const formattedOrders = orders.map(order => ({
      orderNumber: order._id.toString(),
      date: order.orderDate,
      amount: order.orderAmt,  // Ensure the amount is included here
      customerName: order.customerId?.name || 'Unknown',
      customerCity: order.customerId?.city || 'Unknown',
      salespersonName: order.salesPersonId?.name || 'Unknown',
      salespersonCity: order.salesPersonId?.city || 'Unknown'
    }));

    res.json(formattedOrders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

module.exports = router;
