
const otp=require("../models/otp.model")
const nodemailer = require('nodemailer');
const user = require("../models/user.model");
const reset=require("../controllers/otp")
const otpcode = Math.floor(100000 + Math.random() * 900000);

const msg = {
    from: "secondacs36@gmail.com",
    to: reset.email,
    subject: reset.subject,
    text:   `Your OTP is ${otpcode}.`, 

};
nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "secondacs36@gmail.com",
        pass: "ucvffanmaxzidfox"
    },
    port: 465,
    host: "smtp.gmail.com"
})
.sendMail(msg, (err)=>{
    if (err) {
        //res.status(500).json({ msg: "Error sending msg" })
        return console.log("error occur",err)
    }
    else {
       // res.json({ msg: "Email sent sucessfully" })
       return console.log("Email sent")
    }
})
otpcode.save();



  
  