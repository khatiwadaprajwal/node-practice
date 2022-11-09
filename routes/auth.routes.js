const router = require("express").Router()
const body_parser = require("body-parser")
const { register } = require("../controllers/auth.controller")
const {login}=require("../controllers/auth.controller")
const parser = body_parser.json()


router.route("/user/register")
    .post(parser,register)

router.route("/user/login")
    .post(parser,login)

module.exports = router