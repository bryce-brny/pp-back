const productRepository = require('../repositories/product-repository')

exports.createProduct = product => productRepository.createProduct(product);

exports.deleteProduct = id => productRepository.deleteProduct(id);

exports.updateProduct = (value,id) => productRepository.updateProduct(value,id)

// exports.deleteFormByUserId = id =>userRepository.deleteFormByUserId(id)
