const dotenv=require('dotenv')
dotenv.config()

const express= require('express')
const app=express()

const userRoute=require('./user/userRoute.js')
const notesRoute=require('./Notes/notesRoute')
const { connectDB } = require('./Notes/db.js')
const cors =require('cors')



connectDB()
app.use(express.json());  

app.use(express.urlencoded({ extended: true }));

app.use((req,res,next)=>{
    console.log(`req method is ${req.method} with url ${req.url}`)
next()
})

app.use(cors(
    {
        origin:'http://localhost:5173',
    }
))

app.use('/api/notes',notesRoute)
app.use('/api/user',userRoute)
app.listen(5000,()=>{
    console.log('server up')
    

})