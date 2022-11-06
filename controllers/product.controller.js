const Product = require("../models/product.model")

const addProduct = (req,res,next)=>{
    let data = req.body;
    try{
        let product = new Product(data);
        product.save()
        res.json({
            msg:"Product added successfully"
        })

    } catch(error){
        res.status(500).json({msg:"Error adding product"})
    }

}

const listAllProduct = async (req,res,next) => {
    let data = req.body;
    try{
        let allproducts = await Product.find({}) //.find({}) returns all objects of database
        res.json({msg:"All products fetched",result:allproducts})

    } catch(error){
        res.status(500).json({msg:"Error listing all products"})
    }
}

module.exports = {addProduct,listAllProduct}