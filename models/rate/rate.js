//rate model schema created

const mongoose = require("mongoose");

const rateSchema = new mongoose.Schema({
  description: {
    type: String,
    // required: true,
  },
  name: {
    type: String,
    // required: true,
  },
  profession: {
    type: String,
    // required: true,
  },
});

const Rate = mongoose.model("Rate", rateSchema);
module.exports = Rate;
