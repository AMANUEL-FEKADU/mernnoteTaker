const express =require('express')
const { register, login, getme, getalluser } = require('./userController')
const router=express.Router()
const {protect}=require('../middleware/autho')
const { isAdmin } = require('../middleware/adminch')



router.post('/',register)
router.post('/login',login)
router.get('/getallusers',protect,isAdmin,getalluser)
router.get('/getme',protect,getme)

module.exports=router