//payment model schema created

const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  cardInformation: {
    type: Number,
    required: true,
  },
  expDate: {
    type: String,
    default: new Date(),
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
    type: String,
    required: true,
  },
  zip: {
    type: Number,
    required: true,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
