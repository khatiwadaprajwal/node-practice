const mongoose = require('mongoose')
const otp = mongoose.Schema({
    otp:{
       type:String
    },
    email:{
        type:String
    }
},{
    timestamps:true,
    autoIndex:true,
    autoCreate:true
})

const Otp = mongoose.model("otp",otp)
module.exports = Otp
