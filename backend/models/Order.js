const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  orderDate: { type: Date, required: true },
  orderAmt: { type: Number, required: true },
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },  // Customer reference
  salesPersonId: { type: Schema.Types.ObjectId, ref: 'SalesPerson', required: true }  // Salesperson reference
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
