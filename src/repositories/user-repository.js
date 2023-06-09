const { User } = require('../models');
const { Op } = require('sequelize')

exports.getUserByEmail =  email => 
User.findOne({
        where:{
            email:email
        }
        });

exports.createUser = user => User.create(user)

