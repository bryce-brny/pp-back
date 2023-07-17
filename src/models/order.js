module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order',{
        
        totalPrice: {
            type: DataTypes.FLOAT,
       
        },
        orderStatus: {
            type: DataTypes.ENUM(
                "pending",
                "approved",
                "shipping",
                "delivered"
            ),
            defaultValue: "pending"
        },
        receipt: {
            type: DataTypes.STRING
        }
    },{
        underscored: true //make carmalCase have "_" between
    }
    );

    Order.associate = (models) => {

        Order.belongsTo(models.User,{
            foreignKey:{
                name:'userId',
                allowNull: false
            },
            onDelete: 'RESTRICT' //delete user but post still remain
        });

        // Order.belongsTo(models.Address,{
        //     foreignKey:{
        //         name:'addressId',
        //         allowNull: true
        //     },
        //     onDelete: 'RESTRICT' //delete user but post still remain
        // });
        


        Order.hasMany(models.order_product,{
            foreignKey:{
                name:'orderId',
                allowNull: true
            },
            onDelete: 'RESTRICT' //delete user but post still remain
        });

    };


    return Order;
}