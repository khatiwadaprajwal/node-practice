const express = require("express")
const app = express()
require("./config/mongoconfig")

const routes = require("./routes/index")
app.use("/v1",routes)


app.listen(3001,"localhost",(err)=>{
    if(err){
        console.log("Server err")
    } else{
        console.log("Server connected")
    }
})