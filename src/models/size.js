module.exports = (sequelize, DataTypes) => {
    const Size = sequelize.define('Size',{
        size: {
            type: DataTypes.FLOAT,
            allowNull : false,
            validate: {
                notEmpty : true
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull : false,
            validate: {
                notEmpty : true
            }
        }
    },{
        underscored: true //make carmalCase have "_" between
    }
    );

    Size.associate = (models) => {

        Size.belongsTo(models.Product,{
            foreignKey:{
                name:'productId',
                allowNull: false
            },
            onDelete: 'RESTRICT' //delete user but post still remain
        });



       

       

        

    };


    return Size;
}