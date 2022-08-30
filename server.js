const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51LcQzEELWo6Wp4wPSYTRPXIneu2cKSzuoGAZosJvBjETKDHCvnBAbToAj1wWGFeekVGCTlUJRYa7giKprhNL1koT00KxeaFnvw"
);

const uuid = require("uuid");

require("dotenv").config();
const app = express();

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/ge", (req, res) => {
  res.send("SA Assignment");
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected Successfully..");
  });

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
