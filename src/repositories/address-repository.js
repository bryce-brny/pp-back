const { Address } = require('../models');
const { Op } = require('sequelize')


exports.createAddress = address => Address.create(address)