module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User',{
        firstName: {
            type: DataTypes.STRING,
            allowNull : false,
            validate: {
                notEmpty : true
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull:false, // cannot null // database layer
            validate:{ // js layer 
                notEmpty: true  // "",'' 
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate:{
                isEmail:true
            }
        },
        phoneNumber:{
            type: DataTypes.STRING,
            validate:{
                is: /^[0-9]{10}$/ //can be 0-9 and must have 10 digit - regular expression 
            }
        },
        password: { //not need to validate - use hash instead 
            type: DataTypes.STRING,
            allowNull : false
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull : false,
            defaultValue: false,
        },
        profileImage: DataTypes.STRING,
        coverImage: DataTypes.STRING
    },{
        underscored: true //make carmalCase have "_" between
    }
    );

    User.associate = (models) => {

        User.hasOne(models.Address,{
            foreignKey:{
                name:'userId',
                allowNull: false
            },
            onDelete: 'RESTRICT' //delete user but post still remain
        });

        User.hasMany(models.Order,{
            foreignKey:{
                name:'userId',
                allowNull: false
            },
            onDelete: 'RESTRICT' //delete user but post still remain
        });

        User.hasMany(models.Cart,{
            foreignKey:{
                name:'userId',
                allowNull: false
            },
            onDelete: 'RESTRICT' //delete user but post still remain
        });

    };


    return User;
}