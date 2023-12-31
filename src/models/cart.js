module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart',{
        quantity: {
            type: DataTypes.INTEGER,
            allowNull : false,
            validate: {
                notEmpty : true
            }
        },
        size: {
            type: DataTypes.STRING,
            allowNull : false,
            validate: {
                notEmpty : true
            }
        }
    },{
        underscored: true //make carmalCase have "_" between
    }
    );

    Cart.associate = (models) => {

        Cart.belongsTo(models.User,{
            foreignKey:{
                name:'userId',
                allowNull: false
            },
            onDelete: 'RESTRICT' //delete user but post still remain
        });

        Cart.belongsTo(models.Product,{
            foreignKey:{
                name:'productId',
                allowNull: false
            },
            onDelete: 'RESTRICT' //delete user but post still remain
        });

        
        

    };


    return Cart;
}