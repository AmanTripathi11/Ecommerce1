const express = require('express');
const router = express.Router();
const User  = require("../models/User.js");
const { orderModel } = require('../models/Order.js');
// const userModel  = require("../models/User.js")
const stripe = require('stripe')('sk_test_51PayPCRwY22Zp31aR0k7yhUQCa4Xm2vVLk6z7VAQEzXGH84t6QOzShRGwIZnDizzie1iZOtSwHEBsyy5ArJyLVeZ00IvVc9Cx0');


router.post('/checkout/payment', async (req, res) => {
  const amount = req.body.amount;
  
  const phone = req.body.phone;
  const userId = req.body.user_id
  const serviceProvider = req.body.service_provider;
  const productInfo = req.body.cart;
  
//   console.log(amount);
  await User.findByIdAndUpdate(userId, { cart: [] });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "INR",
          product_data: {
            name: "all items",
          },
          unit_amount: amount * 100,
        },
        quantity: "1",
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    mode: "payment",
    success_url: "http://localhost:8080/products",
    cancel_url: "http://localhost:8080/products",
  });
  const user1 = await User.findById(userId);
  const orders = user1.orders;
  const order = new orderModel({
    user:user1,
    product:productInfo,
    quantity: "1",
    totalPrice:amount,
    createdAt: Date.now()
  })
  await order.save();
  res.redirect(303, session.url);
});




module.exports = router;