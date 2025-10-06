const express =require('express')
const jwt=require('jsonwebtoken')
const {User}= require('../models/usermodel')


const protect=async(req,res,next)=>{

let token

if(req.headers.authorization && req.headers.authorization.startsWith('Bearer') ){
    try {
        token=req.headers.authorization.split(' ')[1]

        const decoded=jwt.verify(token,process.env.JWT_SECRET)

        req.user= await User.findById(decoded.id).select('-password')

       next()
    } catch (error) {
        console.log(error)
       return res.json({message:'not authorised'})
    }

   
}
 if(!token){
       return res.json({message:'no token'})
    }

}

module.exports={ protect}