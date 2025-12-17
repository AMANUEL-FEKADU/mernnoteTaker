const express=require('express')
const jwt =require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const { User }= require('../models/usermodel')
const { use } = require('./userRoute')

function generatetoken(id){
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn:'30d'
    })

}

exports.register=async(req,res)=>{
    const {name,email,password}=req.body
    if (!name || !email || !password){
        console.log()
        res.status(400).send('please add all field correct')
    }
    
    const userExist=await User.findOne({email})

    if(userExist){
       return res.status(400).send("user already exists")
    }
    const salt= await bcrypt.genSalt(10)
    const hashed= await bcrypt.hash(password,salt)

    const user= await User.create({
        name,
        email,
        password:hashed
    })
    if (user){
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generatetoken(user._id)

        })
        
    }
    else{
            res.send('invalid user data')
        }
        
}

exports.getalluser=async(req,res)=>{
  const users=await User.find()
  res.json({message:'users are ', users})

}

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please add all fields correctly" });
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generatetoken(user._id),
      role: user.role, // make sure this is exactly 'admin' for admins
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};



exports.getme=async(req,res)=>{

    const {_id,name,email,role}=await User.findById(req.user.id)
    res.status(200).json({
        id:_id,
        name,
        email,
        role
    })
    
}