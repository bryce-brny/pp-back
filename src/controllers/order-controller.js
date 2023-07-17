const { Size , Product,Cart, sequelize,Order,order_product} = require("../models");
const createError = require("../utils/create-error");

exports.getOrdersByUser = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const result = await Order.findAll({
            where : {userId},
            include: {model:order_product,include : Product }
        });
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

