const mongoose = require("mongoose");
// const validator = require("validator");

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: String,
  },
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
    required: true,
  },
  countInStock: {
    type: Number,
  },
  qty: {
    type: Number,
    default: 1,
  },
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "Product",
  },
});

const CartItem = mongoose.model("CartItem", cartItemSchema);
module.exports = CartItem;
