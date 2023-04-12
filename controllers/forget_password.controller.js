
const Otp=require("../models/otp.model")
const nodemailer = require('nodemailer');
const user = require("../models/user.model");
const bcrypt = require("bcrypt");




const generateOTP = () => {return Math.floor(100000 + Math.random() * 900000);}

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "secondacs36@gmail.com",
        pass: "uajwfdbnxrzgozqn"
    },
    port: 465,
    host: "smtp.gmail.com"
})

const sendVerificationCode = async (req,res,next) => {
   let data = req.body
   try{
        let existing_user = await user.findOne({email:data.email})
        if(!existing_user){
            res.status(401).json({msg:"User with such email doesn't exist"})
        } else{
            let otp = generateOTP().toString();
            const msg = {
                from: "secondacs36@gmail.com",
                to: data.email,
                subject: "OTP Verification",
                text:   `Your OTP is ${otp}.`, 
            
            };
            let existing_otp = await Otp.findOne({email:data.email})
            if(!existing_otp){
                transporter.sendMail(msg, (err) => {
                    if (err) {
                        res.status(500).json({ msg:err });


                    }
                    else {
                        let newotp = new Otp({ email: data.email, otp: otp });
                        newotp.save();
                        res.json({ msg: "Email sent sucessfully" });
                    }
                })
            } else {
                transporter.sendMail(msg, (err) => {
                    if (err) {
                        res.status(500).json({ msg: err });

                    }
                    else {
                        res.json({ msg: "Email sent sucessfully" });
                    }
                })
                await Otp.findByIdAndUpdate(existing_otp.id,{otp:otp})
            }

        }

   } catch(error){
    
    res.status(500).json({msg:"Error while sending mail",error:error})
   }
    
}

const resetPassword = async (req,res) => {
    data = req.body
    try{
        let existing_otp = await Otp.findOne({email:data.email})
        if(!(existing_otp.otp==data.otp)){
            res.status(400).json({msg:"Error otp"})
        } else{
            data['password'] = bcrypt.hashSync(data['password'], 10)
            let update = {password:data.password}
            await user.findOneAndUpdate({email:data.email},update)
            res.json({msg:"Password reset successful"})
        }

    } catch(error){
        res.status(500).json({msg:"Error while verifying email"})
    }



}





module.exports = {sendVerificationCode,resetPassword}



  
  