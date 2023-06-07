module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product',{
        productName: {
            type: DataTypes.STRING,
            allowNull : false,
            validate: {
                notEmpty : true
            }
        },
        brand: {
            type: DataTypes.STRING,
            allowNull : false,
            validate: {
                notEmpty : true
            }
        },
        color: {
            type: DataTypes.STRING,
            allowNull : false,
            validate: {
                notEmpty : true
            }
        },
        price:{
            type: DataTypes.FLOAT,
            allowNull : false,
            validate: {
                notEmpty : true
            }
        },
        discountPrice: {
            type: DataTypes.FLOAT,
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
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull : false,
            validate: {
                notEmpty : true
            }
        },
        productDesc: {
            type: DataTypes.STRING,
            allowNull : false,
            validate: {
                notEmpty : true
            }
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull : false,
            defaultValue: false,
            validate: {
                notEmpty : true
            }
        },
        productImage: DataTypes.STRING
    },{
        underscored: true //make carmalCase have "_" between
    }
    );

    Product.associate = (models) => {

        Product.hasMany(models.Cart,{
            foreignKey:{
                name:'productId',
                allowNull: false
            },
            onDelete: 'RESTRICT' //delete user but post still remain
        });

        Product.hasMany(models.order_product,{
            foreignKey:{
                name:'productId',
                allowNull: false
            },
            onDelete: 'RESTRICT' //delete user but post still remain
        });

        

    };


    return Product;
}