//payment routes created
const router = require("express").Router();
const Payment = require("../../models/payments/payment");

//@desc   GET all payments from db
//@route  GET /api/payments
//@access Public
router.get("/", (req, res) => {
  Payment.find((err, docs) => {
    res.json(docs);
  });
});

//@desc   GET a payment by id from db
//@route  GET /api/payments/:id
//@access Public
router.get("/:id", (req, res) => {
  Payment.findById(req.params.id)
    .then((payment) => res.json(payment))
    .catch((err) => res.status(400).json("Error:" + err));
});

//@desc   Add payment to db
//@route  POST /api/payments
//@access Public
router.post("/", (req, res) => {
  const newPayment = new Payment(req.body);
  newPayment.save().then((payment) => res.json(payment));
});

//@desc   Update payment from db
//@route  POST /api/payments/update/:id
//@access Public
router.put("/:id", (req, res) => {
  Payment.findByIdAndUpdate(req.params.id)
    .then((payment) => {
      console.log(payment);
      req.body.email ? (payment.email = req.body.email) : null,
        req.body.cardInformation
          ? (payment.cardInformation = Number(req.body.cardInformation))
          : null,
        req.body.expDate ? (payment.expDate = Date(req.body.expDate)) : null;
      req.body.cvc != 0 ? (payment.cvc = Number(req.body.cvc)) : null;
      req.body.cardInformation
        ? (payment.cardInformation = req.body.cardInformation)
        : null,
        req.body.nameOnCard ? (payment.nameOnCard = req.body.nameOnCard) : null,
        req.body.region ? (payment.region = req.body.region) : null,
        req.body.zip != 0 ? (payment.zip = Number(req.body.zip)) : null;
      payment
        .save()
        .then(() => res.json(payment))
        .catch((err) => res.json(err));
    })
    .catch((err) => res.json(err));
});

router.route("/deletePayment/:id").delete(async (req, res) => {
  try {
    const id = req.params.id;
    const removePayment = await Payment.findByIdAndDelete(id);

    res.status(200).send({ data: removePayment });
  } catch (err) {
    res.status(400).send({ data: err });
  }
});

module.exports = router;
