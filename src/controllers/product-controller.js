const { validateRegister, validateLogin } = require('../validators/auth-validator')
const { Product,Size } = require('../models')
const productService = require('../services/product-service')



exports.getProduct = async(req,res,next) => {
    data = await Product.findAll({include:Size})
    res.status(200).json({ product : data})
}

exports.addProduct = async(req,res,next)=>{
    try{
        // 3.insert to user table
        // User.create({ firstName, lastName, email, phoneNumber, password})
        // Address.create({ province, district, country, subDistrict, postCode})
        // value.password = await bcryptService.hash(value.password);
        const value = req.body
        console.log('---------',value)
        const product = await productService.createProduct(value)
        // value.productId = product.id
         console.log('-------product-------',product)
        res.status(200).json(product)

        // const address = await addressService.createAddress(value)

      
    } catch(err){
        next (err);
    }
}; 

exports.deleteProduct = async (req,res,next) => {
 
    try {
      const {id} = req.params
      const result = await productService.deleteProduct(id)
     if (result === 0) {
      createError("no appointment found",400)
     } else {
      res.json({message:'delete success'})
     }
    
    }catch (err) {
      next(err)
    }
  }

  exports.updateProduct = async(req,res,next) =>{
    try{
      const updateProduct = req.body;
      // updateProduct["productId"] = +req.product.id;
      updateProduct["id"] = +req.params.productId;
      await productService.updateProduct(req.body,+req.params.productId)
      // console.log(first)
      res.status(200).json({updateProduct})
    }catch(err){
      next(err)
    }
  }


// exports.updateProduct = (req,res,next) => {

// }