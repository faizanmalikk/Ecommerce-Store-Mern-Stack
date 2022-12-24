const express = require('express')
const app = express();
const errorMiddleware = require('./Backend/middleware/error')
const cookieaParser = require('cookie-parser')
const cors = require('cors')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

const path = require('path')

//config
if(process.env.NODE_ENV !== 'PRODUCTION'){

    require('dotenv').config({path : 'Backend/config/config.env'})
}


app.use(bodyParser.json({limit: "50mb"}));
app.use(express.json())
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));



app.use(cookieaParser())

app.use(cors({
    credentials: true,
    origin: [process.env.APP_URL] 
}))


app.use(fileUpload({useTempFiles:true}))

// import routes
const product = require('./Backend/routes/productRoute')
const user = require('./Backend/routes/userRoute')
const order = require('./Backend/routes/orderRoute')
const payment = require('./Backend/routes/paymentRoute')

app.use('/api' ,  product)
app.use('/api' ,  user)
app.use('/api' ,  order)
app.use('/api' ,  payment)

app.use(express.static(path.join(__dirname,'../frontend/build')))

app.get('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'../frontend/build/index.html'))
})

// Middleware for errors
app.use(errorMiddleware)

module.exports = app