module.exports = (sequelize, DataTypes) => {
    const Address = sequelize.define('Address',{
        province: {
            type: DataTypes.STRING,
            allowNull : false,
            validate: {
                notEmpty : true
            }
        },
        district: {
            type: DataTypes.STRING,
            allowNull : false,
            validate: {
                notEmpty : true
            }
        },
        country: {
            type: DataTypes.STRING,
            allowNull : false,
            validate: {
                notEmpty : true
            }
        },
        subDistrict: {
            type: DataTypes.STRING,
            allowNull : false,
            validate: {
                notEmpty : true
            }
        },
        postCode: {
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

    Address.associate = (models) => {

        Address.belongsTo(models.User,{
            foreignKey:{
                name:'userId',
                allowNull: false,
            
            },
            onDelete: 'RESTRICT' //delete user but post still remain
        });

        

        // Address.hasMany(models.Order,{
        //     foreignKey:{
        //         name:'addressId',
        //         allowNull: false
        //     },
        //     onDelete: 'RESTRICT' //delete user but post still remain
        // });

        

    };


    return Address;
}