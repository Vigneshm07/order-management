const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Create
router.post('/', async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.json(order);
});

// Read All
router.get('/', async (req, res) => {
  const orders = await Order.find()
    .populate('customerId')
    .populate('salesPersonId');
  res.json(orders);
});

// // Update
// router.put('/:id', async (req, res) => {
//   const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(order);
// });

// // Delete
// router.delete('/:id', async (req, res) => {
//   await Order.findByIdAndDelete(req.params.id);
//   res.json({ message: 'Order deleted' });
// });

router.get('/customer/:customerId/orders', async (req, res) => {
  try {
    const orders = await Order.find({ customerId: req.params.customerId });
    res.json(orders);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
