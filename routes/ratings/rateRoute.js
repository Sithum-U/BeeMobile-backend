//payment routes created
const router = require("express").Router();
const Rate = require("../../models/rate/rate");

//@desc   GET all rates from db
//@route  GET /api/rates
//@access Public
router.get("/", (req, res) => {
  Rate.find((err, docs) => {
    res.json(docs);
  });
});

//@desc   GET a rate by id from db
//@route  GET /api/rates/:id
//@access Public
router.get("/:id", (req, res) => {
  Rate.findById(req.params.id)
    .then((rate) => res.json(rate))
    .catch((err) => res.status(400).json("Error:" + err));
});

//@desc   Add rate to db
//@route  POST /api/rates
//@access Public
router.post("/add", (req, res) => {
  const newRate = new Rate(req.body);
  newRate.save().then((rate) => res.json(rate));
});

//@desc   Update rate from db
//@route  POST /api/rates/update/:id
//@access Public
router.put("/updateRate/:id", (req, res) => {
  Rate.findByIdAndUpdate(req.params.id)
    .then((rate) => {
      console.log(rate);
      req.body.description ? (rate.description = req.body.description) : null,
        req.body.name ? (rate.name = req.body.name) : null,
        req.body.profession ? (rate.profession = req.body.profession) : null,
        rate
          .save()
          .then(() => res.json(rate))
          .catch((err) => res.json(err));
    })
    .catch((err) => res.json(err));
});

router.route("/deleteRate/:id").delete(async (req, res) => {
  try {
    const id = req.params.id;
    const removeRate = await Rate.findByIdAndDelete(id);

    res.status(200).send({ data: removeRate });
  } catch (err) {
    res.status(400).send({ data: err });
  }
});

module.exports = router;
