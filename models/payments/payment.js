const mongoose = require("mongoose");
const validator = require("validator");

const paymentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  cardInformation: {
    type: String,
    required: true,
  },
  expDate: {
    type: Date,
    required: true,
  },
  cvc: {
    // type: Sequelize.TEXT,
    type: Number,
    required: true,
  },
  nameOnCard: {
    type: String,
    required: true,
  },
  region: {
    type: Number,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
