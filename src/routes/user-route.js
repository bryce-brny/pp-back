const express = require('express');
const { getAddress, updateAddress, uploadImage } = require('../controllers/user-controller');
const authenticateMiddleware = require('../middlewares/authenticate');
const upload = require('../middlewares/upload');

const router = express.Router();


router.get('/address', authenticateMiddleware, getAddress)
router.put('/updateaddress',authenticateMiddleware,updateAddress)
router.patch('/image/:orderId',upload.single('image'),uploadImage)


module.exports = router;