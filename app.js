const express = require("express")
const app = express()
require("./config/mongoconfig")

app.listen(3001,"localhost",(err)=>{
    if(err){
        console.log("Server err")
    } else{
        console.log("Server connected")
    }
})