const { Size , Product,Cart, sequelize,Order,order_product,Address} = require("../models");
const cloudinary = require('../config/cloudinary');
const createError = require("../utils/create-error");
const fs = require('fs');

exports.getAddress = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const result = await Address.findOne({
            where : {userId}
            
        });
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

exports.updateAddress = async (req, res, next) => {
    try {
        const userId = req.user.id;
        // const result = await Address.findOne({
        //     where : {userId}
        // });
        const { province, district, subDistrict, country, postCode } = req.body;
        console.log("DDDDDDD", req.body);

        const update = await Address.update(
            {
                province,
                district,
                subDistrict,
                country,
                postCode,
            },
            {
                where: { userId: userId },
            }
        );
        res.status(200).json(update);
    } catch (err) {
        next(err);
    }
};


exports.uploadImage = async(req,res,next)=>{
    try{
        const {orderId} = req.params
        if(!req.file.path){
            createError('photo is require')
        }

        if(req.file.path){
        const result = await cloudinary.uploader.upload(req.file.path);
        const updateOrder = await Order.update({ receipt: result.secure_url,orderStatus : "approved" },{where: {id: orderId}})
        res.json(updateOrder)

        }

        
        // await Order.create({receipt : updateValue.path},{where:{id:id}})
        // console.log(result)
    }catch(err){
        next(err)
    }finally{
        if(req.file.path){
            fs.unlinkSync(req.file.path);
        }
    }
}