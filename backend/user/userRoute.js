const express =require('express')
const { register, login, getme } = require('./userController')
const router=express.Router()
const {protect}=require('../middleware/autho')


router.post('/',register)
router.post('/login',login)
router.get('/getme',protect,getme)

module.exports=router