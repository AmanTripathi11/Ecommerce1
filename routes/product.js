const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');
const { validateProduct , isLoggedIn  , isSeller ,isProductAuthor} = require('../middleware');
const {showAllProducts, productForm , createProduct , showProduct , editProductForm , updateProduct , deleteProduct} =  require('../controllers/product')

router.get('/products', showAllProducts );


router.get('/products/new', isLoggedIn, isSeller, productForm);

router.post('/products', isLoggedIn, isSeller, validateProduct, createProduct);

router.get('/products/:id', isLoggedIn, showProduct);


router.get('/products/:id/edit',isLoggedIn,isProductAuthor, editProductForm);

router.patch('/products/:id', isLoggedIn, isProductAuthor, validateProduct, updateProduct);


router.delete('/products/:id',isLoggedIn,isProductAuthor,deleteProduct);

router.get('/search', async (req, res) => {
    try {
        const query = req.query.query || '';
        const regex = new RegExp(query, 'i'); // Case-insensitive regex for partial matches
        const products = await Product.find({ name: regex }); // Adjust the field as needed
        res.render('products/search_result', { products, query });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.get('/:userId/orders', async (req, res) => {
    const user = await User.findById(req.user._id);
  const orders = user.orders;
  res.render('orders/order', { orders });
  });
module.exports = router;


