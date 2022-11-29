const router = require("express").Router()
const body_parser = require("body-parser")
const { addProduct, listAllProduct,updateProduct, deleteproduct} = require("../controllers/product.controller")
const uploader = require("../middlewares/multer.middleware")
const parser = body_parser.json()



router.route("/product/add")
    .post(parser,uploader.single('image'),addProduct)
router.route("/product/listall")
    .get(listAllProduct)
router.route("/product/update/:id")
    .put(parser,updateProduct)
    router.route("/product/delete/:id")
    .delete(parser,deleteproduct)


module.exports = router