const express = require("express");
const Product = require("../../models/products/product");
const upload = require("../../utils/multer");
const path = require("path");
const fs = require("fs");
const { nextTick } = require("process");
const cloudinary = require("../../utils/cloudinary");

const router = express.Router();

//set storage => file name and destination
// const storage = multer.diskStorage({
//     destination: (req,res,callback) => {
//         callback(null, "./public/uploads/");
//     },
//     filename: function(req, file, callback) {
//         console.log(file);
//         //generate unique name for each image
//         // callback(null, file.originalname);
//         callback(null, 'congar' + '-' + Date.now() + path.extname(file.originalname))
//     }
// })

//file filter and accept any file
// const fileFilter = (req, file, callback) => {
//     callback(null,true);
// }

// router.post("/", upload.single("image"), async(req,res)=>{
//     //console.log(req.body)
//     const data = new Product(req.body)
//     const result = await data.save()

// let upload = multer({
//     storage: storage,
//     fileFilter: fileFilter
// });

// router.post("/",async(req,res)=>{
//     //console.log(req.body)
//     console.log(req.file);
//     let productCode = req.body.productCode
//     let productName = req.body.productName
//     let description = req.body.description
//     let category = req.body.category
//     let price = req.body.price
//     let image = req.file.path

//     const data = new Product({
//       productCode: productCode,
//       productName: productName,
//       description: description,
//       category: category,
//       price: price,
//       image: image
//   });
//     const result = await data.save()

//     if(!result){
//         res.json({
//             status: "FAILED",
//             message: "Product is not Added!"
//         })
//     }
//     else{
//         res.json({
//             status: "SUCCESS",
//             message: "Product Added Successfully....",
//             data:result
//         })
//     }
// })

 router.post("/",upload.single("image"),async(req,res)=>{
    const imgresult = await cloudinary.uploader.upload(req.file.path);
    let productCode = req.body.productCode
    let productName = req.body.productName
    let description = req.body.description
    let category = req.body.category
    let price = req.body.price
    let image = imgresult.secure_url

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
        image: image

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

// router.post("/", upload.single("image"), (req, res) => {
//   const newArticle = new Articles({
//     productCode: req.body.productCode,
//     productName: req.body.productName,
//     description: req.body.description,
//     category: req.body.category,
//     price: req.body.price,
//     image: req.file.originalname,
//   });

//   newArticle
//     .save()
//     .then(() => res.json("New Article Posted!"))
//     .catch((err) => res.status(400).json(`Error: ${err}`));
// });

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
