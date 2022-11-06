const router = require("express").Router()
const body_parser = require("body-parser")
const { addProduct, listAllProduct } = require("../controllers/product.controller")
const parser = body_parser.json()


router.route("/product/add")
    .post(parser,addProduct)
router.route("/product/listall")
    .get(listAllProduct)

module.exports = router