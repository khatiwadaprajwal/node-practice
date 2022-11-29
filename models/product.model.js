const mongoose = require("mongoose")
const product = mongoose.Schema({
    title:{
        type:String
    },
    price:{
        type:String
    },
    image:{
        type:String
    },
    in_stock:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true,
    autoIndex:true,
    autoCreate:true
})

const Product = mongoose.model("product",product)
module.exports = Product
