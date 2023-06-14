const express = require('express');
const { getProduct, addProduct , deleteProduct,updateProduct } = require('../controllers/product-controller');

const router = express.Router();

router.post('/addproductpage', addProduct);
router.get('/',getProduct)
router.delete('/:id',deleteProduct)
router.patch('/:productId',updateProduct)

module.exports = router;