module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order',{
        orderDate: {
            type: DataTypes.DATEONLY,
            allowNull : false,
            validate: {
                notEmpty : true
            }
        },
        totalPrice: {
            type: DataTypes.FLOAT,
            allowNull : false,
            validate: {
                notEmpty : true
            }
        },
        orderStatus: {
            type:DataTypes.ENUM('Shipping soon','Shipped','Out for delivery','Delivered'),
            allowNull : false,
            validate: {
                notEmpty : true
            }
        }
    },{
        underscored: true //make carmalCase have "_" between
    }
    );

    Order.associate = (models) => {

        Order.belongsTo(models.User,{
            foreignKey:{
                name:'orderId',
                allowNull: false
            },
            onDelete: 'RESTRICT' //delete user but post still remain
        });

        Order.belongsTo(models.Address,{
            foreignKey:{
                name:'orderId',
                allowNull: false
            },
            onDelete: 'RESTRICT' //delete user but post still remain
        });

        Order.hasMany(models.order_product,{
            foreignKey:{
                name:'orderId',
                allowNull: false
            },
            onDelete: 'RESTRICT' //delete user but post still remain
        });

    };


    return Order;
}