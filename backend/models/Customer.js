const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: String,
  city: String,
  salesPersonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SalesPerson',
    required: true
  }
});

module.exports = mongoose.model('Customer', customerSchema);
