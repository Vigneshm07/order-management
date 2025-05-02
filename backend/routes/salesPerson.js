const express = require('express');
const router = express.Router();
const SalesPerson = require('../models/SalesPerson');
const Customer = require('../models/Customer');
const Order = require('../models/Order');

// Create
router.post('/', async (req, res) => {
  const salesPerson = new SalesPerson(req.body);
  await salesPerson.save();
  res.json(salesPerson);
});

// Read All
router.get('/', async (req, res) => {
  const salesPersons = await SalesPerson.find();
  res.json(salesPersons);
});

router.get('/:salespersonId', async (req, res) => {
    try {
      const customers = await Customer.find({ salespersonId: req.params.salespersonId });
      res.json(customers);
    } catch (err) {
      res.status(500).send('Error fetching customers');
    }
  });

  // DELETE /salespersons/:id
  router.delete('/:id', async (req, res) => {
    try {
      const salespersonId = req.params.id;
  
      // Find customers linked to the salesperson
      const customers = await Customer.find({ salesPersonId: salespersonId });
      const customerIds = customers.map(c => c._id);
  
      // Delete orders linked to those customers
      const deleteOrders = Order.deleteMany({ customerId: { $in: customerIds } });
  
      // Delete customers
      const deleteCustomers = Customer.deleteMany({ salesPersonId: salespersonId });
  
      // Delete salesperson
      const deleteSalesperson = SalesPerson.findByIdAndDelete(salespersonId);
  
      await Promise.all([deleteOrders, deleteCustomers, deleteSalesperson]);
  
      res.status(200).json({ message: 'Salesperson, customers, and orders deleted successfully' });
    } catch (error) {
      console.error('Deletion error:', error.message, error.stack);
      res.status(500).json({ message: 'Server error during deletion', error: error.message });
    }
  });
  

module.exports = router;
