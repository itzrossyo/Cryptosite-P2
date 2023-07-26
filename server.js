//import 
const express = require('express')
const app = express()
const path = require('path')

app.use(express.static('public'));
app.set('view engine', 'ejs');

//routes
 
app.get('/',(req, res) => {
res.render('index.ejs')
})
app.get('/login',(req, res)=>{
    res.render('login.ejs')
})

app.get('/register',(req, res)=>{
    res.render('register.ejs')
})

app.get('/buyandsell',(req,res)=>{
    res.render('buyandsell.ejs')
})

app.get('/cryptopricelist',(req,res)=>{
    res.render('cryptopricelist.ejs')
})

//end of routes


app.listen(3000)