const express = require('express')

const router = express.Router()



router.get('/',(req, res) => {
res.render('index.ejs')
})

router.get('/login',(req, res)=>{
    res.render('login.ejs')
})

router.get('/register',(req, res)=>{
    res.render('register.ejs')
})

router.get('/buyandsell',(req,res)=>{
    res.render('buyandsell.ejs')
})

router.get('/cryptopricelist',(req,res)=>{
    res.render('cryptopricelist.ejs')
})

router.post('/',(req,res) =>{
    res.json({messg:'post new'})
})
module.exports = router