const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt=require("jsonwebtoken")

const register = (req,res,next)=>{
    let data=req.body
    hash=data['password']=bcrypt.hashSync(data['password'],10)
    try{
        let user_data = {full_name:data['full_name'],email:data['email'],password:data['password']}
        let new_user = new User(user_data)
        new_user.save()

        res.json({
            msg:"You are successfully registered",
            user:new_user
        })
    }
    catch(error){
        res.status(500).json({
            msg:"Error while registering user"
        }) 

    }
}

const login = async (req, res, next) => {
    const { email, password } = req.body
    // Check if username and password is provided
    if (!email || !password) {
      return res.status(400).json({
        message: "Username or Password not present",
      })
    }
   
    try {
        const user = await User.findOne({ email:email})
        if (!user) {
          res.status(400).json({
            message: "Login not successful",
            error: "User not found",
          })
        } else {
         
            if(!bcrypt.compareSync(password,user.password)){

                res.status(401).json({
                    msg:"Invalid credentials"
                })
            } else{
                const token=jwt.sign({full_name:user.full_name,email:user.email},"prajwal,hementa")
                res.json({msg:"You are logged in",user:{full_name:user.full_name,email:user.email},token:token})
            }




        }
      } catch (error) {
        res.status(400).json({
          message: "An error occurred",
          error: error.message,
        })
      }
    }
   


module.exports = {register,login}

