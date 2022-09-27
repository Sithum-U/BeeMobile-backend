const express = require("express");
const { createSubscription, updateSubscription, deleteSubscription, getSubscription, getSubscriptions } = require("../../controllers/users/subscription");
const { verifyToken, verifyUser, verifyAdmin } = require("../../utils/verifyToken");

const router = express.Router();

//CREATE
router.post("/:userId", verifyUser, createSubscription);

//UPDATE
router.put("/:id", verifyUser, updateSubscription);

//DELETE
router.delete("/:id/:userId", verifyUser, deleteSubscription);

//GET
router.get("/:id", verifyUser, getSubscription);

//GETALL
router.get("/", verifyUser, getSubscriptions);

module.exports = router;