const express = require("express");
const Product = require("../../models/products/product");
const upload = require("../../utils/multer");
const path = require("path");
const fs = require("fs");
const { nextTick } = require("process");
const cloudinary = require("../../utils/cloudinary");

const router = express.Router();

router.post("/", upload.single("image"), async (req, res) => {
  //console.log(req.body)
  //valid req.body or req.file not get undefined
  // if(typeof(req.file) === 'undefined' || typeof(req.body) === 'undefined'){
  //   //if error
  //   return res.status(400).json({
  //     errors: "Problem with sending data"
  //   })
  // }
  //get image and other details
  //console.log(req.file);
  const imgresult = await cloudinary.uploader.upload(req.file.path);
  let productCode = req.body.productCode;
  let productName = req.body.productName;
  let description = req.body.description;
  let category = req.body.category;
  let price = req.body.price;
  let image = imgresult.secure_url;

  //check type of image we will accept only png || jpg || jpeg
  // if(!(req.file.mimetype).includes('jpeg') && !(req.file.mimetype).includes('png')
  // && !(req.file.mimetype).includes('jpg')){
  //   //first remove file
  //   fs.unlinkSync(image)
  //   return res.status(400).json({
  //     errors: "file not support"
  //   })
  // }

  const data = new Product({
    productCode: productCode,
    productName: productName,
    description: description,
    category: category,
    price: price,
    image: image,
  });
  const result = await data.save();

  if (!result) {
    res.json({
      status: "FAILED",
      message: "Product is not Added!",
    });
  } else {
    res.json({
      status: "SUCCESS",
      message: "Product Added Successfully....",
      data: result,
    });
  }
});

//get records
router.get("/", async (req, res) => {
  try {
    const result = await Product.find();
    if (!result) {
      res.json({
        status: "FAILED",
        message: "Not Found record",
      });
    } else {
      res.json({
        status: "SUCCESS",
        message: "Result Found",
        data: result,
      });
    }
  } catch (e) {
    console.log(e);
  }
});

//get single record
router.get("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await Product.findById(_id);
    if (!result) {
      res.json({
        status: "FAILED",
        message: "Not Found record",
      });
    } else {
      res.json({
        status: "SUCCESS",
        message: "One Result Found",
        data: result,
      });
    }
  } catch (e) {
    console.log(e);
  }
});

//update record
router.put("/:id",upload.single("image"),async(req,res)=>{
  Product.findByIdAndUpdate(req.params.id)
    .then((product) => {
      req.body.productCode
        ? (product.productCode = req.body.productCode)
        : null,
        req.body.productName
          ? (product.productName = req.body.productName)
          : null,
        req.body.description
          ? (product.description = req.body.description)
          : null,
        req.body.category ? (product.category = req.body.category) : null,
        req.body.price ? (product.price = req.body.price) : null;
      req.body.image ? (product.image = req.body.image) : null;
      req.body.countInStock
        ? (product.countInStock = req.body.countInStock)
        : null;
      product
        .save()
        .then((product) =>
          res.json({
            status: "SUCCESS",
            message: "Record is updated successfully",
            data: product,
          })
        )
        .catch((err) => res.json(err));
    })
    .catch((err) =>
      res.json({
        status: "FAILED",
        message: "Record is not updated successfully",
      })
    );
});

//delete record
router.delete("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await Product.findByIdAndDelete(_id);
    if (!result) {
      res.json({
        status: "FAILED",
        message: "Record is not Deleted successfully",
      });
    } else {
      res.json({
        status: "SUCCESS",
        message: "Record is Deleted successfully",
        data: result,
      });
    }
  } catch (e) {
    console.log(e);
  }
});
module.exports = router;
