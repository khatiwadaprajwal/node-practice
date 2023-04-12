const jwt = require("jsonwebtoken")
const User = require("../models/user.model")
let CONSTANTS = require("../config/constants")

const isLoggedIn = async (req,res,next) => {

    let token = '';
    if(req.headers['authorization']){
        token = req.headers['authorization']
    }
    try{
        let data = jwt.verify(token,CONSTANTS.jwt_secret);
        let user = await User.findById(data.id)
        if(!token || !data || !user) {
            res.status(401).json({msg:"Unauthorized access"})
        } else{
            req.auth_user = user
            next()//yo bhanya acess deko ho
        }




    } catch(error){
        res.status(500).json({msg:"Unauthorized access"})
    }


}

module.exports = isLoggedIn