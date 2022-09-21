const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
// const sequelize = require("sequelize");
const productRoute = require("./routes/products/productRoute");

const uuid = require("uuid");
const port = process.env.PORT || 8000;
require("dotenv").config();
const app = express();

// module.exports = sequelize;
// app.use(sequelize());
// app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use(express.urlencoded());

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected Successfully..");
  });

app.use("/product", productRoute);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});