const express = require("express")
const app = express()

const product_routes = require("./product.routes")
const auth_routes = require("./auth.routes")


app.use("/",product_routes)
app.use("/",auth_routes)

module.exports = app