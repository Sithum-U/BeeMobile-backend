const mongoose = require("mongoose");
// const validator = require("validator");

const cartItemSchema = new mongoose.Schema({
  productCode: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  description: {
    // type: Sequelize.TEXT,
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    // required:true
  },
  countInStock: {
    type: Number,
  },
});

const CartItem = mongoose.model("CartItem", cartItemSchema);
module.exports = CartItem;
