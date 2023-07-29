//import 
require('dotenv').config()
const express = require('express')
const pagesRoutes = require('./routes/wallet')
const app = express()
const path = require('path')


app.use(express.static('public'));
app.set('view engine', 'ejs');


app.use((req ,res,next) =>{
    console.log(req.path, req.method)
    next()
})
//routes
 
app.use(pagesRoutes)

//end of routes


app.listen(process.env.PORT,()=>{
    console.log('listening on port ',process.env.PORT)
})

