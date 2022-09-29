const express = require("express");
const CartItem = require("../../models/cartItems/cartItem");
const upload = require("../../utils/multer");
const path = require("path");
const fs = require("fs");
const { nextTick } = require("process");
const cloudinary = require("../../utils/cloudinary");

const router = express.Router();

router.post("/", upload.single("image"), async (req, res) => {
  const imgresult = await cloudinary.uploader.upload(req.file.path);
  let productCode = req.body.productCode;
  let productName = req.body.productName;
  let description = req.body.description;
  let category = req.body.category;
  let price = req.body.price;
  let image = imgresult.secure_url;

  const data = new CartItem({
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
      message: "CartItem is not Added!",
    });
  } else {
    res.json({
      status: "SUCCESS",
      message: "CartItem Added Successfully....",
      data: result,
    });
  }
});

//get records
router.get("/", async (req, res) => {
  try {
    const result = await CartItem.find();
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
    const result = await CartItem.findById(_id);
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
router.put("/:id", async (req, res) => {
  CartItem.findByIdAndUpdate(req.params.id)
    .then((cartItem) => {
      req.body.productCode
        ? (cartItem.productCode = req.body.productCode)
        : null,
        req.body.productName
          ? (cartItem.productName = req.body.productName)
          : null,
        req.body.description
          ? (cartItem.description = req.body.description)
          : null,
        req.body.category ? (cartItem.category = req.body.category) : null,
        req.body.price ? (cartItem.price = req.body.price) : null;
      req.body.image ? (cartItem.image = req.body.image) : null;
      req.body.countInStock
        ? (cartItem.countInStock = req.body.countInStock)
        : null;
      cartItem
        .save()
        .then((cartItem) =>
          res.json({
            status: "SUCCESS",
            message: "Record is updated successfully",
            data: cartItem,
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
    const result = await CartItem.findByIdAndDelete(_id);
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
