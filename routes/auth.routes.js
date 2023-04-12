const router = require("express").Router()
const body_parser = require("body-parser")
const { register } = require("../controllers/auth.controller")
const {login}=require("../controllers/auth.controller")
const {sendVerificationCode, resetPassword} = require("../controllers/forget_password.controller")
const parser = body_parser.json()


router.route("/user/register")
    .post(parser,register)

router.route("/user/login")
    .post(parser,login)

router.route("/user/forget-password/send-verification-code")
    .post(parser,sendVerificationCode)

router.route("/user/reset-password")
    .post(parser,resetPassword)

module.exports = router