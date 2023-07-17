const express = require('express');
const { addCart , getCartsByUser, updateAddCart, updateSubtractCart, delCart, checkoutProduct} = require('../controllers/cart-controller')
const authenticateMiddleware = require('../middlewares/authenticate')

const router = express.Router();



router.post('/addcart', authenticateMiddleware, addCart)
router.get('/getCartsByUser', authenticateMiddleware, getCartsByUser)
router.patch('/updateadd',authenticateMiddleware,updateAddCart)
router.patch('/updatesubtract',authenticateMiddleware,updateSubtractCart)
router.post('/delcart',authenticateMiddleware,delCart);
router.post('/checkoutproduct',authenticateMiddleware,checkoutProduct);

module.exports = router;