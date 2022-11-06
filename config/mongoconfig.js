const mongoose = require("mongoose")
const dburl ="mongodb://127.0.0.1:27017/ecommerce"

mongoose.connect(dburl,{
    autoIndex:true,
    autoCreate:true
    },(err)=>{
        if(err){
            console.log(err)
        } else{
            console.log("Database connected")
        }
})