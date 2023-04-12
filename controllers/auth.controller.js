const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const CONSTANTS = require("../config/constants")
const user = require("../models/user.model")

const register = async (req, res, next) => {
  let data = req.body
  hash = data['password'] = bcrypt.hashSync(data['password'], 10)
  try {
    let existing_user = await User.findOne({ email: data.email })
    if (existing_user) {
      res.status(500).json({ msg: "User already exist" })
    } else {
      let user_data = { full_name: data['full_name'], email: data['email'], password: data['password'], is_admin: data['is_admin'] }
      let new_user = new User(user_data)
      new_user.save()

      res.json({
        msg: "You are successfully registered",
        user: new_user
      })
    }
  }
  catch (error) {
    res.status(500).json({
      msg: "Error while registering user"
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
    const user = await User.findOne({ email: email })
    if (!user) {
      res.status(400).json({
        message: "Login not successful",
        error: "User not found",
      })
    } else {

      if (!bcrypt.compareSync(password, user.password)) {

        res.status(401).json({
          msg: "Invalid credentials"
        })
      } else {
        const token = jwt.sign({ id: user._id, full_name: user.full_name, email: user.email }, CONSTANTS.jwt_secret)
        res.json({ msg: "You are logged in", user: { full_name: user.full_name, email: user.email }, token: token })
        is_token = true
      }




    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    })
  }

}


  module.exports = { register, login }

