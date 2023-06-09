const { validateRegister } = require('../validators/auth-validator')
const { User } = require('../models')
const { Address } = require('../models')
const userService = require('../services/user-service');
const addressService = require('../services/address-service');
const createError = require('../utils/create-error');
const bcryptService = require('../services/bcrypt-service')
const tokenService = require('../services/token-service')

exports.register = async(req,res,next)=>{
    try{
        // 1.validate
        const value = validateRegister(req.body);
        const isUserExist = await userService.checkEmailExist(value.email);
        if(isUserExist){
            createError('email already in use')
        }

        // 2.hash password

        value.password = await bcryptService.hash(value.password);

        // 3.insert to user table
        // User.create({ firstName, lastName, email, phoneNumber, password})
        // Address.create({ province, district, country, subDistrict, postCode})
        // value.password = await bcryptService.hash(value.password);

        const user = await userService.createUser(value)
        value.userId = user.id
        const address = await addressService.createAddress(value)

        // 4.sign token and response
        const accessToken = tokenService.sign({id: user.id})
        console.log(accessToken)
        res.status(200).json({ accessToken })
    } catch(err){
        next (err);
    }
}; 