const express = require("express");
const Product = require("../../models/products/product") ;
const multer = require("multer");
const path = require("path");
const { fstat } = require("fs");
// const cloudinary = require("../products/cloudinary.js");

const router = express.Router();

//set storage => file name and destination
const storage = multer.diskStorage({
    destination: (req,res,callback) => {
        callback(null, "./public/uploads/");
    },
    filename: function(req, file, callback) {
        console.log(file);
        //generate unique name for each image
        // callback(null, file.originalname);
        callback(null, 'congar' + '-' + Date.now() + path.extname(file.originalname))
    } 
})

//file filter and accept any file 
const fileFilter = (req, file, callback) => {
    callback(null,true);
}

let upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

router.post("/",upload.single("image"), async(req,res)=>{
    //console.log(req.body)
    const data = new Product({
        productCode: req.body.productCode,
        productName: req.body.productName,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        image: {
            img: fstat.readFileSync("./public/uploads/", req.file.filename),
            contentType: "image/png"
        },
    });
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


//get records
router.get("/", async(req,res)=>{
    try{
       const result = await Product.find()
       if(!result){
           res.json({
               status:"FAILED",
               message:"Not Found record"
           })
       }
       else{
           res.json({
               status:"SUCCESS",
               message:"Result Found",
               data:result
           })
       }
    }
    catch(e){
        console.log(e)
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

//update record
router.put("/:id", async(req,res)=>{
    Product.findByIdAndUpdate(req.params.id)
      .then((product) => {
        req.body.productCode ? (product.productCode = req.body.productCode) : null,
          req.body.productName
            ? (product.productName = req.body.productName)
            : null,
          req.body.description ? (product.description = req.body.description) : null,
          req.body.category ? (product.category = req.body.category) : null,
          req.body.price ? ((product.price = req.body.price)) : null;
          req.body.image ? ((product.image = req.body.image)) : null;
          product
          .save()
          .then((product) => res.json({
                            status:"SUCCESS",
                            message:"Record is updated successfully",
                            data:product
                        }))
          .catch((err) => res.json(err));
      })
      .catch((err) => res.json({
                        status:"FAILED",
                        message:"Record is not updated successfully"
                    }));
  });

//delete record
router.delete("/:id", async(req,res)=>{
    try{
        const _id = req.params.id;
        const result = await Product.findByIdAndDelete(_id);
        if(!result){
            res.json({
                status:"FAILED",
                message:"Record is not Deleted successfully"
            })
        }
        else{
            res.json({
                status:"SUCCESS",
                message:"Record is Deleted successfully",
                data:result
            })
        }
     }
     catch(e){
         console.log(e)
     }
})
module.exports = router
