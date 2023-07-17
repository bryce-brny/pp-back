const express = require('express');
const { getOrdersByUser } = require('../controllers/order-controller');
const authenticateMiddleware = require('../middlewares/authenticate')

const router = express.Router();


router.get('/getOrdersByUser', authenticateMiddleware,getOrdersByUser)


module.exports = router;