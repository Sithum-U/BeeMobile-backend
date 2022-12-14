const express = require("express");
var router = express.Router();
let advertise = require("../../models/advertise/Advertise");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
let path = require("path");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { nextTick } = require("process");

//Save inserted photo in the folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //save location
    cb(null, "../BeeMobile-frontend/public");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});
//filter photo type
//advertisment routes created
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
let upload = multer({ storage, fileFilter });
router.post("/add",upload.single("photo"), async(req,res)=>{
  var title = req.body.title;
  var description = req.body.description;
  var date = req.body.date;
  var email = req.body.email;
  const photo = req.file.filename;


console.log(  title,
  description,
  date,
  email,
  photo)

  const data = new advertise({
    title,
    description,
    date,
    email,
    photo
  });
const result = await data.save()

    if(!result){
        res.json({
            status: "FAILED",
            message: "Product is not Added!"
        })
    }
    else{
        res.json({
            status: "SUCCESS",
            message: "Product Added Successfully....",
            data:result
        })
    }
    })

    router.route("/view").get((req, res) => {
      advertise
        .find({})
        .then((advert) => {
          res.json(advert);
        })
        .catch((err) => {
          console.log(err);
        });
    });

    router.get("/:id", async (req, res) => {

      try {
    
        const _id = req.params.id;
    
        const result = await advertise.findById(_id);
    
        if (!result) {
    
          res.json({
    
            status: "FAILED",
    
            message: "Not Found record",
    
          });
    
        } else {
    
          res.json({
    
            status: "SUCCESS",
    
            message: "One Result Found",
    
            data: result,
    
          });
    
        }
    
      } catch (e) {
    
        console.log(e);
    
      }
    
    });

    router.put("/update/:id",upload.single("photo"),async(req,res)=>{
      advertise.findByIdAndUpdate(req.params.id)
        .then((adv) => {
          req.body.title
            ? (adv.title = req.body.title)
            : null,
            req.body.description
              ? (adv.description = req.body.description)
              : null,
            req.body.date
              ? (adv.date = req.body.date)
              : null,
              req.body.email
              ? (adv.email = req.body.email)
              : null,
          req.body.photo ? (adv.photo = req.body.photo) : null;
          adv
            .save()
            .then((adv) =>
              res.json({
                status: "SUCCESS",
                message: "Record is updated successfully",
                data: adv,
              })
            )
            .catch((err) => res.json(err));
        })
        .catch((err) =>
          res.json({
            status: "FAILED",
            message: "Record is not updated successfully",
          })
        );
    });


    
    router.route("/delete/:id").get((req, res) => {

      let userId = req.params.id;
          console.log("WORKING",userId)

       advertise
        .findByIdAndDelete(userId)
        .then(() => {
          
          res.status(200).send({ status: "Advertisement deleted" });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({ status: "error in Advertisement deleting" });
        })
    });


;
    // });
    
  
   
module.exports = router;
