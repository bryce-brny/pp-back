const addressRepository = require('../repositories/address-repository')



exports.createAddress = address => addressRepository.createAddress(address);