const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const productRoute = require("./routes/products/productRoute");

require("dotenv").config();
const app = express();

const port = process.env.PORT || 8000;

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

app.use('/product',productRoute);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
