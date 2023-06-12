const { validateRegister, validateLogin } = require('../validators/auth-validator')
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
            createError('email already in use',400)
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

exports.login = async(req,res,next)=>{
    try{
        const value = validateLogin(req.body); //validate input ที่เข้ามา 
        console.log(value,"value")
        const user = await userService.getUserByEmail(value.email) // เอาinputที่เข้ามา .email 
        console.log(user,"user")
        if(!user){
            createError('invalid credential',400)
        }
        const isCorrect = await bcryptService.compare( //เอาท่เทียบ
            value.password,
            user.password
            );
            if(!isCorrect){ //ค่าไม่ตรงกัน 
                createError('invalid credential',400)
            }
            const accessToken = tokenService.sign({id: user.id})
            res.status(200).json({ accessToken })
    }catch(err){
        next(err);
    }
};

exports.getMe = (req,res,next) => {
    const {password ,...output} = req.user.dataValues
    console.log("-------------------->",output)
    res.status(200).json({ user : output})
}