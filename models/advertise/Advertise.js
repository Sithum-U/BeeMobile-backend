const mongoose = require("mongoose");
// const validator = require("validator");

const advertiseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    // type: Sequelize.TEXT,
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    // required:true
  },
});
const advert = mongoose.model("Advertise", advertiseSchema);
module.exports = advert;
