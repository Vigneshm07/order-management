const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const { default: mongoose } = require('mongoose');

// Create
router.post('/', async (req, res) => {
  const customer = new Customer(req.body);
  await customer.save();
  res.json(customer);
});

// Read All
router.get('/', async (req, res) => {
  const customers = await Customer.find().populate('salesPersonId');
  res.json(customers);
});

// Update
router.put('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(customer);
});

// Delete
router.delete('/:id', async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id);
  res.json({ message: 'Customer deleted' });
});

router.get('/salesperson/:salespersonId', async (req, res) => {
  try {
    const salespersonObjectId = new mongoose.Types.ObjectId(req.params.salespersonId);
    const customers = await Customer.find({ salesPersonId: salespersonObjectId });
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});


module.exports = router;
