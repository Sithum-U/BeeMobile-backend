//payment routes created
const router = require("express").Router();
const Course = require("../../models/payments/course");

//@desc   GET all payments from db
//@route  GET /api/payments
//@access Public
router.get("/", (req, res) => {
  Course.find((err, docs) => {
    res.json(docs);
  });
});

//@desc   GET a payment by id from db
//@route  GET /api/payments/:id
//@access Public
router.get("/:id", (req, res) => {
  Course.findById(req.params.id)
    .then((payment) => res.json(payment))
    .catch((err) => res.status(400).json("Error:" + err));
});

//@desc   Add payment to db
//@route  POST /api/payments
//@access Public
router.post("/add", (req, res) => {
  const newPayment = new Course(req.body);
  newPayment.save().then((payment) => res.json(payment));
});

//@desc   Update payment from db
//@route  POST /api/payments/update/:id
//@access Public
router.put("/updatePayment/:id", (req, res) => {
  Course.findByIdAndUpdate(req.params.id)
    .then((payment) => {
      console.log(payment);
      req.body.courseName ? (payment.courseName = req.body.courseName) : null,
        req.body.courseFee != 0
          ? (payment.courseFee = Number(req.body.courseFee))
          : null;

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
    const removePayment = await Course.findByIdAndDelete(id);

    res.status(200).send({ data: removePayment });
  } catch (err) {
    res.status(400).send({ data: err });
  }
});

module.exports = router;
