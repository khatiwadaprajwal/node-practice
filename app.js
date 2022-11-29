const express = require("express")

const app = express()
const multer=require("multer")
require("./config/mongoconfig")

const routes = require("./routes/index")
app.use("/v1",routes)

/*app.use('public', express.static('public/'));
app.post("/upload", mystorage.single('public'), (req, res) => {

    res.json({
        success: 1,
        profile_url: `http://localhost:3001/profile/${req.file.filename}`
    })
})*/


/*app.use("/hello",(req,res)=>{
  res.json({msg:"hello world"})
})*/

app.listen(3001,"localhost",(err)=>{
    if(err){
        console.log("Server err")
    } else{
        console.log("Server connected");
    }
})