require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const authRoute = require('./routes/auth-route')
const productRoute = require('./routes/product-route')
const cartRoute = require('./routes/cart-route')
const orderRoute = require('./routes/order-route')
const userRoute = require('./routes/user-route')

const notFoundMiddleware = require('./middlewares/not-found')
const errorMiddleware = require('./middlewares/error')

const app = express();

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use(
    rateLimit({
        windowMs: 1000 * 60 * 15,
        max: 1000,
        message: { message: 'too many requests'}
    })
);

app.use(helmet())
app.use(cors());
app.use(express.json());

app.use('/auth',authRoute)
app.use('/product',productRoute)
app.use('/cart',cartRoute)
app.use('/order',orderRoute)
app.use('/user',userRoute)


app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log('server running on port ' + port));