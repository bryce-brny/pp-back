const { sequelize,Product,Size,User,Cart } = require('../models');

sequelize.sync({ force: true }).then(() => {
        return Product.bulkCreate([
            {
                id: 1,
                productName: "air",
                brand: "nike",
                color: "red",
                price: "4500",
                discountPrice: '1234',
                productDesc: "good",
                status: "0",
                productImage: ""
            }, {
                id: 2,
                productName: "air",
                brand: "nike",
                color: "blue",
                price: "4500",
                discountPrice: '1234',
                productDesc: "bad",
                status: "0",
                productImage: ""
            }
        ]);
    })











.then(() => {
    return Size.bulkCreate([
        {
            id: 1,
            size: 41,
            quantity: 20,
            productId: 1
        },
        {
            id: 2,
            size: 42,
            quantity: 20,
            productId: 1
        },
        {
            id: 3,
            size: 43,
            quantity: 20,
            productId: 1
        },
    ]);
})

// .then(() => {
//     return User.bulkCreate([
//         {
//             id: 1,
//             firstName: 'abc',
//             lastName: 'efg',
//             email: 'dpo@gmail.com',
//             phoneNumber:'0815533833',
//             password:'123456',
//             isAdmin:'0',
//             profileImage:'',
//             coverImage:''

//         }
//     ]);
// })

// .then(() => {
//     return Cart.bulkCreate([
//         {
//             id: 1,
//             quantity: 20,
//             userId:1,
//             productId: 1,
//             size:'42'
//         }
//     ]);
// })



.then(() => process.exit(0))
.catch((err) => console.log(err.message));



