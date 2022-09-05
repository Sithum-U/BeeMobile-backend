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

//get single record
router.get("/:id", async(req,res)=>{
    try{
        const _id = req.params.id;
        const result = await Product.findById(_id);
        if(!result){
            res.json({
                status:"FAILED",
                message:"Not Found record"
            })
        }
        else{
            res.json({
                status:"SUCCESS",
                message:"One Result Found",
                data:result
            })
        }
     }
     catch(e){
         console.log(e)
     }
})
module.exports = router