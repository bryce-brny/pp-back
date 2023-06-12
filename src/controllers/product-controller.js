const { validateRegister, validateLogin } = require('../validators/auth-validator')
const { Product } = require('../models')



exports.getProduct = async(req,res,next) => {
    data = await Product.findAll()
    res.status(200).json({ product : data})
}