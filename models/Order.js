const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    quantity: {
      type: Number,
      default: 1
    },
    totalPrice: {
      type: Number
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

const orderModel = mongoose.models.order || mongoose.model("order",orderSchema)
module.exports =  {orderModel};