
const { Size , Product,Cart, sequelize,Order,order_product} = require("../models");

const createError = require("../utils/create-error");

exports.addCart = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const value = req.body;
        value.userId = userId

        const cart = await Cart.findOne({
            where: { productId : value.productId , userId : userId , size : value.size},
        })


        let newCart;
        if(!cart){
          value.quantity = 1
          newCart = await Cart.create(value)
        
        } else {
            cart.quantity += 1
            await cart.save()
        }

        res.status(200).json(newCart??cart);
        
        
    } catch (err) {
        next(err);
    }
};


exports.getCartsByUser = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const result = await Cart.findAll({
            where: { userId },
            include: Product
        });
        res.status(200).json(result );
    } catch (err) {
        next(err);
    }
};

exports.updateAddCart = async(req,res,next)=>{
    try{
        const userId = req.user.id;
        // console.log("===",req.body)
        const {id} = req.body
        console.log(id)
        const result = await Cart.findOne({
            where:{ id : id}
        })

        if(!result.quantity){
            createError('product not found',400)
        }

        // if(result.quantity <= 0){
        //     createError('cannot decreate',400)
        // }

        result.quantity +=1 
        
        // console.log("result",result)
        await result.save()  // create และ update ไห้เลย เป็น instant method 
        // console.log(result.quantity)

        const rs = await Cart.findAll({where : {userId},include: Product
        })
        res.status(200).json(rs);
    }catch(err){
        console.error(err)
        next(err)
    }
}

exports.updateSubtractCart = async(req,res,next)=>{
    try{
        const userId = req.user.id;
        // console.log("===",req.body)
        const {id} = req.body
        console.log(id)
        const result = await Cart.findOne({
            where:{ id : id}
        })

        if(!result.quantity){
            createError('product not found',400)
        }

        if(result.quantity <= 0){
            createError('cannot decreate',400)
        }

        result.quantity -=1 
        
        // console.log("result",result)
        await result.save()
        // console.log(result.quantity)

        const rs = await Cart.findAll({where : {userId},include: Product
        })
        res.status(200).json(rs);
    }catch(err){
        console.error(err)
        next(err)
    }
}

exports.delCart = async(req,res,next)=>{
    try{
        const userId = req.user.id;
        const {id} = req.body
        const result = await Cart.destroy({
            where:{ id : id}
        })
        // await result.save()
        const rs = await Cart.findAll({where : {userId},include: Product
        })
        res.status(200).json(rs);
      
    }catch(err){
        console.error(err)
        next(err)
    }
}

// exports.checkoutProduct = async(req,res,next)=>{
//     try{
//         const userId = req.user.id;
//         const value = req.body
        

//         const existingItem = await Cart.findAll({
//             where:{ id : id}
//         })

//         const modify = JSON.parse(JSON.stringify(existingItem))

//         const {id}  = await Order.create()

//         const rs =  modify.map( el => {
//             delete el.id
//             el['orderId'] = orderId  
//             return el
//           } )

//         // await result.save()
//         const rs = await Cart.findAll({where : {userId},include: Product
//         })
//         res.status(200).json(rs);
      
//     }catch(err){
//         console.error(err)
//         next(err)
//     }
// }

exports.checkoutProduct = async (req, res, next) => {
  
    try {
        console.log(req.user.id)
        //   console.log(value)
        const userId = req.user.id;
        const a = req.body
                console.log(' req.body', a)
    //   console.log('value',value)
  
   

    //สรา้ง order เอา userid เข้าไป (เดียวเพิ่ม status )
    const order = await Order.create({ userId ,totalPrice : a.totalPrice});
    //หา นrder item จากตาราง cart 

   
    const cart = await Cart.findAll({where : {userId}, include: Product
    })
    //เอาของที่หาได้ เข้า order item 

    for (let item of cart) {
        await order_product.create(
            {
                quantity: item.quantity,
                price: item.Product.price,
                size: item.size,
                orderId: order.id,
                productId: item.productId
            }
        );
    }


    //delete cart 

    const delCart = await Cart.destroy({
        where: {userId: userId} 
      })
  
      res.status(200).json({ message: "add successfully" })
  
    } catch (err) {
      next(err);
    }
  
  };





