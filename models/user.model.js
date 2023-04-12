const mongoose =require ("mongoose")
const User = mongoose.Schema({
    full_name: {
        type: String

    },
    email: {
        type: String
    },
    password: {
        type:String
    },
    is_admin:{
        type:Boolean
    }
},{
  
    timestamps:true,
    autoindex:true,
    autocreate:true
})
const user =mongoose.model("User",User)
module.exports=user