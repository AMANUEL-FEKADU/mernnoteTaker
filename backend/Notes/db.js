const mongoose=require('mongoose')



const connectDB=async()=>{

    try {
      await mongoose.connect(process.env.MONGO_URI)
        
      console.log('success')
    } catch (error) {
        console.log(' err',error)
        process.exit(1)//exit with failure
    }
}
module.exports = { connectDB };