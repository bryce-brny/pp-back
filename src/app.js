require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const notFoundMiddleware = require('./middlewares/not-found')
const errorMiddleware = require('./middlewares/error')

const app = express();

if(process.env.NODE_ENV === 'develop'){
    app.use(morgan('dev'))
}

app.use(cors());
app.use(express.json());

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log('server running on port ' + port));