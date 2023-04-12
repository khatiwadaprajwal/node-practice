const Product = require("../models/product.model");
const local_host='http://localhost:3001/'

const addProduct = (req,res,next)=>{
    let data = req.body;
    if(req.file){
        data.image = req.file.filename;
    }
    try{
        let product = new Product(data);
        product.save()
        res.json({
            msg:"Image uploaded successfully",
            url:local_host+data.image
         
            
            
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
//updateProduct admin la matra acess garna pauna middle ware banaunu xa ani delete product ko pani

const updateProduct = async (req, res)=> {
        let data = req.body
        try{
            await Product.findByIdAndUpdate(req.params.id,{title:data.title,price:data.price})
            res.json({msg:"Product Updated Successfully"})

        } catch(error){
            res.status(500).json({msg:"Error updating product"})
        }

    }
const deleteproduct=async(req,res)=>{
    try{
        id=req.params.id
        await Product.findByIdAndDelete(id)
        res.json({msg:"Product sucessfully deleted"})
    }
    catch(err){
        res.status(500).json({msg:"Error deleting product"})

    }
}




module.exports = {addProduct,listAllProduct,updateProduct,deleteproduct}