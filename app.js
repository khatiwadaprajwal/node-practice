const express = require("express")

const app = express()
const multer=require("multer")
require("./config/mongoconfig")
var path=require("path")

const routes = require("./routes/index")
app.use("/v1",routes)


app.use(express.static('public/'));

app.use((err, req, res, next) => {
  // Extract status code and error message from err object or default to 500 status and "Error" message
  let status_code = err?.status || 500;
  let msg = err?.msg || "Error";

  // Send JSON response with error details
  res.status(status_code).json({
    result: null,
    status: false,
    msg: msg
  });
});
app.listen(3001,"localhost",(err)=>{
    if(err){
        console.log("Server err")
    } else{
        console.log("Server connected");
    }
})