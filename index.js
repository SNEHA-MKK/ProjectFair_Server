//only file that run in the backened

//1)dotenv

require('dotenv').config() //environment variable will be added to process.env file

//2) import express
const express  = require('express')

//3) import cors
const cors = require('cors')

// import router 
const router = require('./router')

//import mongodb
require('./db/connection')

//4)create server
const projectFairServer = express()

//use cors to connect with frontend
projectFairServer.use(cors())

//json() - middleware - to json format
projectFairServer.use(express.json())

//server use router
projectFairServer.use(router)

//first argument - by which name the folder have to be called
//second - export this folder
projectFairServer.use('/uploads',express.static('./uploads'))

//port
const PORT = 4000 || process.env.PORT

//run the server
projectFairServer.listen(PORT,()=>{
    console.log(`project fair server running successfully at port number : ${PORT}`);
})

//get
projectFairServer.get('/',(req,res)=>{
   res.send('get request received')
})

// //post
// projectFairServer.post('/',(req,res)=>{
//     res.send('post request received')
//  })

//  //put
//  projectFairServer.put('/',(req,res)=>{
//     res.send('put request received')
//  })


