const app = require('./app')
const ConnectDatabase = require('./Backend/config/dataBase')
const cloudinary = require('cloudinary')
//Handling uncaught exception
process.on('uncaughtException',(err)=>{
    console.log(`Error: ${err.message}`)
    console.log('Shutting down the server due to uncaught exception')
    process.exit(1)
})


//config

if(process.env.NODE_ENV !== 'PRODUCTION'){

    require('dotenv').config({path : 'Backend/config/config.env'})
}

//connecting to database
ConnectDatabase()

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_SECRET
})


const server = app.listen(process.env.PORT , ()=>{
    console.log(`Server is listening on port http://localhost:${process.env.PORT}`)
})


//Unhandled Promise rejection
process.on('unhandledRejection',(err)=>{
    console.log(`Error: ${err.message}`)
    console.log('Shutting down the server due to unhandled promise rejection')

    server.close(()=>{
        process.exit(1)
    })
})
