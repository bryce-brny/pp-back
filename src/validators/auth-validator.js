const Joi = require('joi');

const validate = require('./validate')

const registerSchema = Joi.object({
    firstName: Joi.string().trim().required().messages({
        'string.empty':'First name is require.'
    }),
    lastName: Joi.string().trim().required().messages({
        'string.empty':'Last name is require.'
    }),
    email: Joi.string().email({ tlds: false }).required().messages({
        'string.empty':'Email is require.'
    }),
    phoneNumber: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
        'string.empty':'Phone number is require.'
    }),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{6,30}$/)
    .trim()
    .required().messages({
        'string.empty':'Password is require.',"string.pattern.base":"Password must be at least 6 characters and contain only alphabet and number"
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).trim().required().strip().messages({
        'string.empty':'Confirm password is require.',
        'any.only':'Password and confirm password did not match'
    }),
    province: Joi.string().trim().required().messages({
        'string.empty':'Province is require.'
    }),
    district: Joi.string().trim().required().messages({
        'string.empty':'District is require.'
    }),
    country: Joi.string().trim().required().messages({
        'string.empty':'Country is require.'
    }),
    subDistrict: Joi.string().trim().required().messages({
        'string.empty':'Sub-district is require.'
    }),
    postCode: Joi.string().pattern(/^[0-9]{5}$/).required().messages({
        'string.empty':'Post code is require.'
    })
   
});

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})

exports.validateRegister = validate(registerSchema)
exports.validateLogin = validate(loginSchema);