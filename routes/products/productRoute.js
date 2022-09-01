const express = require("express");
const Product = require("../../models/products/product") ;

const router = express.Router();

router.post("/", async(req,res)=>{
    //console.log(req.body)
    const data = new Product(req.body)
    const result = await data.save()

    if(!result){
        res.json({
            status: "FAILED",
            message: "Product is not Added!"
        })
    }
    else{
        res.json({
            status: "SUCCESS",
            message: "Product Added Successfully....",
            data:result
        })
    }
})
module.exports = router