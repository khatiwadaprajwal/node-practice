const router = require("express").Router()
const body_parser = require("body-parser")
const { addProduct, listAllProduct,updateProduct, deleteproduct} = require("../controllers/product.controller")
const isLoggedIn = require("../middlewares/isLogin.middleware")
const uploader = require("../middlewares/multer.middleware")
const isAdmin = require("../middlewares/rbac.middleware")
const parser = body_parser.json()



router.route('/product/add')
 .post(uploader.array('images', 5), addProduct);
//router.route("/product/add")
//    .post(parser,uploader.single('image'),addProduct)

router.route("/product/listall")
    .get(isLoggedIn,isAdmin,listAllProduct)
router.route("/product/update/:id")
    .put(parser,isLoggedIn,updateProduct)
router.route("/product/delete/:id")
    .delete(parser,deleteproduct)


module.exports = router