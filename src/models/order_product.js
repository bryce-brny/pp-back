module.exports = (sequelize, DataTypes) => {
    const order_product = sequelize.define('order_product',{
        quantity: {
            type: DataTypes.INTEGER,
            allowNull : false,
            validate: {
                notEmpty : true
            }
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull : false,
            validate: {
                notEmpty : true
            }
        }
    },{
        underscored: true //make carmalCase have "_" between
    }
    );

    order_product.associate = (models) => {

        order_product.belongsTo(models.Product,{
            foreignKey:{
                name:'productId',
                allowNull: false
            },
            onDelete: 'RESTRICT' //delete user but post still remain
        });

        order_product.belongsTo(models.Order,{
            foreignKey:{
                name:'orderId',
                allowNull: false
            },
            onDelete: 'RESTRICT' //delete user but post still remain
        });

        

    };


    return order_product;
}