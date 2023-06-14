const { Product } = require('../models');
const { Op } = require('sequelize')


exports.createProduct = product => Product.create(product)

exports.deleteProduct =  async id => {
    return Product.destroy({where:{id:id}})
}

exports.updateProduct = async (value,id) =>{
    return Product.update(value,{where:{id:id}})
}


